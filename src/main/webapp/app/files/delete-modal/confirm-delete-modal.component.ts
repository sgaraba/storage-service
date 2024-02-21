import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileService } from '../../entities/file/file.service';
import { AlertService } from '../../core/util/alert.service';

@Component({
  selector: 'jhi-confirm-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-delete-modal.component.html',
})
export class ConfirmDeleteModalComponent {
  @Input() fileID!: number;
  constructor(
    public activeModal: NgbActiveModal,
    public fileService: FileService,
    public alertService: AlertService
  ) { }

  confirmDeleteAction(): void {
    if (this.fileID) {
      this.fileService.deleteFile(this.fileID);
      this.closeModal()
      this.alertService.addAlert({ type: 'success', message: 'Your file is deleted!' });
    } else {
      console.error('No file ID provided.');
    }
  }

  closeModal(): void {
    this.activeModal.close('Modal closed');
  }
}
