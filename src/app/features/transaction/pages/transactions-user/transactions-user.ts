import { Component, signal } from '@angular/core';
import { DataServices } from '../../../../core/services/data-services';
import { MatDivider } from '@angular/material/divider';
import { TransactionsList } from '../../components/transactions-list/transactions-list';
import { Transaction } from '../../../../core/models/transaction';
import { ActivatedRoute } from '@angular/router';
import { PrestamosList } from '../../../prestamos/components/prestamos-list/prestamos-list';
import { Prestamo } from '../../../../core/models/prestamo';

@Component({
  selector: 'app-transactions-user',
  imports: [
    MatDivider,
    TransactionsList,
    PrestamosList,
  ],
  templateUrl: './transactions-user.html',
  styles: ``,
})
export class TransactionsUser {
  userId: number = 1;
  fondoId: number = 1;
  public prestamos = signal<Prestamo[]>([]);
  public transactions = signal<Transaction[]>([]);

  constructor(
    private dataServices: DataServices,
    private route: ActivatedRoute
  ) {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.getPrestamos();
  }

  async getPrestamos() {
    this.dataServices.getPrestamoPorMiembro(this.userId, this.fondoId).then(data => {
      this.prestamos.set(data);
    })
  }

}
