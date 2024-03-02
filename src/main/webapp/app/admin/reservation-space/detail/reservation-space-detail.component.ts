import { Component, OnInit } from '@angular/core';
import SharedModule from '../../../shared/shared.module';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReservationModel } from '../reservation.model';
import CheckFirstLastName from '../../../shared/user/check-firstName-lastName.pipe';

@Component({
  selector: 'jhi-reservation-space-detail',
  standalone: true,
  imports: [SharedModule, RouterModule, CheckFirstLastName],
  templateUrl: './reservation-space-detail.component.html',
})

export class ReservationSpaceDetailComponent implements OnInit{
  reservation: ReservationModel | null = null;
  fullName!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ reservation }) => {
      this.reservation = reservation;
      this.fullName = reservation.fullName;
    });
  }
}
