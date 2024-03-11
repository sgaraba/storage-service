import { Routes } from '@angular/router';

import { Authority } from 'app/config/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { errorRoute } from './layouts/error/error.route';

import HomeComponent from './home/home.component';
import NavbarComponent from './layouts/navbar/navbar.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import LoginComponent from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'home.title',
    data: { breadcrumb: "global.menu.home" }
  },
  {
    path: '',
    component: NavbarComponent,
    outlet: 'navbar',
    data: { breadcrumb: { skip: true } }
  },
  {
    path: '',
    component: SidebarComponent,
    outlet: 'sidebar',
    data: { breadcrumb: { skip: true } }
  },
  {
    path: 'admin',
    data: {
      authorities: [Authority.ADMIN],
      breadcrumb: { skip: true }
    },
    canActivate: [UserRouteAccessService],
    loadChildren: () => import('./admin/admin.routes'),
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.route'),
    data: { breadcrumb: { skip: true } }
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'login.title',
    data: { breadcrumb: { skip: true } }
  },
  {
    path: '',
    loadChildren: () => import(`./entities/entity.routes`),
  },
  ...errorRoute,
];

export default routes;
