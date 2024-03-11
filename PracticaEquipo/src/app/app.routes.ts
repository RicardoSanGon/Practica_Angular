import { Routes } from '@angular/router';

export const routes: Routes = [
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
      import('../app/shared/reg-modelo/reg-modelo.component').then(
        (c) => c.RegModeloComponent
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
