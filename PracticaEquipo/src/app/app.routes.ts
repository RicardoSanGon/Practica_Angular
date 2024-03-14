import { Routes } from '@angular/router';
import {AuthGuard} from "./Core/Guards/auth.guard";

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
    path: 'tab-orden-detalle/:id',
    loadComponent: () =>
      import(
        '../app/tables/tab-orden-detalle/tab-orden-detalle.component'
      ).then((c) => c.TabOrdenDetalleComponent),
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
        path: 'tab-Historial',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('../app/tables/tab-historial/tab-historial.component').then(
            (c) => c.TabHistorialComponent
          ),
      },
      {
<<<<<<< HEAD
=======
<<<<<<< HEAD
        path: 'catalogo/:id/edit',
        canActivate: [AuthGuard],
=======
        path: 'tab-orden-detalle/:id',
>>>>>>> 3ba9dd1f508ba4bc56f9d25e52a6aee5b671a7db
        loadComponent: () =>
          import(
            '../app/tables/tab-orden-detalle/tab-orden-detalle.component'
          ).then((c) => c.TabOrdenDetalleComponent),
      },
      {
>>>>>>> 66434065537ebd47172a8651d646ad7c2344843b
        path: 'carrito',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('../app/shared/carrito/carrito.component').then(
            (c) => c.CarritoComponent
          ),
      },
      {
        path: 'tab-Factura',
        loadComponent: () =>
          import(
            '../app/tables/tab-factura/tab-factura.component'
          ).then((c) => c.TabFacturaComponent),
      },
    ],
  },
];
