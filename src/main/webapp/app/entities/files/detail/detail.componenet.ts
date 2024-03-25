import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DataUtils, FileLoadError } from '../../../core/util/data-util.service';
import SharedModule from '../../../shared/shared.module';
import { FileModel } from '../file.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventManager,EventWithContent } from 'app/core/util/event-manager.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileService } from '../service/file.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'jhi-files-detail',
  standalone: true,
  imports: [SharedModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './detail.component.html',
})
export class FilesDetailComponent implements OnInit {
  file: FileModel | null = null;
  fileToReUpload: File | null = null;
  filePath!: string;
  fileSize!: number;

  isSaving: boolean = false;
  uploadForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    private fileService: FileService,
  ) {
    this.uploadForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      data: new FormControl(null, Validators.required),
      mimeType: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(({ file }) => {
      this.file = file;
      this.filePath = file.filePath;
      this.fileSize = file.size;
    });
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.fileToReUpload = inputElement.files[0];
      const sanitizedFileName = this.clearFileName(this.fileToReUpload.name);
      this.fileToReUpload = new File([this.fileToReUpload], sanitizedFileName, { type: this.fileToReUpload.type });
    }

    this.uploadForm.patchValue({
      name: this.fileToReUpload?.name,
      data: this.fileToReUpload,
      mimeType: this.fileToReUpload?.type
    });

    this.setFileData(event, 'data', this.isImageFile(this.fileToReUpload?.type ?? 'image/default'));
  }

  reUploadFile(id: number, event: Event): void {
    event.preventDefault();
    this.isSaving = true;

    this.fileService.reUpload(id, this.uploadForm.getRawValue() as FileModel).pipe(finalize(() => this.isSaving)).subscribe({
      next: () => window.history.back(),
      error: () => {
        this.isSaving = false;
        this.fileToReUpload = null;
        this.uploadForm.reset();
      },
    });
  }

  protected clearFileName(fileName: string): string {
    return fileName.replace(/[^\w.-]/g, '_');
  }
  protected isImageFile(fileType: string): boolean {
    return fileType.startsWith('image/');
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
        this.fileToReUpload = null;
        this.uploadForm.reset();
      }
    });
  }
}
