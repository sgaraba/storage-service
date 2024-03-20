import { Component, OnInit } from '@angular/core';
import { FileModel } from 'app/entities/files/file.model';
import { FileService } from 'app/entities/files/service/file.service';
import SharedModule from 'app/shared/shared.module';
import { ItemCountComponent } from 'app/shared/pagination';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { combineLatest, Subject } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData } from '@angular/common';
import localeRo from '@angular/common/locales/ro';
import {DeleteComponent} from "../delete/delete.component";
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ASC, DESC, SORT } from '../../../config/navigation.constants';
import { ITEMS_PER_PAGE } from '../../../config/pagination.constants';
import SortDirective from '../../../shared/sort/sort.directive';
import SortByDirective from '../../../shared/sort/sort-by.directive';
import { saveAs } from 'file-saver';
import { DataUtils } from 'app/core/util/data-util.service';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

// Register the 'ro' locale data
registerLocaleData(localeRo);

@Component({
  selector: 'jhi-files-list',
  standalone: true,
  imports: [SharedModule, RouterModule, DeleteComponent, ItemCountComponent, SortDirective, SortByDirective],
  styleUrls: ['./files.component.scss'],
  templateUrl: './files.component.html',
})
export class FilesComponent  implements OnInit {
  currentAccount: Account | null = null;
  page_list_all: boolean = false;
  isAdmin: boolean = false;

  files: FileModel[] | null = null;
  page!: number;
  totalItems: number = 0;
  itemsPerPage: number = ITEMS_PER_PAGE;
  isLoading: boolean = true;

  predicate!: string;
  ascending!: boolean;

  constructor(
    private accountService: AccountService,
    private fileService: FileService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    protected dataUtils: DataUtils,
  ) { }

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
        this.currentAccount = account;
        for (let i = 0; i < account!.authorities.length; i++)
          if(account!.authorities[i] == 'ROLE_ADMIN')
            this.isAdmin = true;
      }
    );

    this.handleNavigation();
  }

  getFileIcon(fileName: string): IconProp {
    const fileExtension = fileName.split('.').pop()?.toLowerCase();
    switch (fileExtension) {
      case 'xlsx':
      case 'xlsm':
      case 'xlsb':
      case 'xltx':
        return 'file-excel';

      case 'csv':
        return 'file-csv';

      case 'jpg':
      case 'png':
      case 'jpeg':
        return 'file-image';

      case 'doc':
      case 'docm':
      case 'docx':
      case 'dot':
        return 'file-word';

      case 'pdf':
        return 'file-pdf';

      case 'ppt':
      case 'pptx':
        return 'file-powerpoint';

      case 'zip':
      case 'rar':
      case '7z':
      case 'tar':
        return 'file-archive';
        
      default:
        return 'file-alt';
    }
  }

  openModal(fileID: number): void {
    const modalRef = this.modalService.open(DeleteComponent);
    modalRef.componentInstance.fileID = fileID;

    modalRef.closed.subscribe(
      reason => {
        if(reason === 'deleted'){
          this.loadAll();
        }
      }
    );
  }

  call_download_fileService(id: number): void {
    this.fileService.downloadFile(id).subscribe(
      (fileData: any) => {
        const binaryData = this.base64Decode(fileData.data);
        const blob = new Blob([binaryData], { type: 'application/octet-stream' });

        saveAs(blob, fileData.name);
      }
    );
  }

  exportListFiles(type: string){
    this.fileService.exportFiles(type).subscribe(
      (blob: Blob) => {
        saveAs(blob, 'list of files');
      }
    )
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  // pagination
  loadAll(): void {
    this.isLoading = true;
    this.fileService
      .query(this.page_list_all ? this.isAdmin : false, {
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe({
        next: (res: HttpResponse<FileModel[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers);
        },
        error: () => (this.isLoading = false),
      });
  }

  transition(): void {
    this.router.navigate(['./list'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {
        page: this.page,
        sort: `${this.predicate},${this.ascending ? ASC : DESC}`,
      },
    });
  }

  private base64Decode(base64String: string): Uint8Array {
      const byteString = atob(base64String);
      const byteArray = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
          byteArray[i] = byteString.charCodeAt(i);
      }
      return byteArray;
  }

  private handleNavigation(): void {
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      //check if is selected page list all documents
      this.page_list_all = this.activatedRoute.snapshot.queryParamMap.get('list_all') === 'true';
      if(this.page_list_all == null) this.page_list_all = false;

      //standart queries params
      const page = params.get('page');
      this.page = +(page ?? 1);
      const sort = (params.get(SORT) ?? data['defaultSort']).split(',');
      this.predicate = sort[0];
      this.ascending = sort[1] === ASC;
      this.loadAll();
    });
  }

  private sort(): string[] {
    const result = [`${this.predicate},${this.ascending ? ASC : DESC}`];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  private onSuccess(files: FileModel[] | null, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.files = files;
  }
}
