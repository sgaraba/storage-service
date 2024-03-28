import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileModel } from 'app/entities/files/file.model';
import { ApplicationConfigService } from 'app/core/config/application-config.service';

@Injectable({ providedIn: 'root' })
export class RecentDocumentsService {
  constructor(
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService
  ) {}

  getRecentFiles(): Observable<FileModel[]> {
    return this.http.get<FileModel[]>(this.applicationConfigService.getEndpointFor('/api/dashboard/recent-files'));
  }
}
