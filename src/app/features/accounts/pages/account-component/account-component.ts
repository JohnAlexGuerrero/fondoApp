import { Component, signal } from '@angular/core';
import { Miembro } from '../../../../core/models/miembro';
import { DataServices } from '../../../../core/services/data-services';
import { AccountList } from '../../components/account-list/account-list';

@Component({
  selector: 'app-account-component',
  imports: [
    AccountList,
  ],
  templateUrl: './account-component.html',
  styles: ``,
})
export class AccountComponent {
  fondoId: number = 1;
  accounts = signal<Miembro[]>([]);

  constructor(
    private dataServices: DataServices
  ){}

  async getAllMiembros() {
    this.dataServices.miembrosPorFondo(this.fondoId).then(data => {
      this.accounts.set(data);
      // console.log(this.accounts());
    });
  }

  ngOnInit() {
    this.getAllMiembros();
  }
}
