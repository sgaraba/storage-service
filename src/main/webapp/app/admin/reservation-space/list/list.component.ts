import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../core/util/alert.service';
import { AccountService } from '../../../core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { ItemCountComponent } from '../../../shared/pagination';
import SharedModule from '../../../shared/shared.module';
import { ReservationSpaceService } from '../service/reservation.space.service';
import { ReservationDTO } from '../../../entities/reservation/reservation.dto';
import { RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeRo from '@angular/common/locales/ro';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeTotalSizeComponent } from '../change-total-size/change-total-size.component'; // import to register local Ro

registerLocaleData(localeRo); // register local Ro lang

@Component({
  selector: 'jhi-list',
  standalone: true,
  imports: [SharedModule, ItemCountComponent, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  currentAccount: Account | null = null;
  reservations: ReservationDTO[] = [];
  pagedReservations: ReservationDTO[] = [];

  page!: number;
  totalItems: number = 0;
  itemsPerPage: number = 10;

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private reservationSpaceService: ReservationSpaceService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => (this.currentAccount = account));
    this.reservations = this.reservationSpaceService.get_reservationSpace_info();
    this.totalItems = this.reservations.length;

    this.page = 1;
    this.updatePage();
  }

  openModalChangeTotalSize(): void {
    const modalRef = this.modalService.open(ChangeTotalSizeComponent);
    // modalRef.componentInstance.fileID = fileID;
  }

  // pagination
  updatePage(): void {
    const startIndex: number = (this.page - 1) * this.itemsPerPage;
    const endIndex: number = Math.min(startIndex + this.itemsPerPage - 1, this.reservations.length - 1);
    this.pagedReservations = this.reservations.slice(startIndex, endIndex + 1);
  }
}
