import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';


@Component({
  selector: 'app-tab-clientes',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './tab-clientes.component.html',
  styleUrl: './tab-clientes.component.css'
})
export class TabClientesComponent {

}
