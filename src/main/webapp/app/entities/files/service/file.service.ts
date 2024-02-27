import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FileModel } from '../file.model';
import { Pagination } from '../../../core/request/request.model';
import { Observable } from 'rxjs';
import { createRequestOption } from '../../../core/request/request-util';
import { ApplicationConfigService } from '../../../core/config/application-config.service';
import { ReservationModel } from '../../../admin/reservation-space/reservation.model';

@Injectable({ providedIn: 'root' })
export class FileService {
  private resourceUrl = this.applicationConfigService.getEndpointFor('/api/admin/storage-files');

  constructor(
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService
  ) {}

  query(req?: Pagination): Observable<HttpResponse<FileModel[]>> {
    const options = createRequestOption(req);
    return this.http.get<FileModel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  find(id: number): Observable<FileModel> {
    return this.http.get<FileModel>(`${this.applicationConfigService.getEndpointFor('/api/admin/storageFiles/')}/${id}`);
  }

  deleteFile(id: number): void {
    alert('Deleting file with id: ' + id);
  }

  downloadFile(id: number): void  {
    alert('Donwloading file with id: ' + id);
  }
}
