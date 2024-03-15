import { Routes } from '@angular/router';
import {AuthGuard} from "./Core/Guards/auth.guard";
import {CatalogoEditComponent} from "./form-edit/catalogo-edit/catalogo-edit.component";
import {IsAdminGuard} from "./Core/Guards/is-admin.guard";
import {IsCodeVerifiedGuard} from "./Core/Guards/is-code-verified.guard";

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
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('../app/shared/reg-proveedor/reg-proveedor.component').then(
            (c) => c.RegProveedorComponent
          ),
      },
      {
        path: 'reg-Inventario',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('../app/shared/reg-inventario/reg-inventario.component').then(
            (c) => c.RegInventarioComponent
          ),
      },
      {
        path: 'reg-Modelos',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('../app/shared/reg-modelo/reg-modelo.component').then(
            (c) => c.RegModeloComponent
          ),
      },
      {
        path: 'reg-Marcas',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('../app/shared/reg-marca/reg-marca.component').then(
            (c) => c.RegMarcaComponent
          ),
      },
      {
        path: 'reg-Clientes',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('../app/shared/reg-cliente/reg-cliente.component').then(
            (c) => c.RegClienteComponent
          ),
      },
      {
        path: 'tab-Clientes',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('../app/tables/tab-clientes/tab-clientes.component').then(
            (c) => c.TabClientesComponent
          ),
      },
      {
        path: 'tab-Proveedores',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import(
            '../app/tables/tab-proveedores/tab-proveedores.component'
            ).then((c) => c.TabProveedoresComponent),
      },
      {
        path: 'tab-Usuarios',
        canActivate: [AuthGuard],
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
        children: [
          {
            path: 'catalogo/:id/edit',
            canActivate: [AuthGuard,IsCodeVerifiedGuard],
            loadComponent: () =>
              import('../app/form-edit/catalogo-edit/catalogo-edit.component').then(
                (c) => c.CatalogoEditComponent
              ),
          },
        ]
      },
      {
        path: 'tab-Inventario',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('../app/tables/tab-inventario/tab-inventario.component').then(
            (c) => c.TabInventarioComponent
          ),
      },
      {
        path: 'tab-orden-detalle/:id',
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
        path:'historial',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('../app/tables/historial/historial.component').then(
            (c) => c.HistorialComponent
          ),
      },
      {
        path:'tab-Facturas',
        canActivate: [AuthGuard,IsCodeVerifiedGuard],
        loadComponent: () =>
          import('../app/tables/tab-faturacion/tab-faturacion.component').then(
            (c) => c.TabFaturacionComponent
          ),
      }

    ],
  },
];
