import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip'; // Opcional, para mostrar nombres al pasar el mouse
import { DataServices } from '../../../core/services/data-services';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-component',
  standalone:true,
  imports: [
    MatIconModule,
    MatToolbarModule, MatTooltipModule, MatButtonModule, RouterLink
  ],
  templateUrl: './navbar-component.html',
  styles: `
    .spacer {
      flex: 1 1 auto; /* Esto empuja los iconos a la derecha */
    }

    .navbar-container {
      display: flex;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }

    .nav-links {
      display: flex;
      gap: 8px; /* Espacio entre los botones */
    }
  `,
})
export class NavbarComponent {
  nameFondo: string = "Fondo Amor y Esperanza";

  constructor(
    private dataServices: DataServices
  ){}

  OnInit() {
    const fondoId = 1;

    this.getInfoFondo(fondoId).then(data => {
      this.nameFondo = data;
    });
    console.log(this.nameFondo);
  }

  async getInfoFondo(fondoId: number) {
    const data = await this.dataServices.fondoInfo(fondoId).then(data => data);
    console.log(data);
    return data;
  }

}
