import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart-component',
  imports: [],
  templateUrl: './bar-chart-component.html',
  styles: ``,
})
export class BarChartComponent {
  chart: any = [];
  title = 'Aportes Mensuales';

  constructor() {}

  ngOnInit() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['En', 'Feb', 'Marz', 'Abr', 'May', 'Jun', 'Jul', 'Agos', 'Sept', 'Oct', 'Nov', 'Dic'],
        datasets: [
          {
            label: 'Aportes Mensuales',
            data: [400000, 250000, 300000, 370000, 200000, 400000, 360000, 80000, 100000, 290000, 110000, 120000],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',

          },
          title: {
            display: true,
            text: this.title,
          }
        }
      },
    });
  }
}
