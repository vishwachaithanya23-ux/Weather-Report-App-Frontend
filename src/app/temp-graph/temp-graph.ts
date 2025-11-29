import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-temp-graph',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './temp-graph.html',
  styleUrls: ['./temp-graph.css']
})
export class TempGraphComponent implements OnChanges {

  @Input() forecast: any[] = [];

  chart: any;

  ngOnChanges() {
    if (this.forecast && this.forecast.length > 0) {
      this.renderChart();
    }
  }

  renderChart() {
    const labels = this.forecast.map(d => new Date(d.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }));
    const maxTemps = this.forecast.map(d => d.temp.max);
    const minTemps = this.forecast.map(d => d.temp.min);

    if (this.chart) this.chart.destroy();

    this.chart = new Chart("tempChart", {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: "Max Temp (°C)",
            data: maxTemps,
            borderWidth: 2,
            fill: false
          },
          {
            label: "Min Temp (°C)",
            data: minTemps,
            borderWidth: 2,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: false }
        }
      }
    });
  }
}
