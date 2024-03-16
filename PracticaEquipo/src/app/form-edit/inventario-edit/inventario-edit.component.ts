import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-inventario-edit',
  standalone: true,
  imports: [ RouterModule],
  templateUrl: './inventario-edit.component.html',
  styleUrl: './inventario-edit.component.css',
})
export class InventarioEditComponent {
  constructor(private router: Router) {}
  redirectToChild() {
    this.router.navigate(['/navbar/tab-Inventario']);
  }
}
