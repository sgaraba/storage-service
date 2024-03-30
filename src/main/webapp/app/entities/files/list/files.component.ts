import { Component, OnInit } from '@angular/core';
import { FileModel } from 'app/entities/files/file.model';
import { FileService } from 'app/entities/files/service/file.service';
import SharedModule from 'app/shared/shared.module';
import { ItemCountComponent } from 'app/shared/pagination';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { combineLatest, filter, Subject } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeRo from '@angular/common/locales/ro';
import { DeleteComponent } from '../delete/delete.component';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ASC, DESC, SORT } from '../../../config/navigation.constants';
import { ITEMS_PER_PAGE } from '../../../config/pagination.constants';
import SortDirective from '../../../shared/sort/sort.directive';
import SortByDirective from '../../../shared/sort/sort-by.directive';
import { saveAs } from 'file-saver';
import { DataUtils } from 'app/core/util/data-util.service';
import { GetFileIcon } from 'app/shared/files';
import { SearchBarComponent } from 'app/layouts/search-bar/search-bar.component';
import FilesMenu from './files-menu/files-menu.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// Register the 'ro' locale data
registerLocaleData(localeRo);

@Component({
  selector: 'jhi-files-list',
  standalone: true,
  imports: [SharedModule, RouterModule, DeleteComponent, ItemCountComponent, SortDirective, SortByDirective, GetFileIcon, SearchBarComponent, FilesMenu],
  styleUrls: ['./files.component.scss'],
  templateUrl: './files.component.html',
})
export class FilesComponent implements OnInit {
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

  searchQuery: string = "";

  constructor(
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataUtils: DataUtils,
    private fileService: FileService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
      for (let i = 0; i < account!.authorities.length; i++) if (account!.authorities[i] == 'ROLE_ADMIN') this.isAdmin = true;
    });

    this.handleNavigation();
  }

  updateSearchQuery(query: string): void {
    this.searchQuery = query;
    if (!query) {
      this.page = 1;
    }
    this.handleListLoad();
  }

  handleListLoad(): void {
    if (!this.searchQuery) {
      this.loadAll();
      return;
    }
    this.search();
  }

  openModal(fileID: number): void {
    const modalRef = this.modalService.open(DeleteComponent);
    modalRef.componentInstance.fileID = fileID;

    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.handleListLoad();
      }
    });
  }

  exportListFiles(type: string) {
    this.fileService.exportFiles(type).subscribe((blob: Blob) => {
      saveAs(blob, 'list of files');
    });
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  search(): void {
    this.isLoading = true;
    this.fileService
      .search(this.page_list_all ? this.isAdmin : false, {
        query: this.searchQuery,
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
    let queryParams: any = {
      page: this.page,
      sort: `${this.predicate},${this.ascending ? ASC : DESC}`,
    };

    if (this.page_list_all !== null) {
      queryParams['list_all'] = this.page_list_all.toString();
    }

    this.router.navigate(['./list'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: queryParams,
    });
  }

  private handleNavigation(): void {
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      //check if is selected page - list all documents
      this.page_list_all = this.activatedRoute.snapshot.queryParamMap.get('list_all') === 'true';
      if (this.page_list_all == null) this.page_list_all = false;

      //standart queries params
      const page = params.get('page');
      this.page = +(page ?? 1);
      const sort = (params.get(SORT) ?? data['defaultSort']).split(',');
      this.predicate = sort[0];
      this.ascending = sort[1] === ASC;

      this.handleListLoad();
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
