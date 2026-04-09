import { Component, OnInit } from '@angular/core';
import { DataServices } from '../../../../core/services/data-services';

import { MatListModule } from '@angular/material/list';
import { Transaction } from '../../../../core/models/transaction';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-data-list-component',
  imports: [
    CommonModule,
    MatListModule,
    MatIcon,
  ],
  templateUrl: './data-list-component.html',
  styles: `
    mat-list-item {
      border-radius: 10px;
      box-shadow: 2px 3px 10px #bbbb;
      margin-bottom: 5px;
    }
  `,
})
export class DataListComponent{
  transactions?: Transaction[];

  constructor(
    private dataServices: DataServices
  ) {}
  
  
  
  

  async getAportes(fondoId: number) {
    return await this.dataServices.listAportesPorFondo(fondoId).then(data => data);
  }


  
}
