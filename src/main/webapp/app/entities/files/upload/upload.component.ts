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
import { HttpResponse } from '@angular/common/http';

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
  fileData: FileModel | null = null;

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
      this.readFileData(this.fileToUpload);
    }
  }

  readFileData(file: File): void {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.fileData = {
        name: file.name,
        data: file,
        mimeType: file.type
      } as FileModel;
    };
    fileReader.readAsDataURL(file);
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  upload(): void {
    console.log(this.fileData)
    if (this.fileData == null) {
      this.alertService.addAlert({ type: 'danger', message: 'No file data available to upload.' });
      return;
    }

    this.fileService.upload(this.fileData).subscribe();
  }
}
