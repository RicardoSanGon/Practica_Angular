import { Routes } from '@angular/router';

export const routes: Routes = [
<<<<<<< HEAD
/*  {
    path: '',
    loadComponent: () =>
      import('../app/shared/log-in/log-in.component').then(
        (c) => c.LogInComponent
      ),
  }, */
=======
>>>>>>> d6ff5ff9a5d074228aeb236c478aa5bc76aa94aa
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
<<<<<<< HEAD
      import('../app/shared/reg-marca/reg-marca.component').then(
        (c) => c.RegMarcaComponent
=======
      import('../app/shared/reg-modelo/reg-modelo.component').then(
        (c) => c.RegModeloComponent
>>>>>>> d6ff5ff9a5d074228aeb236c478aa5bc76aa94aa
      ),
  },
  {
    path: 'reg-Clientes',
    loadComponent: () =>
      import('../app/shared/reg-cliente/reg-cliente.component').then(
        (c) => c.RegClienteComponent
      ),
  },
];
