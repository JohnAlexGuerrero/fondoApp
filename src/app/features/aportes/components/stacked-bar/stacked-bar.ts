import { Component, effect, ElementRef, input, viewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Chart } from 'chart.js';
import { DataServices } from '../../../../core/services/data-services';

const DATA_COUNT = 12;
const COLORS = [
  '#4dc9f6',
  '#f67019',
  '#f53794',
  '#537bc4',
  '#acc236',
  '#166a8f',
  '#00a950',
  '#58595b',
  '#8549ba'
];



@Component({
  selector: 'app-stacked-bar',
  imports: [
    MatCardModule
  ],
  templateUrl: './stacked-bar.html',
  styles: ``,
})
export class StackedBar {
  public chart!: any;

  userId = input.required<number>();
  fondoId = input.required<number>();
  
  data = {
    labels: [],
    datasets: [
      {
        label: '2025',
        data: [20000,20000, 20000,20000],
        backgroundColor: COLORS[0],
      },
      {
        label: '2026',
        data: [20000,20000, 20000,20000],
        backgroundColor: COLORS[1],
      },
      {

        label: '2027',
        data: [20000,20000],
        backgroundColor: COLORS[2],
      },
    ]
  }

  constructor(
    private dataServices: DataServices
  ) {
    effect(() => {
      this.getDataAportes();
      this.createChart(this.data);
    })
  }
  
  myChart = viewChild.required<ElementRef<HTMLCanvasElement>>('myChart');
  
  createChart(data: any) {
    if (this.chart) this.chart.destroy();
    
    this.chart = new Chart(this.myChart().nativeElement, {
      type: 'bar',
      data: data,
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Historial de aportes',
          },
        },
        responsive: true,
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          }
        }
      }
    })
  }

  getMonths(): string[] {
    var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

    return [];
  }

  async getDataAportes() {
    const fondoId = this.fondoId();
    const miembroId = this.userId();
    let countAportes = 0;

    await this.dataServices.aportesPorFondo(fondoId, miembroId).then(data => {
      countAportes = data;
    });
  }
}
