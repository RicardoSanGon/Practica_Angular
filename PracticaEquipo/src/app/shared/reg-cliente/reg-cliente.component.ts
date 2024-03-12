import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-reg-cliente',
  standalone: true,
  imports: [
    RouterModule,
    NavbarComponent
  ],
  templateUrl: './reg-cliente.component.html',
  styleUrl: './reg-cliente.component.css'
})
export class RegClienteComponent {

}
