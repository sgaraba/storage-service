import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from '../../../core/config/application-config.service';
import { ReservationDTO } from '../../../entities/reservation/reservation.dto';

@Injectable({ providedIn: 'root' })
export class ReservationSpaceService{
  constructor(
    private http: HttpClient,
  ) {}

  get_reservationSpace_info(): ReservationDTO[] {
    const reservations: ReservationDTO[] = [];
    for (let i = 1; i <= 30; i++) {
      const reservation: ReservationDTO = {
        id: i,
        totalSize: Math.floor(Math.random() * 1000),
        usedSize: Math.floor(Math.random() * 500),
        user: { id: i, login: `User ${i}` },
        activated: Math.random() < 0.5,
        createdBy: `User ${Math.floor(Math.random() * 10) + 1}`,
        createdDate: new Date(new Date().getTime() - Math.floor(Math.random() * 10000000000))
      };
      reservations.push(reservation);
    }
    return reservations;
  }
}
