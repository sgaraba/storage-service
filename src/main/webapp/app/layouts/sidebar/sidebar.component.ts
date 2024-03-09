import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import HasAnyAuthorityDirective from 'app/shared/auth/has-any-authority.directive';
import SharedModule from 'app/shared/shared.module';

@Component({
  selector: 'jhi-sidebar',
  standalone: true,
  imports: [SharedModule, HasAnyAuthorityDirective, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
}
