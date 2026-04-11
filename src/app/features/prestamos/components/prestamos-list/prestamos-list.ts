import { Component, input, signal } from '@angular/core';
import { Prestamo } from '../../../../core/models/prestamo';
import { MatList, MatListItem } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-prestamos-list',
  imports: [
    CommonModule,
    MatTableModule,
  ],
  templateUrl: './prestamos-list.html',
  styles: ``,
})
export class PrestamosList {
  // prestamos = input.required<Prestamo[]>();
  dataSource = input.required<Prestamo[]>();

  displayedColumns: string[] = ['Posicion','Fecha','Descripcion','Monto','Estado','Intereses','Meses','Acciones'];

  constructor() {}

  ngOnChanges() {
    if (this.dataSource().length != 0) {
      this.calculateInteres();
    }else {
      console.log("No se detecto cambios en la dataSource");
    }
  }

  ngOnInit() {
    if (this.dataSource().length != 0) {
       this.calculateInteres();
    }else {
      console.log("No hay prestamos registrados");
    }
  }

  calculateInteres() {
    this.dataSource().forEach(prestamo => {
      if (prestamo.status === 'cancelado') {
        prestamo.interes = 0;
        prestamo.months = 0;
      }else {
        const meses = this.calculateMonths(prestamo.created_at);
        const interes = prestamo.amount * 0.03 * (meses);
        prestamo.interes = parseFloat(interes.toFixed(2));
        prestamo.months = meses;
      }
    })
  };

  calculateMonths(createdAt: Date): number {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const months = (now.getFullYear() - createdDate.getFullYear()) * 12 + (now.getMonth() - createdDate.getMonth());
    return months;
  }
}
