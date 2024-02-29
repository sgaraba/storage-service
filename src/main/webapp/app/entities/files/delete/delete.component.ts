import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileService } from '../service/file.service';
import { AlertService } from '../../../core/util/alert.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import TranslateDirective from '../../../shared/language/translate.directive';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-confirm-delete-modal',
  standalone: true,
  imports: [CommonModule, FaIconComponent, TranslateDirective],
  templateUrl: './delete.component.html',
})
export class DeleteComponent {
  @Input() fileID!: number;
  constructor(
    public activeModal: NgbActiveModal,
    public fileService: FileService,
    public alertService: AlertService
  ) { }

  confirmDeleteAction(): void {
    if (this.fileID) {
      this.fileService.deleteFile(this.fileID).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.closeModal();
            this.alertService.addAlert({ type: 'success', message: 'Your file is deleted!' });
          } else {
            console.error('Failed to delete file. Server returned status code:', response.status);
            this.alertService.addAlert({ type: 'danger', message: 'Failed to delete file. Please try again later.' });
          }
        },
        (error: any) => {
          console.error('An error occurred while deleting the file:', error);
          this.alertService.addAlert({ type: 'danger', message: 'An error occurred while deleting the file. Please try again later.' });
        }
      );
    } else {
      console.error('No file ID provided.');
    }
  }

  closeModal(): void {
    this.activeModal.close('Modal closed');
  }
}
