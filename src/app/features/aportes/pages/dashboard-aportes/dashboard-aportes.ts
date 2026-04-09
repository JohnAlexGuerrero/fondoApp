import { Component, effect, signal } from '@angular/core';
import { DataServices } from '../../../../core/services/data-services';
import { Aporte } from '../../../../core/models/aporte';
import { Miembro } from '../../../../core/models/miembro';
import { CommonModule } from '@angular/common';
import { StackedBar } from '../../components/stacked-bar/stacked-bar';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-aportes',
  imports: [
    CommonModule,
    StackedBar,
    MatCard, MatIcon, MatCardContent,MatCardFooter,
    MatCardHeader
],
  templateUrl: './dashboard-aportes.html',
  styles: ``,
})
export class DashboardAportes {
  userId: number = 8;
  fondoId: number = 1;
  aportes = signal<Aporte[]>([]);
  miembros = signal<Miembro[]>([]);
  
  constructor(
    private dataServices: DataServices
  ) {
    effect(() => {
      this.getAllAportes();
    })
  }

  async getAllAportes() {
    await this.dataServices.miembrosPorFondo(this.fondoId).then(data => {
      this.miembros.set(data);
    })
  }

}
