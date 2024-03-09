import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from '../../../core/config/application-config.service';
import { ReservationModel } from '../reservation.model';
import { Pagination } from '../../../core/request/request.model';
import { createRequestOption } from '../../../core/request/request-util';

@Injectable({ providedIn: 'root' })
export class ReservationSpaceService{
  private resourceUrl = this.applicationConfigService.getEndpointFor('/api/admin/reservations');

  constructor(
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService,
  ) {}

  find(id: number): Observable<ReservationModel> {
    return this.http.get<ReservationModel>(`${this.applicationConfigService.getEndpointFor('/api/admin/reservations/')}/${id}`);
  }

  delete(id: number): Observable<HttpResponse<{}>>{
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  update(reservation: ReservationModel): Observable<ReservationModel> {
    return this.http.put<ReservationModel>(this.resourceUrl, reservation);
  }

  updateTotalSize(userId: number, reservationSize: number): Observable<any>{
    return this.http.patch(this.applicationConfigService.getEndpointFor('/api/admin/reservations/update-size'), {userId, reservationSize}, { observe: 'response' })
  }

  query(req?: Pagination): Observable<HttpResponse<ReservationModel[]>> {
    const options = createRequestOption(req);
    return this.http.get<ReservationModel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
}
