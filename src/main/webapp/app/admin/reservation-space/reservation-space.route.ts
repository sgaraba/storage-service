import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';

const ReservationSpaceRoute: Routes = [
  {
    path: 'list',
    component: ListComponent,
  }
];

export default ReservationSpaceRoute;
