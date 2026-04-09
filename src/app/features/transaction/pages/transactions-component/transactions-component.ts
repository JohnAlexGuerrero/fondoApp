import { Component, signal } from '@angular/core';
import { TransactionsList } from '../../components/transactions-list/transactions-list';
import { MatAnchor, MatButtonModule } from "@angular/material/button";
import { Transaction } from '../../../../core/models/transaction';
import { DataServices } from '../../../../core/services/data-services';
import { NgClass } from '@angular/common';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-transactions-component',
  imports: [
    TransactionsList,
    MatAnchor,
    MatButtonModule,
    NgClass,
    MatDivider,
],
  templateUrl: './transactions-component.html',
  styles: `
    .button-active {
      background-color: #BBBB;
      color: white;
    }

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

  constructor(
    private dataServices: DataServices
  ) {}

  async filterGastos() {
    await this.dataServices.filterGastosPorFondo(this.fondoId).then(data => {
      this.transactions.set(data);
    })
  }

  async filterPrestamos() {
    await this.dataServices.filterPrestamosPorFondo(this.fondoId).then(data => {
      this.transactions.set(data);
    });
  }

  async filterEventos() {
    this.isActive = !this.isActive;
    await this.dataServices.filterEventosPorFondo(this.fondoId).then(data => {
      this.transactions.set(data);
    });
  }
  
  async filterAportes() {
    this.isActive = !this.isActive;
    await this.dataServices.filterAportesPorFondo(this.fondoId).then(data => {
      this.transactions.set(data);
      // console.log(this.transactions());
    });
  }

  async getAllTransactions() {
    this.dataServices.transactionsAll(this.fondoId).then(data => {
      this.transactions.set(data);
      // console.log(this.transactions());
    });
  }

  ngOnInit(): void {
    // Load aports from service when component initializes
    // Note: You'll need to pass a fondoId or get it from route/state
    this.getAllTransactions();
    
  }

}
