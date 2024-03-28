import { Component, OnInit } from '@angular/core';
import SharedModule from 'app/shared/shared.module';
import { DetailsService } from './service/details.service';

@Component({
  standalone: true,
  selector: 'jhi-details',
  templateUrl: './details.component.html',
  imports: [SharedModule],
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  details = {
    totalDocuments: 0,
    totalUsers: 0,
    usedSpace: 0
  };

  constructor(private detailsService: DetailsService) {}

  ngOnInit(): void {
    this.detailsService.getDetails().subscribe((response: any) => {
      this.details.totalDocuments = response.files;
      this.details.totalUsers = response.users;
      this.details.usedSpace = response.usedSpace;
    });
  }
}
