import {Component} from '@angular/core';
import SharedModule from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../../../core/util/alert.service';
import { ReservationSpaceService } from '../service/reservation.space.service';

@Component({
  selector: 'jhi-change-total-size',
  standalone: true,
  imports: [SharedModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './change-total-size.component.html',
})
export class ChangeTotalSizeComponent {
  userRequestedSize!: number;
  userID!: number;

  constructor(
    public activeModal: NgbActiveModal,
    public alertService: AlertService,
    public reservationService: ReservationSpaceService,
  ) { }

  updateTotalSize(): void {
    this.reservationService.updateTotalSize(this.userID, this.userRequestedSize).subscribe(
      () => {
        this.activeModal.close('updated');
      }
    );
  }

  closeModal(): void {
    this.activeModal.close('updated');
  }
}
