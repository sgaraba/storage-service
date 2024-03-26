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
  chartData!: { fileUploadsData: number[]; months: string[] };

  constructor(
    private statisticsDocumentsService: StatisticsDocumentsService
  ) { }

  ngOnInit() {
    this.chartData = this.statisticsDocumentsService.getChartData();
    this.createChart();
  }

  createChart() {
    const ctx = document.getElementById('fileUploadChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.chartData?.months,
        datasets: [{
          label: 'File Uploads',
          data: this.chartData?.fileUploadsData,
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
