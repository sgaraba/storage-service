import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationDTO } from './reservation.dto';

@Injectable({ providedIn: 'root' })
export class ReservationService {
    constructor(private http: HttpClient) {}

    GetUserReservationInfo(){
        const reservationInfo: ReservationDTO = {
            id: 1,
            totalSize: 5120,
            usedSize: 1024,
            user: { id: 1, login: 'TEst' },
            activated: true,
            createdBy: 'Admin',
            createdDate: new Date()
        };

        return reservationInfo;
    }

    AddSpace_UserReservation(Requested_new_totalSize: Number){
        alert("Requsting aditional space: "+Requested_new_totalSize);
    }

    DeleteSpace_UserReservation(Requested_space_delete: Number){
        alert("Requsting deleting space: "+Requested_space_delete);
    }
}