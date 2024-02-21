import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ChangeTotalSizeComponent } from './change-total-size/change-total-size.component';

const ReservationSpaceRoute: Routes = [
  {
    path: 'list',
    component: ListComponent,
  },
  {
    path: 'change-total-size',
    component: ChangeTotalSizeComponent,
  }
];

export default ReservationSpaceRoute;
