import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { NgForOf } from '@angular/common';
import { Orders } from '../../Core/Interfaces/orders';
import { OrdersService } from '../../Core/Services/Order/orders.service';

@Component({
  selector: 'app-tab-ordenes',
  standalone: true,
  imports: [NavbarComponent, NgForOf],
  templateUrl: './tab-ordenes.component.html',
  styleUrl: './tab-ordenes.component.css',
})
export class TabOrdenesComponent {
  ordersList: Orders[] = [];

  constructor(private ordersService: OrdersService) {
    this.getOrders();
  }

  getOrders() {
    this.ordersService.getOrders().subscribe({
      next: (result) => {
        this.ordersList = result.data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
