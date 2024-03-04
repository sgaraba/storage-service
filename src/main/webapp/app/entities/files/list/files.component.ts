import { Component, OnDestroy, OnInit } from '@angular/core';
import { FileModel } from 'app/entities/files/file.model';
import { FileService } from 'app/entities/files/service/file.service';
import SharedModule from 'app/shared/shared.module';
import { ItemCountComponent } from 'app/shared/pagination';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { combineLatest, Subject } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Alert, AlertService } from '../../../core/util/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData } from '@angular/common';
import localeRo from '@angular/common/locales/ro';
import {DeleteComponent} from "../delete/delete.component";
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../../../admin/user-management/user-management.model';
import { ASC, DESC, SORT } from '../../../config/navigation.constants';
import { ITEMS_PER_PAGE } from '../../../config/pagination.constants';
import SortDirective from '../../../shared/sort/sort.directive';
import SortByDirective from '../../../shared/sort/sort-by.directive';

// Register the 'ro' locale data
registerLocaleData(localeRo);

@Component({
  selector: 'jhi-files-list',
  standalone: true,
  imports: [SharedModule, RouterModule, DeleteComponent, ItemCountComponent, SortDirective, SortByDirective],
  templateUrl: './files.component.html',
})
export class FilesComponent  implements OnInit {
  currentAccount: Account | null = null;

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
    private alertService: AlertService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
        this.currentAccount = account;
      }
    );

    this.handleNavigation();
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
    this.fileService.downloadFile(id);
  }

  // pagination
  loadAll(): void {
    this.isLoading = true;
    this.fileService
      .query(this.currentAccount?.login ?? '', {
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

  private handleNavigation(): void {
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
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
  // end pagination
}
