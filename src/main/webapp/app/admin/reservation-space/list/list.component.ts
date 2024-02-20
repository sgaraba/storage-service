import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../core/util/alert.service';
import { AccountService } from '../../../core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { ItemCountComponent } from '../../../shared/pagination';
import SharedModule from '../../../shared/shared.module';

@Component({
  selector: 'jhi-list',
  standalone: true,
  imports: [SharedModule, ItemCountComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  currentAccount: Account | null = null;
  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => (this.currentAccount = account));
  }
}
