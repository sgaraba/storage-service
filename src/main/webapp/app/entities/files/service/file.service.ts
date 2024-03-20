import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FileModel } from '../file.model';
import { Pagination } from '../../../core/request/request.model';
import { Observable } from 'rxjs';
import { createRequestOption } from '../../../core/request/request-util';
import { ApplicationConfigService } from '../../../core/config/application-config.service';

@Injectable({ providedIn: 'root' })
export class FileService {
  private resourceUrl = this.applicationConfigService.getEndpointFor('/api/storage-files');

  constructor(
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService
  ) {}

  query(userLogin: string, req?: Pagination): Observable<HttpResponse<FileModel[]>> {
    const options = createRequestOption(req);
    return this.http.get<FileModel[]>(`${this.resourceUrl}`, { params: options, observe: 'response' });
  }

  find(id: number): Observable<FileModel> {
    return this.http.get<FileModel>(`${this.applicationConfigService.getEndpointFor('/api/storage-files/')}/${id}`);
  }

  upload(file: FileModel): Observable<FileModel>{
    return this.http.post<FileModel>(this.applicationConfigService.getEndpointFor('/api/storage-files/upload-file'), file);
  }

  deleteFile(id: number): Observable<{}> {
    return this.http.delete(`${this.applicationConfigService.getEndpointFor('/api/storage-files/')}/${id}`);
  }

  downloadFile(id: number)  {
    return this.http.get(`/api/storage-files/download/${id}`);
  }

  exportFiles(type: string): Observable<any> {
    return this.http.get(this.applicationConfigService.getEndpointFor(`/api/storage-files/export/${type}`), {
      responseType: 'blob',
    });
  }
}
