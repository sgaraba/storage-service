import { Component, OnInit } from '@angular/core';
import SharedModule from 'app/shared/shared.module';
import { DetailsService } from './service/details.service';

@Component({
  standalone: true,
  selector: 'jhi-details',
  templateUrl: './details.component.html',
  imports: [SharedModule],
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  details:
  { usedSpace: number; totalDocuments: number; totalUsers: number } = {
    usedSpace: 0,
    totalDocuments: 0,
    totalUsers: 0,
  };

  constructor(private detailsService: DetailsService) {}

  ngOnInit(): void {
    this.details = this.detailsService.getDetails();
    console.log(this.details);
  }
}
