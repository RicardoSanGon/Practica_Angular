import { Routes } from '@angular/router';

export const routes: Routes = [
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 45bd765e3240c9ebfd935785e217e4f07b8a1a4c
/*  {
    path: '',
    loadComponent: () =>
      import('../app/shared/log-in/log-in.component').then(
        (c) => c.LogInComponent
      ),
  }, */
<<<<<<< HEAD
=======
>>>>>>> d6ff5ff9a5d074228aeb236c478aa5bc76aa94aa
=======
>>>>>>> 45bd765e3240c9ebfd935785e217e4f07b8a1a4c
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
<<<<<<< HEAD
      import('../app/shared/reg-marca/reg-marca.component').then(
        (c) => c.RegMarcaComponent
=======
      import('../app/shared/reg-modelo/reg-modelo.component').then(
        (c) => c.RegModeloComponent
>>>>>>> d6ff5ff9a5d074228aeb236c478aa5bc76aa94aa
=======
      import('../app/shared/reg-marca/reg-marca.component').then(
        (c) => c.RegMarcaComponent
>>>>>>> 45bd765e3240c9ebfd935785e217e4f07b8a1a4c
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
