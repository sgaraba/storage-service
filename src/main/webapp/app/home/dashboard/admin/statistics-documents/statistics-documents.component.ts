import { Component, OnInit } from '@angular/core';
import SharedModule from 'app/shared/shared.module';
import Chart from 'chart.js/auto';

@Component({
  standalone: true,
  selector: 'jhi-statistics-documents',
  templateUrl: './statistics-documents.component.html',
  imports: [SharedModule],
})
export class StatisticsDocumentsComponent implements OnInit {
  fileUploadsData = [100, 200, 150, 300, 250, 400, 350, 500, 450, 600, 550, 700];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  constructor() { }

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    const ctx = document.getElementById('fileUploadChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: [{
          label: 'File Uploads',
          data: this.fileUploadsData,
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
