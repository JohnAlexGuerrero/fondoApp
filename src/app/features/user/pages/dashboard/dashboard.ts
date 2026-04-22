import { Component, signal } from '@angular/core';
import { DataServices } from '../../../../core/services/data-services';
import { ActivatedRoute, isActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../../../core/models/transaction';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule
  ],
  templateUrl: './dashboard.html',
  styles: ``,
})
export class Dashboard {
  userId: any = 1;
  fondoId: number = 1;
  userName = signal<string>('John Doe');
  totalAportes = signal<number>(0.0);
  transactions = signal<Transaction[]>([]);

  constructor(
    private dataServices: DataServices,
    private route: ActivatedRoute
  ) {
    this.userId = this.route.snapshot.paramMap.get('id');
  }
  
  ngOnInit() {
    this.getInfoUser();
    this.getTotalAportes();
    this.getTransactionsAllByMember();
  }

  async getInfoUser() {
    const userData = await this.dataServices.infoMiembro(this.userId, this.fondoId).then(data => data);
    this.userName.set(userData[0].names + ' ' + userData[0].lastname);
  }

  async getTotalAportes() {
    const value = await this.dataServices.saldosAportesPorMiembro(this.userId, this.fondoId).then(data => data);
    this.totalAportes.set(value);
  }

  async getTransactionsAllByMember(){
    const dataset = await this.dataServices.transaccionesPorMiembro(this.userId, this.fondoId).then(data => data);
    console.log(dataset);
    dataset.forEach((element: any) => {
      const dataTransaction = {
        id: element.id, description: element.description, amount: element.amount, type: element.type, created_at: element.created_at, isActive: (element.type == 'Ingreso' ? true : false)
      }
      this.transactions.update(currentData => [... currentData, dataTransaction]);
    })
  }

}
