import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FileModel } from '../file.model';
import { Pagination, SearchPagination } from '../../../core/request/request.model';
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

  search(isAdmin: boolean, req: SearchPagination): Observable<HttpResponse<FileModel[]>> {
    const options = createRequestOption(req);

    if(isAdmin)
      return this.http.get<FileModel[]>(this.applicationConfigService.getEndpointFor('/api/admin/storage-files/search'), { params: options, observe: 'response' });

    return this.http.get<FileModel[]>(`${this.resourceUrl}/search`, { params: options, observe: 'response' });
  }

  query(isAdmin: boolean, req?: Pagination): Observable<HttpResponse<FileModel[]>> {
    const options = createRequestOption(req);

    if(isAdmin)
      return this.http.get<FileModel[]>(this.applicationConfigService.getEndpointFor('/api/admin/storage-files'), { params: options, observe: 'response' });

    return this.http.get<FileModel[]>(`${this.resourceUrl}`, { params: options, observe: 'response' });
  }

  find(id: number): Observable<FileModel> {
    return this.http.get<FileModel>(`${this.resourceUrl}/${id}`);
  }

  upload(file: FileModel): Observable<FileModel>{
    return this.http.post<FileModel>(this.applicationConfigService.getEndpointFor(`${this.resourceUrl}/upload-file`), file);
  }

  reUpload(id: number, file: FileModel): Observable<FileModel>{
    return this.http.put<FileModel>(this.applicationConfigService.getEndpointFor(`${this.resourceUrl}/${id}`), file);
  }

  deleteFile(id: number): Observable<{}> {
    return this.http.delete(`${this.resourceUrl}/${id}`);
  }

  downloadFile(id: number)  {
    return this.http.get(`${this.resourceUrl}/download/${id}`);
  }

  exportFiles(type: string): Observable<any> {
    return this.http.get(this.applicationConfigService.getEndpointFor(`${this.resourceUrl}/export/${type}`), {
      responseType: 'blob',
    });
  }
}
