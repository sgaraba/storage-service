import { Component } from '@angular/core';
import SharedModule from 'app/shared/shared.module';

@Component({
  standalone: true,
  selector: 'jhi-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  imports: [SharedModule],
})
export class UserDashboardComponent {}
