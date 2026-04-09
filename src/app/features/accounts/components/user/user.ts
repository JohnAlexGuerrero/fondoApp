import { Component, input, viewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-user',
  imports: [
    MatIcon,
  ],
  templateUrl: './user.html',
  styles: `

    .user-icon {
      width: 100px;
      height: 100px;
      border-radius: 15%;
      background-color: #f1ecf4;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1px;
    }

    .user-icon mat-icon {
      width: auto;
      height: auto;
      font-size: 2.8rem;
    }

    .user-names {
      font-size: 1.5rem;
      font-weight: 500;
      padding: 2px;
    }
  `,
})
export class User {
  names = input.required<string>();

}
