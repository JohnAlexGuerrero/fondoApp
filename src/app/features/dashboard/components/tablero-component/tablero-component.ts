import { CommonModule } from '@angular/common';
import { Component, Input, signal} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

export interface TableroData {
  id: number;
  title: string;
  icon: string;
  value: number;
  color: string
}

@Component({
  selector: 'app-tablero-component',
  imports: [
    CommonModule,
    MatCardModule,
    MatIcon
  ],
  templateUrl: './tablero-component.html',
  styles: `

    .card {
      display: flex;
      flex-direction: column; 
      background: #fdfdfe; /* Blanco puro o casi puro */ 
      border-radius: 30px; /* Bordes muy redondeados */ 
      padding: 20px; margin: 15px; 
      box-shadow:  20px 20px 60px #d9d9d9,    /* Sombra oscura suave */ -20px -20px 60px #ffffff;   /* Sombra blanca brillante */ }

    .mat-card-title {
      font-size: 22px;
      color: #212529; /* Casi negro */
      font-weight: 600;
    }

    mat-card-footer {
      display: flex;
      align-items: center;
      font-size: 16px;
      color: #6c757d;
    }

    .subtitle {
      font-size: 14px;
      color: #6c757d; /* Gris medio */
    }

  section#summary {
      display: flex;
      gap: 5px;
      width: auto;
      font-size: 24px; 
    }

    @media (max-width: 500px) {
      section#summary {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 6px;
        font-size: 20px; 
      }
      mat-card {
        width: 200px;
        height: 230px;
      }
    }
  `,
})
export class TableroComponent {
  @Input() tablerosData : TableroData[] = [];

  constructor() {}  
}
