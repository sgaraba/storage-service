import { Route } from '@angular/router';

import ActivateComponent from './activate.component';

const activateRoute: Route = {
  path: 'activate',
  component: ActivateComponent,
  title: 'activate.title',
  data: { breadcrumb: { skip: true } }
};

export default activateRoute;
