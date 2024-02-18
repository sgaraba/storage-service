import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReservationService } from 'app/entities/reservation/reservation.service';

@Component({
  selector: 'jhi-used-space',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './used-space.component.html',
  styleUrl: './used-space.component.scss'
})
export class UsedSpaceComponent {
  public ReservatedSpace = 0;
  public UsedSpace = 0;
  private MAX_progressBar_value = 100;

  constructor(private reservationService: ReservationService) {
    const UserReservationInfo = this.reservationService.GetUserReservationInfo();
    this.UsedSpace = UserReservationInfo.usedSize;
    this.ReservatedSpace = UserReservationInfo.totalSize;
  }

  calculateProgress(value: number): number {
    return (value / this.MAX_progressBar_value) * 100;
  }

  addSpace(formData: any) {
    const spaceInput = parseFloat(formData.addSpaceInput);
    if (!isNaN(spaceInput)) {
      this.reservationService.AddSpace_UserReservation(spaceInput);
    } else {
      console.error('Invalid input for adding space:', formData.addSpaceInput);
    }
  }

  deleteSpace(formData: any) {
    const spaceInput = parseFloat(formData.deleteSpaceInput);
    if (!isNaN(spaceInput)) {
      this.reservationService.DeleteSpace_UserReservation(spaceInput);
    } else {
      console.error('Invalid input for deleting space:', formData.deleteSpaceInput);
    }
  }

}
