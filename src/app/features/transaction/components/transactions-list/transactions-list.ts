import { Component, Input } from '@angular/core';
import { Transaction } from '../../../../core/models/transaction';

import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions-list',
  imports: [
    MatListModule,
    MatIcon,
    CommonModule
  ],
  templateUrl: './transactions-list.html',
  styles: `

    mat-list {
      width: 100%;
      height: 600px;
      overflow-y: scroll;
    }

    mat-icon {
      width: 40px;
      height: 40px;
      border: 1px solid #BBBB;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background-color: rgb(75, 192, 192);
      color: white;
    }

    .description-large {
      width: 300px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: justify;
    }
  `,
})
export class TransactionsList {
  @Input() transactions: Transaction[] = [];

}
