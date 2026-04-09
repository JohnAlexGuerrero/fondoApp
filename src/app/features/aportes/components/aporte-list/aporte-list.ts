import { Component, input } from '@angular/core';
import { Aporte } from '../../../../core/models/aporte';
import { StackedBar } from '../stacked-bar/stacked-bar';
import { MatList, MatListItem } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-aporte-list',
  imports: [
    StackedBar,
  ],
  templateUrl: './aporte-list.html',
  styles: ``,
})
export class AporteList {
  miembroId = input.required<number>();

  constructor() {}

}
