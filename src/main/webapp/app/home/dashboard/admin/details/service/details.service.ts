import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ApplicationConfigService } from 'app/core/config/application-config.service';

@Injectable({ providedIn: 'root' })
export class DetailsService {
  private data: { usedSpace: number; totalDocuments: number; totalUsers: number } = {
    usedSpace: 0,
    totalDocuments: 0,
    totalUsers: 0,
  };

  constructor(
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService,
  ) {}

  getDetails() {
    return this.http.get(this.applicationConfigService.getEndpointFor('/api/dashboard/dashboard-data'));
  }
}
