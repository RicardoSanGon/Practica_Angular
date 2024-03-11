import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LogInComponent } from './shared/log-in/log-in.component';
import { SignInComponent } from './shared/sign-in/sign-in.component';
import { InterfazAdminComponent } from './shared/interfaz-admin/interfaz-admin.component';
import { RegClienteComponent } from './shared/reg-cliente/reg-cliente.component';
import { RegProveedorComponent } from './shared/reg-proveedor/reg-proveedor.component';
import { RegInventarioComponent } from './shared/reg-inventario/reg-inventario.component';
import { RegMarcaComponent } from './shared/reg-marca/reg-marca.component';
import { RegModeloComponent } from './shared/reg-modelo/reg-modelo.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HttpClient,provideHttpClient,withInterceptors} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    NavbarComponent,
    LogInComponent,
    SignInComponent,
    InterfazAdminComponent,
    RegMarcaComponent,
    RegModeloComponent,
    RegClienteComponent,
    RegProveedorComponent,
    RegInventarioComponent,
    RouterLink,
  HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PracticaEquipo';
}
