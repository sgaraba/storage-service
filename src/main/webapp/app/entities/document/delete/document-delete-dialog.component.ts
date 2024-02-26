import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDocument } from '../document.model';
import { DocumentService } from '../service/document.service';

@Component({
  standalone: true,
  templateUrl: './document-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DocumentDeleteDialogComponent {
  document?: IDocument;

  constructor(
    protected documentService: DocumentService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.documentService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
