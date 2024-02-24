import {Component} from '@angular/core';
import SharedModule from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../../../core/util/alert.service';

@Component({
  selector: 'jhi-change-total-size',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule, RouterLink],
  templateUrl: './change-total-size.component.html',
})
export class ChangeTotalSizeComponent {
  constructor(
    public activeModal: NgbActiveModal,
    public alertService: AlertService
  ) { }

  confirmDeleteAction(): void {
    alert("Confirmet ACtion");
  }

  closeModal(): void {
    this.activeModal.close('Modal closed');
  }
}
