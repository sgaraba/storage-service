import { Component, OnInit, Renderer2, RendererFactory2 } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import dayjs from 'dayjs/esm';

import { AppPageTitleStrategy } from 'app/app-page-title-strategy';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import HasAnyAuthorityDirective from 'app/shared/auth/has-any-authority.directive';
import { BreadcrumbModule } from 'xng-breadcrumb';
import FooterComponent from '../footer/footer.component';

@Component({
  selector: 'jhi-main',
  standalone: true,
  templateUrl: './main.component.html',
  providers: [AppPageTitleStrategy],
  imports: [RouterOutlet, FooterComponent, HasAnyAuthorityDirective, BreadcrumbModule, TranslateModule],
})
export default class MainComponent implements OnInit {
  private renderer: Renderer2;
  account: Account | null = null;

  constructor(
    private router: Router,
    private appPageTitleStrategy: AppPageTitleStrategy,
    private accountService: AccountService,
    private translateService: TranslateService,
    rootRenderer: RendererFactory2,
  ) {
    this.renderer = rootRenderer.createRenderer(document.querySelector('html'), null);
  }

  ngOnInit(): void {
    // try to log in automatically
    this.accountService.identity().subscribe();

    this.translateService.onLangChange.subscribe((langChangeEvent: LangChangeEvent) => {
      this.appPageTitleStrategy.updateTitle(this.router.routerState.snapshot);
      dayjs.locale(langChangeEvent.lang);
      this.renderer.setAttribute(document.querySelector('html'), 'lang', langChangeEvent.lang);
    });

    this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
    });
  }
}
