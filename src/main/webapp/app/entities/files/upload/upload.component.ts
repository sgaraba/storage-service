import { Component, OnInit } from '@angular/core';
import SharedModule from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileModel } from '../file.model';
import { Account } from '../../../core/auth/account.model';
import { AccountService } from '../../../core/auth/account.service';
import { FileService } from '../service/file.service';
import { AlertService } from '../../../core/util/alert.service';
import { EventManager, EventWithContent } from '../../../core/util/event-manager.service';
import { AlertError } from '../../../shared/alert/alert-error.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'jhi-upload-file',
  standalone: true,
  imports: [SharedModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './upload.component.html'
})

export class UploadComponent implements OnInit {
  currentAccount: Account | null = null;

  isSaving: boolean = false;
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
      const sanitizedFileName = this.clearFileName(this.fileToUpload.name);
      this.fileToUpload = new File([this.fileToUpload], sanitizedFileName, { type: this.fileToUpload.type });
    }

    this.uploadForm.patchValue({
      name: this.fileToUpload?.name,
      data: this.fileToUpload,
      mimeType: this.fileToUpload?.type
    });

    this.setFileData(event, 'data', this.isImageFile(this.fileToUpload?.type ?? 'image/default'));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(): void {
    const formData = this.uploadForm.getRawValue();
    return this.dataUtils.openFile(formData.data, formData.mimeType);
  }


  upload(): void {
    if (this.fileToUpload == null) {
      this.alertService.addAlert({ type: 'danger', message: 'No file data available to upload.' });
      return;
    }

    this.fileService.upload(this.uploadForm.getRawValue() as FileModel).pipe(finalize(() => this.isSaving)).subscribe({
      next: () => window.history.back(),
      error: () => {
        this.isSaving = false;
        this.fileToUpload = null;
        this.uploadForm.reset();
      },
    });
  }

  protected clearFileName(fileName: string): string {
    // Replace illegal characters with underscores
    return fileName.replace(/[^\w.-]/g, '_');
  }

  protected setFileData(event: Event, field: string, isImage: boolean): void {
    this.isSaving = true;

    this.dataUtils.loadFileToForm(event, this.uploadForm, field, isImage).subscribe({
      error: (err: FileLoadError) => {
        this.eventManager.broadcast(new EventWithContent<AlertError>('storageServiceApp.error', {
          ...err,
          key: 'error.file.' + err.key
        })),
        this.isSaving = false;
        this.fileToUpload = null;
        this.uploadForm.reset();
      }
    });
  }

  protected isImageFile(fileType: string): boolean {
    return fileType.startsWith('image/');
  }
}
