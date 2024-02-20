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
@Component({
  selector: 'jhi-recent-upload-files',
  standalone: true,
  imports: [SharedModule, RouterModule, ConfirmDeleteComponent, ItemCountComponent, ItemCountComponent],
  templateUrl: './files.html',
})
export class FilesComponent  implements OnInit, OnDestroy {
  currentAccount: Account | null = null;
  private readonly destroy$ = new Subject<void>();

  files: FileDto[] = [];
  pagedFiles: FileDto[] = [];
  page!: number;
  totalItems: number = 0;
  // itemsPerPage: number = ITEMS_PER_PAGE;
  itemsPerPage: number = 7;
  totalPages: number = 0;
  totalPagesArray: number[] = [];

  constructor(
    private accountService: AccountService,
    private fileService: FileService,
  ) { }

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => (this.currentAccount = account));

    this.files = this.fileService.getRecentUploadFIles();
    this.totalPages = Math.ceil(this.files.length / this.itemsPerPage);
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.totalItems = this.files.length;
  }

  // pagination
  updatePage() {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage - 1, this.files.length - 1);
    this.pagedFiles = this.files.slice(startIndex, endIndex + 1);
  }

  // call api from file Service
  call_donwload_fileService(id: number) {
    this.fileService.downloadFile(id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
