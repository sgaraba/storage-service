import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { Pagination, SearchPagination } from 'app/core/request/request.model';
import { IUser } from '../user-management.model';

@Injectable({ providedIn: 'root' })
export class UserManagementService {
  private resourceUrl = this.applicationConfigService.getEndpointFor('api/admin/users');

  constructor(
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService,
  ) { }

  create(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.resourceUrl, user);
  }

  update(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(this.resourceUrl, user);
  }

  find(login: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.resourceUrl}/${login}`);
  }

  search(req: SearchPagination): Observable<HttpResponse<IUser[]>> {
    const options = createRequestOption(req);
    return this.http.get<IUser[]>(`${this.resourceUrl}/search`, { params: options, observe: 'response' });
  }

  query(req?: Pagination): Observable<HttpResponse<IUser[]>> {
    const options = createRequestOption(req);
    return this.http.get<IUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(login: string): Observable<{}> {
    return this.http.delete(`${this.resourceUrl}/${login}`);
  }

  authorities(): Observable<string[]> {
    return this.http.get<string[]>(this.applicationConfigService.getEndpointFor('api/authorities'));
  }

  exportUsers(type: string): Observable<any> {
    return this.http.get(this.applicationConfigService.getEndpointFor(`/api/admin/users/export/${type}`), {
      responseType: 'blob',
    });
  }
}
