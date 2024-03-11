import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ReservationSpaceDetailComponent } from './detail/reservation-space-detail.component';
import { ReservationModel } from './reservation.model';
import { of } from 'rxjs';
import { ReservationSpaceService } from './service/reservation.space.service';

export const ReservationResolve: ResolveFn<ReservationModel | null> = (route: ActivatedRouteSnapshot) => {
  const id = route.paramMap.get('idReservation');
  if (id) {
    return inject(ReservationSpaceService).find(parseInt(id, 10));
  }
  return of(null);
};

const ReservationSpaceRoute: Routes = [
  {
    path: 'list',
    component: ListComponent,
    data: {
      defaultSort: 'id,asc',
      breadcrumb: { skip: true }
    },
  },
  {
    path: ':idReservation/detail',
    component: ReservationSpaceDetailComponent,
    resolve: {
      reservation: ReservationResolve
    }
  }
];

export default ReservationSpaceRoute;
