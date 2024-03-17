import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import {NgForOf, NgIf} from '@angular/common';
import { Inventory } from '../../Core/Interfaces/inventory';
import { InventoriesService } from '../../Core/Services/Inventory/inventories.service';
import { Inventories } from '../../Core/Interfaces/inventories';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsersService} from "../../Core/Services/User/users.service";
import {ModelsService} from "../../Core/Services/Model/models.service";
import {SuppliersService} from "../../Core/Services/Supplier/suppliers.service";
import {DataModels} from "../../Core/Interfaces/data-models";
import {Models} from "../../Core/Interfaces/models";
import {Supplier} from "../../Core/Interfaces/supplier";
import {MapModels} from "../../Core/Interfaces/map-models";


@Component({
  selector: 'app-tab-inventario',
  standalone: true,
  imports: [NavbarComponent, NgForOf, RouterModule, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './tab-inventario.component.html',
  styleUrl: './tab-inventario.component.css'
})
export class TabInventarioComponent {
  inventoryList:Inventories[] = [];
  modifyInventory: Inventories =
    {
      id: 0,
      admission_date: new Date(),
      stock: 0,
      vehicle_model_id: 0,
      supplier_id: 0,
    };
  is_admin: boolean= false;
  modelsData:MapModels[] = [];
  suppliersData:Supplier[] = [];

  constructor(private inventoriesService: InventoriesService,
              private userService:UsersService,
              private modelService: ModelsService,
              private supplierService:SuppliersService) {
    this.getInventory();
    this.IsAdmin();
    this.getModels();
    this.getSuppliers();
  }

  IsAdmin(){
    this.userService.isAdmin().subscribe({
      next: (result) => {
        this.is_admin = result.is_admin;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  getModels()
  {
    this.modelService.getModels().subscribe({
      next: (result) => {
        const data=result.data;
        for(let i=0;i<data.length;i++)
        {
          if (data[i].status == 'Activo')
          {
            this.modelsData.push(data[i]);
          }
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getSuppliers()
  {
    this.supplierService.getSuppliers().subscribe({
      next: (result) => {
        const data=result.data;
        for(let i=0;i<data.length;i++)
        {
          if (data[i].supplier_status.toString() === 'Activo')
          {
            this.suppliersData.push(data[i]);
          }
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
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

  selectedInventory(item: Inventories) {
    this.modifyInventory = item;
    for (let i=0;i<this.modelsData.length;i++)
    {
      if (this.modelsData[i].modelo == this.modifyInventory.vehicle_model_id.toString())
      {
        this.modifyInventory.vehicle_model_id = this.modelsData[i].id;
      }
    }

    for (let i=0;i<this.suppliersData.length;i++)
    {
      if (this.suppliersData[i].supplier_name == this.modifyInventory.supplier_id.toString())
      {
        this.modifyInventory.supplier_id = <number>this.suppliersData[i].id;
      }
    }
  }

  updateInventory() {
    this.inventoriesService.updateInventory(this.modifyInventory).subscribe({
      next: () => {
        this.inventoryList=[];
        this.getInventory();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  selectedSupplier($event: any) {
    this.modifyInventory.supplier_id = $event.target.value;
  }

  selectedModel($event: any) {
    this.modifyInventory.vehicle_model_id = $event.target.value;
    console.log(($event.target.value))
  }
}
