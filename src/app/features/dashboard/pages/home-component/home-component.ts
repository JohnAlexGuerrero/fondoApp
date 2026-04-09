import { Component, input, signal } from '@angular/core';
import { DoughnutChartComponent } from '../../components/doughnut-chart-component/doughnut-chart-component';
import { TableroComponent, TableroData } from '../../components/tablero-component/tablero-component';
import { DataServices } from '../../../../core/services/data-services';

export interface Data {
  labels: string[];
  datasets: number[];
}

@Component({
  selector: 'app-home-component',
  imports: [
    TableroComponent,
    DoughnutChartComponent
  ],
  templateUrl: './home-component.html',
  styles: `
    
  `,
})
export class HomeComponent {
  fondoId: number = 1;
  listTableros = signal<TableroData[]>([]);

  constructor(
    private dataServices: DataServices,
  ) {}

  ngOnInit() {

    if (this.listTableros().length == 0) {
      this.getTotalAportes(this.fondoId);
      this.getTotalPrestamos(this.fondoId);
      this.getTotalEventos(this.fondoId);
      this.getTotalGastos();
      
    }
  }

  async getTotalGastos() {
    const datasetTablero = {
      id: 4,
      title: 'Gastos',
      value: -1 * await this.dataServices.totalGastosPorFondo(this.fondoId).then(data => data),
      icon: 'trending_down',
      color: 'rgb(201, 118, 103)'
    }

    this.listTableros.update(currentData => [... currentData, {... datasetTablero}]);
  }

  async getTotalAportes(id: number) {
    const datasetTablero = {
      id: 1,
      title: 'Aportes',
      value: await this.dataServices.summaryTotalAportesPorFondo(id).then(data =>data),
      icon: 'trending_up',
      color: 'rgb(53, 137, 137)'
    }

    this.listTableros.update(currentData => [... currentData, {... datasetTablero}]);
  }

  async getTotalPrestamos(id: number) {
    const datasetTablero = {
      id: 2,
      title: 'Prestamos',
      value: -1 *await this.dataServices.saldoPrestamoPorFondo(id).then(data => data),
      icon:'trending_down',
      color: 'rgb(255, 99, 132)'
    }

    this.listTableros.update(currentData => [... currentData, {... datasetTablero}]);
  }

  async getTotalEventos(id:number) {
    const datasetTablero = {
      id: 3,
      title: 'Eventos',
      value: await this.dataServices.sumaTotalEventosPorFondo(id).then(data => data),
      icon:'trending_up',
      color: 'rgb(255, 205, 86)'
    }

    this.listTableros.update(currentData => [... currentData, {... datasetTablero}]);
  }
}
