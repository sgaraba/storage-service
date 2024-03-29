import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { Authority } from 'app/config/authority.constants';
import { AdminDashboardComponent } from './dashboard/admin/admin-dashboard.component';
import { UserDashboardComponent } from './dashboard/user/user-dashboard.component';

@Component({
  standalone: true,
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [SharedModule, RouterModule, AdminDashboardComponent, UserDashboardComponent],
})
export default class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  isAdmin: boolean = false;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private accountService: AccountService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => {
        this.account = account;
        for (let i = 0; i < account!.authorities.length; i++) {
          if (account!.authorities[i] == 'ROLE_ADMIN') this.isAdmin = true;
        }
      });
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
