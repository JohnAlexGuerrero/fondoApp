import { Component, effect, signal } from '@angular/core';
import { DataServices } from '../../../../core/services/data-services';
import { TableroComponent, TableroData } from '../../components/tablero-component/tablero-component';
import { DoughnutChartComponent } from "../../components/doughnut-chart-component/doughnut-chart-component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User } from '../../../accounts/components/user/user';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-dashboard-user',
  imports: [
    TableroComponent,
    DoughnutChartComponent,
    User,
    MatButton,
    RouterLink
],
  templateUrl: './dashboard-user.html',
  styles: ``,
})
export class DashboardUser {
  userId: any = 1;
  userName: string = 'John Doe';
  fondoId: number = 1;
  date: Date = new Date();
  tableroData = signal<TableroData[]>([]);

  constructor (
    private dataServices: DataServices,
    private route: ActivatedRoute
  ) {
    this.userId = this.route.snapshot.paramMap.get('id');

  }

  ngOnInit() {
    this.getTotalGananciaPorMiembro();
    this.getSaldoPendientes();
    this.getSaldoInteresesPorMiembro();
    this.getSaldoPrestamoPorMiembro();
    this.getTotalAportesPorMiembro();
    this.getInfoMiembro();
  }

  async getInfoMiembro() {
    const userData = await this.dataServices.infoMiembro(this.userId, this.fondoId).then(data => data);
    this.userName = userData[0].names + ' ' + userData[0].lastname;
  }


  async getTotalGananciaPorMiembro() {
    const datasetTablero = {
      id: 6,
      title: 'Ganacias',
      value: await this.dataServices.totalGananciasPorMiembro(this.fondoId).then(data => data),
      icon:'trending_up',
      color: 'rgb(108, 193, 48)'
    }

    this.tableroData.update(currentData => [... currentData,  datasetTablero]);
  }

  async getSaldoPendientes() {
    const datasetTablero = {
      id: 5,
      title: 'Pendientes',
      value: -1 * await this.dataServices.saldoPendientePorMiembro(this.userId).then(data => data),
      icon:'trending_down',
      color: 'rgb(209, 185, 128)'
    }

    this.tableroData.update(currentData => [... currentData, datasetTablero]);
  }

  async getSaldoPrestamoPorMiembro() {
    const datasetTablero = {
      id: 2,
      title: 'Prestamos',
      value: -1 * await this.dataServices.saldoPrestamoPorMiembro(this.userId, this.fondoId).then(data => data),
      icon: 'trending_down',
      color:'rgb(255, 99, 132)'
    }

    this.tableroData.update(currentData => [... currentData, datasetTablero]);
  }

  async getTotalAportesPorMiembro() {
    const datasetTablero = {
      id: 1,
      title: 'Aportes',
      value: await this.dataServices.saldosAportesPorMiembro(this.userId, this.fondoId
      ).then(data => data),
      icon: 'trending_up',
      color: 'rgb(84, 147, 231)'
    }

    this.tableroData.update(currentData => [... currentData, datasetTablero]);
  }

  async getSaldoInteresesPorMiembro() {
    const datasetTablero = {
      id: 3,
      title: 'Intereses',
      value: -1 * await this.dataServices.saldoInteresesPorMiembro(this.userId, this.fondoId, this.date),
      icon:'trending_down',
      color: 'rgb(255, 205, 86)'
    }

    this.tableroData.update(currentData => [... currentData, datasetTablero]);
  }
}
