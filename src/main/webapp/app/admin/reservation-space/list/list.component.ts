import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../core/util/alert.service';
import { AccountService } from '../../../core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { ItemCountComponent } from '../../../shared/pagination';
import SharedModule from '../../../shared/shared.module';
import { ReservationSpaceService } from '../service/reservation.space.service';
import { ReservationModel } from '../reservation.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeRo from '@angular/common/locales/ro';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeTotalSizeComponent } from '../change-total-size/change-total-size.component';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../../user-management/user-management.model';
import { ASC, DESC, SORT } from '../../../config/navigation.constants';
import { combineLatest } from 'rxjs';
import SortDirective from '../../../shared/sort/sort.directive';
import SortByDirective from '../../../shared/sort/sort-by.directive';
import { ITEMS_PER_PAGE } from '../../../config/pagination.constants';
import CheckFirstLastName from '../../../shared/user/check-firstName-lastName.pipe';
import { DeleteComponent } from '../delete/delete.component';
import { saveAs } from 'file-saver';

registerLocaleData(localeRo); // register local Ro lang

@Component({
  selector: 'jhi-list',
  standalone: true,
  imports: [SharedModule, ItemCountComponent, RouterModule, SortDirective, SortByDirective, CheckFirstLastName],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  currentAccount: Account | null = null;
  reservations: ReservationModel[] | null = null;

  page!: number;
  totalItems: number = 0;
  itemsPerPage: number = ITEMS_PER_PAGE;
  predicate!: string;
  ascending!: boolean;
  isLoading = false;

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private reservationSpaceService: ReservationSpaceService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => (this.currentAccount = account));
    this.handleNavigation();
  }

  openModalDeleteReservation(resevationID: number): void {
    const modalRef = this.modalService.open(DeleteComponent);
    modalRef.componentInstance.resevationID = resevationID;

    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }

  openModalChangeTotalSize(user: User): void {
    const modalRef = this.modalService.open(ChangeTotalSizeComponent);
    modalRef.componentInstance.userID = user.id;

    modalRef.closed.subscribe( reason => {
      if(reason === 'updated') {
        this.loadAll();
      }
    })
  }

  setActive(reservation: ReservationModel, isActivated: boolean): void {
    this.reservationSpaceService.update({ ...reservation, activated: isActivated }).subscribe(() => {
      this.loadAll();
    });
  }

  loadAll(): void {
    this.isLoading = true;
    this.reservationSpaceService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe({
        next: (res: HttpResponse<ReservationModel[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers);
        },
        error: () => (this.isLoading = false)
      });
  }

  transition(): void {
    this.router.navigate(['./list/'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {
        page: this.page,
        sort: `${this.predicate},${this.ascending ? ASC : DESC}`
      }
    });
  }

  exportListReservationToCSV(){
    this.reservationSpaceService.exportReservationsToCSV().subscribe(
      (blob: Blob) => {
        saveAs(blob, 'list of reservations');
      }
    )
  }

  exportListReservationToExcel(){
    this.reservationSpaceService.exportReservationsToExcel().subscribe(
      (blob: Blob) => {
        saveAs(blob, 'list of reservations');
      }
    )
  }

  private handleNavigation(): void {
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      const page = params.get('page');
      this.page = +(page ?? 1);
      const sort = (params.get(SORT) ?? data['defaultSort']).split(',');
      this.predicate = sort[0];
      this.ascending = sort[1] === ASC;
      this.loadAll();
    });
  }

  private sort(): string[] {
    const result = [`${this.predicate},${this.ascending ? ASC : DESC}`];
    return result;
  }

  private onSuccess(reservations: ReservationModel[] | null, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.reservations = reservations;
  }
}
