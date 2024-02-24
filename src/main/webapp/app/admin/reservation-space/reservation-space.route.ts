import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ChangeTotalSizeComponent } from './change-total-size/change-total-size.component';
import { ReservationSpaceDetailComponent } from './detail/reservation-space-detail.component';

const ReservationSpaceRoute: Routes = [
  {
    path: 'list',
    component: ListComponent,
  },
  {
    path: 'detail',
    component: ReservationSpaceDetailComponent,
  }
];

export default ReservationSpaceRoute;
