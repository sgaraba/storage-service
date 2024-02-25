import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from '../../../core/config/application-config.service';
import { ReservationDTO } from '../reservation.dto';
import { Pagination } from '../../../core/request/request.model';
import { createRequestOption } from '../../../core/request/request-util';
import { IUser } from '../../user-management/user-management.model';

@Injectable({ providedIn: 'root' })
export class ReservationSpaceService{
  private resourceUrl = this.applicationConfigService.getEndpointFor('/api/admin/reservations');

  constructor(
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService,
  ) {}

  find(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.resourceUrl}/${id}`);
  }

  query(req?: Pagination): Observable<HttpResponse<ReservationDTO[]>> {
    const options = createRequestOption(req);
    return this.http.get<ReservationDTO[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
}
