import { Routes } from '@angular/router';
import { AuthGuard } from './Core/Guards/auth.guard';
import { IsAdminGuard } from './Core/Guards/is-admin.guard';
import { IsCodeVerifiedGuard } from './Core/Guards/is-code-verified.guard';
import {IsClientGuard} from "./Core/Guards/is-client.guard";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../app/shared/log-in/log-in.component').then(
        (c) => c.LogInComponent
      ),
  },
  {
    path: 'signIn',
    loadComponent: () =>
      import('../app/shared/sign-in/sign-in.component').then(
        (c) => c.SignInComponent
      ),
  },
  {
    path: 'code/verification',
    loadComponent: () =>
      import('../app/shared/cod-verificador/cod-verificador.component').then(
        (c) => c.CodVerificadorComponent
      ),
  },
  {
    path: 'navbar',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('../app/shared/navbar/navbar.component').then(
        (c) => c.NavbarComponent
      ),
    children: [
      {
        path: 'reg-Proveedores',
        canActivate: [AuthGuard,IsCodeVerifiedGuard,IsAdminGuard],
        loadComponent: () =>
          import('../app/shared/reg-proveedor/reg-proveedor.component').then(
            (c) => c.RegProveedorComponent
          ),
      },
      {
        path: 'reg-Inventario',
        canActivate: [AuthGuard,IsCodeVerifiedGuard,IsAdminGuard],
        loadComponent: () =>
          import('../app/shared/reg-inventario/reg-inventario.component').then(
            (c) => c.RegInventarioComponent
          ),
      },
      {
        path: 'reg-Modelos',
        canActivate: [AuthGuard,IsCodeVerifiedGuard,IsAdminGuard],
        loadComponent: () =>
          import('../app/shared/reg-modelo/reg-modelo.component').then(
            (c) => c.RegModeloComponent
          ),
      },
      {
        path: 'reg-Marcas',
        canActivate: [AuthGuard,IsCodeVerifiedGuard,IsAdminGuard],
        loadComponent: () =>
          import('../app/shared/reg-marca/reg-marca.component').then(
            (c) => c.RegMarcaComponent
          ),
      },
      {
        path: 'reg-Clientes',
        canActivate: [AuthGuard, IsCodeVerifiedGuard],
        loadComponent: () =>
          import('../app/shared/reg-cliente/reg-cliente.component').then(
            (c) => c.RegClienteComponent
          ),
      },
      {
        path: 'tab-Clientes',
        canActivate: [AuthGuard,IsAdminGuard],
        loadComponent: () =>
          import('../app/tables/tab-clientes/tab-clientes.component').then(
            (c) => c.TabClientesComponent
          ),
      },
      {
        path: 'tab-Proveedores',
        canActivate: [AuthGuard,IsAdminGuard],
        loadComponent: () =>
          import(
            '../app/tables/tab-proveedores/tab-proveedores.component'
          ).then((c) => c.TabProveedoresComponent),
      },
      {
        path: 'tab-Usuarios',
        canActivate: [AuthGuard,IsAdminGuard],
        loadComponent: () =>
          import('../app/tables/tab-usuarios/tab-usuarios.component').then(
            (c) => c.TabUsuariosComponent
          ),
      },
      {
        path: 'tab-Ordenes',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('../app/tables/tab-ordenes/tab-ordenes.component').then(
            (c) => c.TabOrdenesComponent
          ),
      },
      {
        path: 'tab-Marcas',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('../app/tables/tab-marcas/tab-marcas.component').then(
            (c) => c.TabMarcasComponent
          ),
      },
      {
        path: 'tab-Modelos',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('../app/tables/tab-modelos/tab-modelos.component').then(
            (c) => c.TabModelosComponent
          ),
      },
      {
        path: 'tab-Catalogo',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('../app/tables/tab-catalogo/tab-catalogo.component').then(
            (c) => c.TabCatalogoComponent
          ),
      },
      {
        path: 'tab-Inventario',
        canActivate: [AuthGuard,IsAdminGuard],
        loadComponent: () =>
          import('../app/tables/tab-inventario/tab-inventario.component').then(
            (c) => c.TabInventarioComponent
          ),
      },
      {
        path: 'tab-orden-detalle',
        loadComponent: () =>
          import(
            '../app/tables/tab-orden-detalle/tab-orden-detalle.component'
          ).then((c) => c.TabOrdenDetalleComponent),
      },
      {
        path: 'carrito',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('../app/shared/carrito/carrito.component').then(
            (c) => c.CarritoComponent
          ),
      },
      {
        path: 'historial',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('../app/tables/historial/historial.component').then(
            (c) => c.HistorialComponent
          ),
      },
      {
        path: 'tab-Facturas',
        canActivate: [AuthGuard, IsCodeVerifiedGuard],
        loadComponent: () =>
          import('../app/tables/tab-faturacion/tab-faturacion.component').then(
            (c) => c.TabFaturacionComponent
          ),
      },
      {
        path: 'edit-clientes',
        canActivate: [AuthGuard, IsCodeVerifiedGuard],
        loadComponent: () =>
          import('../app/form-edit/customer-edit/customer-edit.component').then(
            (c) => c.CustomerEditComponent
          ),
      },
      {
        path:'tab-Logs',
        canActivate: [AuthGuard,IsCodeVerifiedGuard,IsAdminGuard],
        loadComponent: () =>
          import('../app/tables/tab-log/tab-log.component').then(
            (c) => c.TabLogComponent
          ),
      }
    ],
  },
  //RUTAS DE EDICION
  {
    path: 'edit-Marcas/:id',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('../app/form-edit/brand-edit/brand-edit.component').then(
        (c) => c.BrandEditComponent
      ),
  },
  {
    path: 'edit-Modelos/:id',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('../app/form-edit/modelo-edit/modelo-edit.component').then(
        (c) => c.ModeloEditComponent
      ),
  },
  {
    path: 'edit-Proveedores/:id',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('../app/form-edit/provider-edit/provider-edit.component').then(
        (c) => c.ProviderEditComponent
      ),
  },
  {
    path: 'edit-Inventario/:id',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('../app/form-edit/inventario-edit/inventario-edit.component').then(
        (c) => c.InventarioEditComponent
      ),
  },
  {
    path: 'edit-Catalogo/:id',
    canActivate: [AuthGuard, IsCodeVerifiedGuard],
    loadComponent: () =>
      import('../app/form-edit/catalogue-edit/catalogue-edit.component').then(
        (c) => c.CatalogueEditComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'navbar/tab-Catalogo',
  }

];
