import { Component } from '@angular/core';
import { EventManager, EventWithContent } from '../../../core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { FileService } from '../service/file.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileModel } from '../file.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-file-base',
  template: '',
})
export class FileBaseComponent {
  fileToUpload: File | null = null;
  uploadForm!: FormGroup;
  isSaving: boolean = false;
  
  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected fileService: FileService,
  ) {
    this.uploadForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      data: new FormControl(null, Validators.required),
      mimeType: new FormControl(null, Validators.required),
    });
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

  upload(): void {
    this.isSaving = true;

    this.fileService.upload(this.uploadForm.getRawValue() as FileModel).pipe(finalize(() => this.isSaving)).subscribe({
      next: () => window.history.back(),
      error: () => {
        this.isSaving = false;
        this.fileToUpload = null;
        this.uploadForm.reset();
      },
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  protected clearFileName(fileName: string): string {
    // Replace illegal characters with underscores
    return fileName.replace(/[^\w.-]/g, '_');
  }

  protected setFileData(event: Event, field: string, isImage: boolean): void {
    this.isSaving = true;

    this.dataUtils.loadFileToForm(event, this.uploadForm, field, isImage).subscribe({
      error: (err: FileLoadError) => {
        this.eventManager.broadcast(
          new EventWithContent<AlertError>('storageServiceApp.error', {
            ...err,
            key: 'error.file.' + err.key,
          }),
        ),
          (this.isSaving = false);
        this.fileToUpload = null;
        this.uploadForm.reset();
      },
    });
  }

  protected isImageFile(fileType: string): boolean {
    return fileType.startsWith('image/');
  }
}
