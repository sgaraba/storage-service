import { Component, OnInit } from '@angular/core';
import SharedModule from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DataUtils } from 'app/core/util/data-util.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { saveAs } from 'file-saver';
import { FileModel } from '../file.model';
import { Account } from '../../../core/auth/account.model';
import { AccountService } from '../../../core/auth/account.service';
import { FileService } from '../service/file.service';
import { AlertService } from '../../../core/util/alert.service';

@Component({
  selector: 'jhi-upload-file',
  standalone: true,
  imports: [SharedModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './upload.component.html'
})

export class UploadComponent implements OnInit {
  currentAccount: Account | null = null;

  isSaving = false;
  fileToUpload: File | null = null;

  constructor(
    protected dataUtils: DataUtils,
    private accountService: AccountService,
    private fileService: FileService,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => (this.currentAccount = account));
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.fileToUpload = inputElement.files[0];
    }
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  upload(): void {
    if (this.fileToUpload == null) {
      this.alertService.addAlert({ type: 'danger', message: 'No file data available to upload.' });
      return;
    }

    // const fileData = {
    //   name: this.fileToUpload.name,
    //   size: this.fileToUpload.size.toString(),
    //   mimeType: this.fileToUpload.type
    // };
  }

}
