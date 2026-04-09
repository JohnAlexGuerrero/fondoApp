import { Component, Input,  } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-data-table-component',
  imports: [
    MatFormField, MatLabel,
    MatTableModule,
  ],
  templateUrl: './data-table-component.html',
  styles: ``,
})
export class DataTableComponent {
  @Input() dataSource!: any[];
  @Input() displayedColumns?: string[];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource!.filter = filterValue.trim().toLowerCase();
  }

}
