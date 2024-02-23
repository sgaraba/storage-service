import { Component } from '@angular/core';
import SharedModule from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'jhi-reservation-space-detail',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './reservation-space-detail.component.html',
})

export class ReservationSpaceDetailComponent{
  constructor() {}
}
