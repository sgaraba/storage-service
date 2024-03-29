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
    usedSpace: '',
  };

  constructor(private detailsService: DetailsService) {}

  ngOnInit(): void {
    this.detailsService.getDetails().subscribe((response: any) => {
      this.details.totalDocuments = response.files;
      this.details.totalUsers = response.users;
      this.details.usedSpace = this.formatBytes(response.usedSpace).toString();
    });
  }

  private formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }
}
