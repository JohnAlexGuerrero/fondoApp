import { Component, computed, signal } from '@angular/core';
import { TransactionsList } from '../../components/transactions-list/transactions-list';
import { MatButtonModule } from "@angular/material/button";
import { Transaction } from '../../../../core/models/transaction';
import { DataServices } from '../../../../core/services/data-services';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-transactions-component',
  imports: [
    TransactionsList,
    MatButtonModule,
    NgClass,
    CommonModule,
],
  templateUrl: './transactions-component.html',
  styles: `

    button {
      border: 1px solid #BBBB;
      border-radius: 5px;
      padding: 5px 8px;
      margin-left: 5px;
    }
  `,
})
export class TransactionsComponent {
  transactions = signal<Transaction[]>([]);
  fondoId = 1; // Replace with actual fondoId source
  isActive: boolean = false;
  
  totalValue = signal<number>(0);

  constructor(
    private dataServices: DataServices
  ) {}

  async filterGastos() {
    await this.dataServices.filterGastosPorFondo(this.fondoId).then(data => {
      this.transactions.set(data);
    })

    let value: number = 0;
    this.transactions().forEach(el => {
      value = el.amount + value
    });

    this.totalValue.set(value);
  }

  async filterPrestamos() {
    await this.dataServices.filterPrestamosPorFondo(this.fondoId).then(data => {
      this.transactions.set(data);
    });
    
    let valueIn: number = 0;
    let valueOut: number = 0;
    this.transactions().forEach(el => {
      if (el.type == 'Ingreso') {
        valueIn = el.amount + valueIn
      }else {
        valueOut = el.amount + valueOut
      }
    });

    this.totalValue.set(valueIn - valueOut);
  }

  async filterEventos() {
    this.isActive = !this.isActive;
    await this.dataServices.filterEventosPorFondo(this.fondoId).then(data => {
      this.transactions.set(data);
    });
    
    let value: number = 0;
    this.transactions().forEach(el => {
      value = el.amount + value
    });

    this.totalValue.set(value);
  }
  
  async filterAportes() {
    this.isActive = !this.isActive;
    await this.dataServices.filterAportesPorFondo(this.fondoId).then(data => {
      this.transactions.set(data);
      // console.log(this.transactions());
    });
    
    let value: number = 0;
    this.transactions().forEach(el => {
      value = el.amount + value
    });

    this.totalValue.set(value);
  }

  async getAllTransactions() {
    this.dataServices.transactionsAll(this.fondoId).then(data => {
      this.transactions.set(data);
      // console.log(this.transactions());
    });
    
    let valueIn: number = 0;
    let valueOut: number = 0;
    this.transactions().forEach(el => {
      if (el.type == 'Ingreso') {
        valueIn = el.amount + valueIn
      }else {
        valueOut = el.amount + valueOut
      }
    });

    this.totalValue.set(valueIn - valueOut);
  }

  ngOnInit(): void {
    // Load aports from service when component initializes
    // Note: You'll need to pass a fondoId or get it from route/state
    this.getAllTransactions();
    
  }

}
