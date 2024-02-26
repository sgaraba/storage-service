import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { DocumentService } from '../service/document.service';
import { IDocument } from '../document.model';
import { DocumentFormService, DocumentFormGroup } from './document-form.service';

@Component({
  standalone: true,
  selector: 'jhi-document-update',
  templateUrl: './document-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DocumentUpdateComponent implements OnInit {
  isSaving = false;
  document: IDocument | null = null;

  editForm: DocumentFormGroup = this.documentFormService.createDocumentFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected documentService: DocumentService,
    protected documentFormService: DocumentFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ document }) => {
      this.document = document;
      if (document) {
        this.updateForm(document);
      }
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('storageServiceApp.error', { ...err, key: 'error.file.' + err.key })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const document = this.documentFormService.getDocument(this.editForm);
    if (document.id !== null) {
      this.subscribeToSaveResponse(this.documentService.update(document));
    } else {
      this.subscribeToSaveResponse(this.documentService.create(document));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocument>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(document: IDocument): void {
    this.document = document;
    this.documentFormService.resetForm(this.editForm, document);
  }
}
