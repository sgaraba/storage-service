import { Routes } from '@angular/router';
/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

const routes: Routes = [
  {
    path: 'user-management',
    loadChildren: () => import('./user-management/user-management.route'),
    title: 'userManagement.home.title',
    data: { breadcrumb: "global.menu.sidebar.users" }
  },
  {
    path: 'reservation-space',
    loadChildren: () => import('./reservation-space/reservation-space.route'),
    data: { breadcrumb: "global.menu.sidebar.storage" }
  },
  {
    path: 'docs',
    loadComponent: () => import('./docs/docs.component'),
    title: 'global.menu.admin.apidocs',
    data: { breadcrumb: "global.menu.sidebar.api" }
  },
  {
    path: 'logs',
    loadComponent: () => import('./logs/logs.component'),
    title: 'logs.title',
    data: { breadcrumb: "global.menu.sidebar.journal" }
  },
  /* jhipster-needle-add-admin-route - JHipster will add admin routes here */
];

export default routes;
