import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import {NgForOf, NgIf} from '@angular/common';
import { Orders } from '../../Core/Interfaces/orders';
import { OrdersService } from '../../Core/Services/Order/orders.service';
import { Router, RouterModule } from '@angular/router';
import {UsersService} from "../../Core/Services/User/users.service";

@Component({
  selector: 'app-tab-ordenes',
  standalone: true,
  imports: [NavbarComponent, NgForOf, RouterModule, NgIf],
  templateUrl: './tab-ordenes.component.html',
  styleUrl: './tab-ordenes.component.css',
})
export class TabOrdenesComponent {
  ordersList: Orders[] = [];
  is_admin : boolean = false;

  constructor(private ordersService: OrdersService,
              private router: Router,
              private userService: UsersService) {
    this.getOrders();
    this.isAdmin();
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

  isAdmin(){
    this.userService.isAdmin().subscribe({
      next: (result) => {
        this.is_admin = result.is_admin;
      },
      error: (error) => {
        if (error.status === 401) {
          this.router.navigate(['/']);
        }
      },
    });
  }
}
