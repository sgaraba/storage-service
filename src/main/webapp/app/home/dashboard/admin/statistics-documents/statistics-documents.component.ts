import { Component, OnInit } from '@angular/core';
import SharedModule from 'app/shared/shared.module';
import Chart from 'chart.js/auto';
import { StatisticsDocumentsService } from './service/statistics-documents.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'jhi-statistics-documents',
  templateUrl: './statistics-documents.component.html',
  imports: [SharedModule],
})
export class StatisticsDocumentsComponent implements OnInit {
  currentLanguage: any;
  monthsRO = [
    'septembrie',
    'februarie',
    'decembrie',
    'noiembrie',
    'ianuarie',
    'martie',
    'aprilie',
    'mai',
    'iunie',
    'august',
    'octombrie',
    'iulie',
  ];
  monthsRU = ['сентябрь', 'февраль', 'декабрь', 'ноябрь', 'январь', 'март', 'апрель', 'май', 'июнь', 'август', 'октябрь', 'июль'];

  constructor(
    private statisticsDocumentsService: StatisticsDocumentsService,
    private translateService: TranslateService,
  ) {
    this.currentLanguage = this.translateService.currentLang;
  }

  ngOnInit() {
    let fileUploadsData: number[] = [];
    let months: string[] = [];

    this.statisticsDocumentsService.getChartData().subscribe((response: any) => {
      for (const month in response) {
        if (response.hasOwnProperty(month)) {
          months.push(month);
          fileUploadsData.push(response[month]);
        }
      }

      months = this.checkChartLang(months);

      this.createChart(months, fileUploadsData);
    });
  }

  protected createChart(months: string[], fileUploadsData: number[]) {
    const ctx = document.getElementById('fileUploadChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: 'File Uploads',
            data: fileUploadsData,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  private checkChartLang(months: string[]): string[] {
    switch (this.currentLanguage) {
      case 'ro':
        months = this.monthsRO;
        break;
      case 'ru':
        months = this.monthsRU;
        break;
    }

    return months;
  }
}
