import { Routes } from '@angular/router';

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
    path: 'navbar',
    loadComponent: () =>
      import('../app/shared/navbar/navbar.component').then(
        (c) => c.NavbarComponent
      ),
    children: [
      {
        path: 'reg-Proveedores',
        loadComponent: () =>
          import('../app/shared/reg-proveedor/reg-proveedor.component').then(
            (c) => c.RegProveedorComponent
          ),
      },
      {
        path: 'reg-Inventario',
        loadComponent: () =>
          import('../app/shared/reg-inventario/reg-inventario.component').then(
            (c) => c.RegInventarioComponent
          ),
      },
      {
        path: 'reg-Modelos',
        loadComponent: () =>
          import('../app/shared/reg-modelo/reg-modelo.component').then(
            (c) => c.RegModeloComponent
          ),
      },
      {
        path: 'reg-Marcas',
        loadComponent: () =>
          import('../app/shared/reg-marca/reg-marca.component').then(
            (c) => c.RegMarcaComponent
          ),
      },
      {
        path: 'reg-Clientes',
        loadComponent: () =>
          import('../app/shared/reg-cliente/reg-cliente.component').then(
            (c) => c.RegClienteComponent
          ),
      },
      {
        path: 'tab-Clientes',
        loadComponent: () =>
          import('../app/tables/tab-clientes/tab-clientes.component').then(
            (c) => c.TabClientesComponent
          ),
      },
      {
        path: 'tab-Proveedores',
        loadComponent: () =>
          import(
            '../app/tables/tab-proveedores/tab-proveedores.component'
          ).then((c) => c.TabProveedoresComponent),
      },
      {
        path: 'tab-Usuarios',
        loadComponent: () =>
          import('../app/tables/tab-usuarios/tab-usuarios.component').then(
            (c) => c.TabUsuariosComponent
          ),
      },
      {
        path: 'tab-Ordenes',
        loadComponent: () =>
          import('../app/tables/tab-ordenes/tab-ordenes.component').then(
            (c) => c.TabOrdenesComponent
          ),
      },
      {
        path: 'tab-Marcas',
        loadComponent: () =>
          import('../app/tables/tab-marcas/tab-marcas.component').then(
            (c) => c.TabMarcasComponent
          ),
      },
      {
        path: 'tab-Modelos',
        loadComponent: () =>
          import('../app/tables/tab-modelos/tab-modelos.component').then(
            (c) => c.TabModelosComponent
          ),
      },
      {
        path: 'tab-Catalogo',
        loadComponent: () =>
          import('../app/tables/tab-catalogo/tab-catalogo.component').then(
            (c) => c.TabCatalogoComponent
          ),
      },
      {
        path: 'tab-Inventario',
        loadComponent: () =>
          import('../app/tables/tab-inventario/tab-inventario.component').then(
            (c) => c.TabInventarioComponent
          ),
      },
      {
        path: 'tab-Historial',
        loadComponent: () =>
          import('../app/tables/tab-historial/tab-historial.component').then(
            (c) => c.TabHistorialComponent
          ),
      },
      /*RUTAS DE EDICION*/
      {
        path: 'catalogo/:id/edit',
        loadComponent: () =>
          import('../app/form-edit/catalogo-edit/catalogo-edit.component').then(
            (c) => c.CatalogoEditComponent
          ),
      },
      {
        path: 'carrito',
        loadComponent: () =>
          import('../app/shared/carrito/carrito.component').then(
            (c) => c.CarritoComponent
          ),
      },
    ],
  },
<<<<<<< HEAD
=======
  {
    path: 'reg-Inventario', loadComponent: () =>import('../app/shared/reg-inventario/reg-inventario.component').then((c) => c.RegInventarioComponent),
  },
  {
    path: 'reg-Modelos', loadComponent: () => import('../app/shared/reg-modelo/reg-modelo.component').then((c) => c.RegModeloComponent),
  },
  {
    path: 'reg-Marcas', loadComponent: () => import('../app/shared/reg-marca/reg-marca.component').then((c) => c.RegMarcaComponent),
  },
  {
    path: 'reg-Clientes', loadComponent: () =>import('../app/shared/reg-cliente/reg-cliente.component').then((c) => c.RegClienteComponent),
  },
  {
    path: 'tab-Clientes', loadComponent: () =>import('../app/tables/tab-clientes/tab-clientes.component').then((c) => c.TabClientesComponent),
  },
  {
    path: 'tab-Proveedores', loadComponent: () =>import('../app/tables/tab-proveedores/tab-proveedores.component').then((c) => c.TabProveedoresComponent),
  },
  {
    path: 'tab-Usuarios', loadComponent: () =>import('../app/tables/tab-usuarios/tab-usuarios.component').then((c) => c.TabUsuariosComponent),
  },
  {
    path: 'tab-Ordenes', loadComponent: () =>import('../app/tables/tab-ordenes/tab-ordenes.component').then((c) => c.TabOrdenesComponent),
  },
  {
    path: 'tab-Marcas', loadComponent: () =>import('../app/tables/tab-marcas/tab-marcas.component').then((c) => c.TabMarcasComponent),
  },
  {
    path: 'tab-Modelos', loadComponent: () =>import('../app/tables/tab-modelos/tab-modelos.component').then((c) => c.TabModelosComponent),
  },
  {
    path: 'tab-Catalogo', loadComponent: () =>import('../app/tables/tab-catalogo/tab-catalogo.component').then((c) => c.TabCatalogoComponent),
  },
  {
    path: 'tab-Inventario', loadComponent: () =>import('../app/tables/tab-inventario/tab-inventario.component').then((c) => c.TabInventarioComponent),
  },
  {
    path: 'tab-Historial', loadComponent: () =>import('../app/tables/tab-historial/tab-historial.component').then((c) => c.TabHistorialComponent),
  },
  /*RUTAS DE EDICION*/
  {
    path: 'catalogo/:id/edit', loadComponent: () =>import('../app/form-edit/catalogo-edit/catalogo-edit.component').then((c) => c.CatalogoEditComponent),
  },
  {
    path:'carrito', loadComponent: () =>import('../app/shared/carrito/carrito.component').then((c) => c.CarritoComponent),
  },
  {
    path:'code/verification',loadComponent: () =>import('../app/shared/cod-verificador/cod-verificador.component').then((c) => c.CodVerificadorComponent),
  }

>>>>>>> 8f52516fd76a96857b185325102c9cf6c8baf151
];
