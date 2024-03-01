import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../../../core/util/alert.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import TranslateDirective from '../../../shared/language/translate.directive';
import { ReservationSpaceService } from '../service/reservation.space.service';

@Component({
  selector: 'jhi-confirm-delete-modal',
  standalone: true,
  imports: [CommonModule, FaIconComponent, TranslateDirective],
  templateUrl: './delete.component.html',
})
export class DeleteComponent {
  @Input() resevationID!: number;
  constructor(
    public activeModal: NgbActiveModal,
    public reservationService: ReservationSpaceService,
    public alertService: AlertService
  ) { }

  confirmDeleteAction(): void {
    if (this.resevationID) {
      this.closeModal()
      this.reservationService.delete(this.resevationID);
      this.alertService.addAlert({ type: 'success', message: 'User reservation was deleted!' });
    } else {
      console.error('No reservation ID provided.');
    }
  }

  closeModal(): void {
    this.activeModal.close('Modal closed');
  }
}
