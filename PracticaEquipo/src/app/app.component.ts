import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LogInComponent } from './shared/log-in/log-in.component';
import { SignInComponent } from './shared/sign-in/sign-in.component';
import { RegClienteComponent } from './shared/reg-cliente/reg-cliente.component';
import { RegProveedorComponent } from './shared/reg-proveedor/reg-proveedor.component';
import { RegInventarioComponent } from './shared/reg-inventario/reg-inventario.component';
import { RegMarcaComponent } from './shared/reg-marca/reg-marca.component';
import { RegModeloComponent } from './shared/reg-modelo/reg-modelo.component';
import { NavbarComponent } from './shared/navbar/navbar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    NavbarComponent,
    LogInComponent,
    SignInComponent,
    RegMarcaComponent,
    RegModeloComponent,
    RegClienteComponent,
    RegProveedorComponent,
    RegInventarioComponent,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PracticaEquipo';
}
