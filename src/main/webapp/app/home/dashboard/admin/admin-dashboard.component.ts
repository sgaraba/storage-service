import { Component, HostListener } from '@angular/core';
import SharedModule from 'app/shared/shared.module';
import { DetailsComponent } from './details/details.component';
import { StatisticsDocumentsComponent } from './statistics-documents/statistics-documents.component';
import { RecentDocumentsComponent } from './recent-documents/recent-documents.component';
import localeRo from '@angular/common/locales/ro';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeRo);

@Component({
  standalone: true,
  selector: 'jhi-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  imports: [SharedModule, DetailsComponent, StatisticsDocumentsComponent, RecentDocumentsComponent],
})
export class AdminDashboardComponent {
  isPhoneScreen: boolean = window.innerWidth >= 768;
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isPhoneScreen = window.innerWidth >= 768;
  }
}
