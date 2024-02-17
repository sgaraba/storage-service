import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { FileService } from 'app/entities/file/file.service';
import { FileDto } from 'app/entities/file/file.dto';
@Component({
  standalone: true,
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [SharedModule, RouterModule],
})
export default class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private accountService: AccountService,
    private fileService: FileService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => (this.account = account));

    this.getRecentUploadFIles()
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public files: FileDto[] = [];
  getRecentUploadFIles() {
    for (let i = 1; i <= 6; i++) {
      this.files.push({
        id: i,
        name: `File ${i}`,
        size: Math.floor(Math.random() * 1000),
        mimeType: 'text/plain',
        createdBy: `User ${i}`,
        createdDate: new Date(),
      });
    }
  }

  call_delete_fileService(id: number) {
    this.fileService.deleteFile(id);
  }
  call_donwload_fileService(id: number) {
    this.fileService.downloadFile(id);
  }
}
