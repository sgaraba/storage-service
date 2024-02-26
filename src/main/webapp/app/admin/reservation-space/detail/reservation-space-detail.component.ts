import { Component } from '@angular/core';
import SharedModule from '../../../shared/shared.module';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReservationModel } from '../reservation.model';

@Component({
  selector: 'jhi-reservation-space-detail',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './reservation-space-detail.component.html',
})

export class ReservationSpaceDetailComponent{
  reservation: ReservationModel | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ reservation }) => {
      this.reservation = reservation;
    });
  }
}
