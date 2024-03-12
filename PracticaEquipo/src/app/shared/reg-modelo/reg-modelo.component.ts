import { Component } from '@angular/core';
import {Models} from "../../Core/Interfaces/models";
import {ModelsService} from "../../Core/Services/Model/models.service";
import {BrandsService} from "../../Core/Services/Brand/brands.service";
import {CataloguesService} from "../../Core/Services/Catalogue/catalogues.service";
import {NgForOf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-reg-modelo',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NavbarComponent
  ],
  templateUrl: './reg-modelo.component.html',
  styleUrl: './reg-modelo.component.css'
})
export class RegModeloComponent {
  public model:Models=
  {
    id: 0,
    model_name: '',
    model_year: 0,
    model_description: '',
    model_price: 0,
    model_stock: 0,
    brand_id: 0
  }
  public catalogue_data:any = [];
  public brand_data:any = [];
  constructor(private modelservice:ModelsService,private brandservice:BrandsService, private catalogueservice:CataloguesService)
  {
    this.getCatalogues();
  }



  private getCatalogues() {
    this.catalogueservice.getCatalogues().subscribe(
      (response) => {
        this.catalogue_data = response.data;
      },
      (error) => {
        if(error.message==='Unauthenticated.'){
          //redireccionar al login
          return console.log('No estas autenticado');
        }
        //otro error
      });
  }

  onCatalogueSelected(event: any) {
    this.model.brand_id = event.target.value;
    this.getBrands(this.model.brand_id);
  }

  getBrands(id:number)
  {
    this.brandservice.getBrands(id).subscribe(
      (response) => {
        this.brand_data = response.data;
        this.model.brand_id = this.brand_data[0].id;
      },
      (error) => {
        if(error.message==='Unauthenticated.'){
          //redireccionar al login
          return console.log('No estas autenticado');
        }
        //otro error
      });
  }

  onBrandSelected($event: any) {
    this.model.brand_id = $event.target.value;
  }

  submitForm() {
    this.modelservice.createModel(this.model).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      });
  }
}
