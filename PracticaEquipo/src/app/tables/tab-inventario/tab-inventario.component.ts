import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { NgForOf } from '@angular/common';
import { Inventory } from '../../Core/Interfaces/inventory';
import { InventoriesService } from '../../Core/Services/Inventory/inventories.service';
import { Inventories } from '../../Core/Interfaces/inventories';


@Component({
  selector: 'app-tab-inventario',
  standalone: true,
  imports: [NavbarComponent, NgForOf],
  templateUrl: './tab-inventario.component.html',
  styleUrl: './tab-inventario.component.css'
})
export class TabInventarioComponent {
  inventoryList:Inventories[] = [];

  constructor(private inventoriesService: InventoriesService) {
    this.getInventory();
  }

  getInventory(){
    this.inventoriesService.getInventory().subscribe({
      next: (result) => {
        this.inventoryList = result.data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
