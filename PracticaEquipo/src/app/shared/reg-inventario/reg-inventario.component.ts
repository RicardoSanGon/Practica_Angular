import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-reg-inventario',
  standalone: true,
  imports: [
    RouterModule,
    NavbarComponent
  ],
  templateUrl: './reg-inventario.component.html',
  styleUrl: './reg-inventario.component.css'
})
export class RegInventarioComponent {

}
