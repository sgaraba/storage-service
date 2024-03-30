import { Component, OnInit } from '@angular/core';
import SharedModule from 'app/shared/shared.module';
import Chart from 'chart.js/auto';
import { StatisticsDocumentsService } from './service/statistics-documents.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'jhi-statistics-documents',
  templateUrl: './statistics-documents.component.html',
  imports: [SharedModule],
})
export class StatisticsDocumentsComponent implements OnInit {
  currentLanguage: any;
  months!: string[];
  chart: any;

  constructor(
    private statisticsDocumentsService: StatisticsDocumentsService,
    private translateService: TranslateService,
  ) {
    this.currentLanguage = this.translateService.currentLang;
  }

  ngOnInit():void {
    this.translateService.onLangChange.subscribe(() => {
      this.destroyChart();
      this.loadChartData();
    });

    this.loadChartData();
  }

  loadChartData() {
    this.statisticsDocumentsService.getChartData().subscribe((response: any) => {
      this.months = this.translateMonths(Object.keys(response));
      this.createChart(this.months, Object.values(response));
    });
  }

  protected createChart(months: string[], fileUploadsData: number[]) {
    const ctx = document.getElementById('fileUploadChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: this.translateService.instant(`dashboard.statisticsDocuments.title`),
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

  private translateMonths(months: string[]): string[] {
    return months.map(month => this.translateService.instant(`dashboard.statisticsDocuments.${month}`));
  }

  private destroyChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
