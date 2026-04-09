import { ChangeDetectorRef, Component, computed, effect, ElementRef, input, OnDestroy, signal, viewChild, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { TableroData } from '../tablero-component/tablero-component';

@Component({
  selector: 'app-doughnut-chart-component',
  imports: [
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './doughnut-chart-component.html',
  styles: `
    .card-graphic {
      width: 100%;
    }
  `,
})
export class DoughnutChartComponent implements OnDestroy {
  public chart:any;

  myChart = viewChild.required<ElementRef<HTMLCanvasElement>>('myChart');

  title = 'Movimientos';
  
  data = input.required<TableroData[]>();
  
  totalBalance = computed(() => {
    const data = this.data();
    var total = 0;
    data.forEach(el => {
      total = total + el.value;
    })
    return total;
  });
  
  constructor(
    private cd: ChangeDetectorRef
  ) {
    // El effect detecta cambios en labels() o datasets() automáticamente
    effect(() => {
      const data = this.data();
      var colors: string[] = [];
      var labels: string[] = [];
      var datasets: number[] = [];
      var canvas = this.myChart();

      data.forEach(el => {
        if(el.value != 0) {
          labels.push(el.title);
          datasets.push(el.value);
          colors.push(el.color);
        }
      })

      if (canvas && datasets.length > 0) {
        this.createChart(datasets, labels, colors);
      }
    });
  }
  
  footer = () => {
    return 'Total $ ' + this.totalBalance();
  };
  
  createChart(data: number[], labels: string[], colors: string[]) {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(this.myChart().nativeElement, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Total',
            data: data,
            backgroundColor: colors,
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              footer: this.footer,
            }
          },
          legend: {
            display: true,
            position: 'top',
          },
          title: {
            display: true,
            text: this.title,
          },
        }
      },
    });
    
  }

  // IMPORTANTE: ngOnInit es muy pronto, el HTML aún no existe.
  // Usamos ngAfterViewInit para asegurar que el canvas ya está ahí.
  // ngAfterViewInit() {
  //   // Envolvemos todo en un timeout para salir del ciclo de verificación actual
  //   console.log(this.labels());
  //   setTimeout(() => {
  //     // Ahora creamos el chart con los datos reales del servicio
  //     this.createChart(this.datasets(), this.labels());
  //     // Forzamos la detección de cambios
  //     this.cd.detectChanges();
  //   });
  // }


  ngOnDestroy(): void {
    if (this.myChart()) {
      this.chart.destroy();
    }
  }
}
