import { Component, Input } from '@angular/core';
import { Miembro } from '../../../../core/models/miembro';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatAnchor } from "@angular/material/button";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-account-list',
  imports: [
    MatIcon,
    MatListModule,
    CommonModule,
    MatAnchor,
    RouterLink
],
  templateUrl: './account-list.html',
  styles: `
    mat-list-item {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: left;
      flex-direction: column;
    }

    .list-item {
    }
  
  `,
})
export class AccountList {
  @Input() miembros: Miembro[] = [];
}
