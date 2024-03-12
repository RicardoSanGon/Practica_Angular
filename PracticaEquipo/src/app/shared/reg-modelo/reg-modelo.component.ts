import { Component } from '@angular/core';
import {Models} from "../../Core/Interfaces/models";
import {ModelsService} from "../../Core/Services/Model/models.service";
import {BrandsService} from "../../Core/Services/Brand/brands.service";
import {CataloguesService} from "../../Core/Services/Catalogue/catalogues.service";
<<<<<<< HEAD
import {NgForOf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import { NavbarComponent } from '../navbar/navbar.component';
=======
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
>>>>>>> 24e5ee321a8f84fa21f9871cfd0566617efe792e

@Component({
  selector: 'app-reg-modelo',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
<<<<<<< HEAD
    NavbarComponent
=======
    NgIf,
    FormsModule
>>>>>>> 24e5ee321a8f84fa21f9871cfd0566617efe792e
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
  public errorName:String|null=null;
  public errorDescription:String|null=null;
  public errorYear:String|null=null;
  public errorPrice:String|null=null;
  public errorStock:String|null=null;
  public msg:String|null=null;
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
          //redireccionar al login
          if(error.status===401)
          {
            console.log('Unauthenticated')
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
        if(error.status===401){
          //redireccionar al login
          return console.log('Unauthenticated');
        }

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
        if (error.error?.Errores?.model_name !== undefined && error.error.Errores.model_name !== null) {
          this.errorName = error.error.Errores.model_name;
        }
        if (error.error?.Errores?.model_year !== undefined && error.error.Errores.model_year !== null) {
          this.errorYear = error.error.Errores.model_year;
        }
        if (error.error?.Errores?.model_price !== undefined && error.error.Errores.model_price !== null) {
          this.errorPrice = error.error.Errores.model_price;
        }
        if (error.error?.Errores?.model_stock !== undefined && error.error.Errores.model_stock !== null) {
          this.errorStock = error.error.Errores.model_stock;
        }
        if (error.error?.Errores?.model_description !== undefined && error.error.Errores.model_description !== null) {
          this.errorDescription = error.error.Errores.model_description;
        }
        if (error.error?.model_brand !== undefined && error.error.model_brand !== null) {
          this.msg = error.error.model_brand;
        }
      });
  }
}
