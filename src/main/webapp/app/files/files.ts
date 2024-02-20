import { Component, OnDestroy, OnInit } from '@angular/core';
import { FileDto } from 'app/entities/file/file.dto';
import { FileService } from 'app/entities/file/file.service';
import SharedModule from 'app/shared/shared.module';
import { ConfirmDeleteComponent } from './delete/confirm-delete.component';
import { ItemCountComponent } from 'app/shared/pagination';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { RouterModule } from '@angular/router';
import { ITEMS_PER_PAGE } from 'app/config/pagination.constants';
import { Alert, AlertService } from '../core/util/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-recent-upload-files',
  standalone: true,
  imports: [SharedModule, RouterModule, ConfirmDeleteComponent, ItemCountComponent],
  templateUrl: './files.html',
})
export class FilesComponent  implements OnInit, OnDestroy {
  currentAccount: Account | null = null;

  files: FileDto[] = [];
  pagedFiles: FileDto[] = [];
  page!: number;
  totalItems: number = 0;
  // itemsPerPage: number = ITEMS_PER_PAGE;
  itemsPerPage: number = 7;
  totalPages: number = 0;
  totalPagesArray: number[] = [];
  isLoading: boolean = true;

  private readonly destroy$:Subject<void> = new Subject<void>();
  private alerts: any;

  constructor(
    private accountService: AccountService,
    private fileService: FileService,
    private alertService: AlertService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => (this.currentAccount = account));

    this.files = this.fileService.getRecentUploadFIles();
    this.totalPages = Math.ceil(this.files.length / this.itemsPerPage);
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.totalItems = this.files.length;

    this.updatePage();
  }

  // pagination
  updatePage(): void {
    const startIndex: number = (this.page - 1) * this.itemsPerPage;
    const endIndex: number = Math.min(startIndex + this.itemsPerPage - 1, this.files.length - 1);
    this.pagedFiles = this.files.slice(startIndex, endIndex + 1);

    this.isLoading = false;
  }

  // call api from file Service
  call_donwload_fileService(id: number): void {
    this.fileService.downloadFile(id);

    this.alertService.addAlert({ type: 'success', message: 'Your file is donwloaded' });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
