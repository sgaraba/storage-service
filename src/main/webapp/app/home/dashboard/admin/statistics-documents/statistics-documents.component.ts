import { Component, OnInit } from '@angular/core';
import SharedModule from 'app/shared/shared.module';
import Chart from 'chart.js/auto';
import { StatisticsDocumentsService } from './service/statistics-documents.service';

@Component({
  standalone: true,
  selector: 'jhi-statistics-documents',
  templateUrl: './statistics-documents.component.html',
  imports: [SharedModule],
})
export class StatisticsDocumentsComponent implements OnInit {
  constructor(
    private statisticsDocumentsService: StatisticsDocumentsService
  ) { }

  ngOnInit() {
    let fileUploadsData: number[] = [];
    let months: string[] = [];

    this.statisticsDocumentsService.getChartData().subscribe(
      (response: any) => {
        for (const month in response) {
          if (response.hasOwnProperty(month)) {
            months.push(month);
            fileUploadsData.push(response[month]);
          }
        }

        this.createChart(months, fileUploadsData);
      }
    )
  }

  protected createChart(months: string[], fileUploadsData: number[]) {
    const ctx = document.getElementById('fileUploadChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [{
          label: 'File Uploads',
          data: fileUploadsData,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
