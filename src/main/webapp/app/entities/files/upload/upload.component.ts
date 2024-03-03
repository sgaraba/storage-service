import { Component, OnInit } from '@angular/core';
import SharedModule from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { saveAs } from 'file-saver';
import { FileModel } from '../file.model';
import { Account } from '../../../core/auth/account.model';
import { AccountService } from '../../../core/auth/account.service';
import { FileService } from '../service/file.service';
import { AlertService } from '../../../core/util/alert.service';
import { EventManager, EventWithContent } from '../../../core/util/event-manager.service';
import { AlertError } from '../../../shared/alert/alert-error.model';
import { DocumentFormGroup } from '../../document/update/document-form.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  uploadForm: FormGroup;

  constructor(
    protected dataUtils: DataUtils,
    private accountService: AccountService,
    private fileService: FileService,
    private alertService: AlertService,
    protected eventManager: EventManager,
  ) {
    this.uploadForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      data: new FormControl(null, Validators.required),
      mimeType: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => (this.currentAccount = account));
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.fileToUpload = inputElement.files[0];
    }

    this.uploadForm.patchValue({
      name: this.fileToUpload?.name,
      data: this.fileToUpload ?? '',
      mimeType: this.fileToUpload?.type
    });

    this.setFileData(event, 'data', this.isImageFile(this.fileToUpload?.type ?? 'image/png'));
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.uploadForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('storageServiceApp.error', { ...err, key: 'error.file.' + err.key })),
    });
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

    console.log(this.uploadForm.getRawValue())
    this.fileService.upload(this.uploadForm.getRawValue());
  }

  private isImageFile(fileType: string): boolean {
    return fileType.startsWith('image/');
  }
}
