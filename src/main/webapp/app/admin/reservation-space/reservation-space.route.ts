import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ReservationSpaceDetailComponent } from './detail/reservation-space-detail.component';
import { ReservationDTO } from './reservation.dto';
import { of } from 'rxjs';
import { ReservationSpaceService } from './service/reservation.space.service';

const ReservationSpaceRoute: Routes = [
  {
    path: 'list',
    component: ListComponent,
    data: {
      defaultSort: 'id,asc',
    },
  },
  {
    path: ':idReservation/detail',
    component: ReservationSpaceDetailComponent,
  }
];

export default ReservationSpaceRoute;
