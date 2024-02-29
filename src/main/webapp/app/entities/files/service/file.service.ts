import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FileModel } from '../file.model';
import { Pagination } from '../../../core/request/request.model';
import { Observable } from 'rxjs';
import { createRequestOption } from '../../../core/request/request-util';
import { ApplicationConfigService } from '../../../core/config/application-config.service';

@Injectable({ providedIn: 'root' })
export class FileService {
  private resourceUrl = this.applicationConfigService.getEndpointFor('/api/admin/storage-files-by-user/');

  constructor(
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService
  ) {}

  query(userLogin: string, req?: Pagination): Observable<HttpResponse<FileModel[]>> {
    const options = createRequestOption(req);
    return this.http.get<FileModel[]>(`${this.resourceUrl}/${userLogin}`, { params: options, observe: 'response' });
  }

  find(id: number): Observable<FileModel> {
    return this.http.get<FileModel>(`${this.applicationConfigService.getEndpointFor('/api/admin/storageFiles/')}/${id}`);
  }

  upload(file: FileModel): Observable<HttpResponse<FileModel>>{
    return this.http.post<FileModel>(this.applicationConfigService.getEndpointFor('/api/admin/storage-files/upload-file'), file, { observe: 'response' });
  }

  deleteFile(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.applicationConfigService.getEndpointFor('/api/admin/storage-files/')}/${id}`, { observe: 'response' });
  }

  downloadFile(id: number): void  {
    alert('Donwloading file with id: ' + id);
  }
}
