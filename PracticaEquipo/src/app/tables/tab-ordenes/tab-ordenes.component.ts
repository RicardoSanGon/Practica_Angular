import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import {NgForOf, NgIf} from '@angular/common';
import { Orders } from '../../Core/Interfaces/orders';
import { OrdersService } from '../../Core/Services/Order/orders.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tab-ordenes',
  standalone: true,
  imports: [NavbarComponent, NgForOf, RouterModule, NgIf],
  templateUrl: './tab-ordenes.component.html',
  styleUrl: './tab-ordenes.component.css',
})
export class TabOrdenesComponent {
  ordersList: Orders[] = [];
  is_admin: boolean= false;

  constructor(private ordersService: OrdersService, private router: Router) {
    this.getOrders();
  }

  getOrders() {
    this.ordersService.getOrders().subscribe({
      next: (result) => {
        this.ordersList = result.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  onDetailClick(id: number) {
    this.router.navigate(['navbar/tab-orden-detalle', id]);
  }
}
