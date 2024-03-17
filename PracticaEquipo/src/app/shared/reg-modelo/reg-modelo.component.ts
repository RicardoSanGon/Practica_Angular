import { Component } from '@angular/core';
import {Models} from "../../Core/Interfaces/models";
import {ModelsService} from "../../Core/Services/Model/models.service";
import {BrandsService} from "../../Core/Services/Brand/brands.service";
import {CataloguesService} from "../../Core/Services/Catalogue/catalogues.service";
import { NavbarComponent } from '../navbar/navbar.component';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-reg-modelo',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NavbarComponent,
    NgIf,
    FormsModule
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
    brand_id: 0,
    model_status: '',
  }
  public catalogue_data:any = [];
  public brand_data:any = [];
  public errorName:String|null=null;
  public errorDescription:String|null=null;
  public errorYear:String|null=null;
  public errorPrice:String|null=null;
  public errorStock:String|null=null;
  public msg:String|null=null;
  constructor(private modelservice: ModelsService, private brandservice: BrandsService, private catalogueservice: CataloguesService) {
    this.getCatalogues();
  }

  private getCatalogues() {
    this.catalogueservice.getCatalogues().subscribe(
      (response) => {
        this.catalogue_data = response.data;
      },
      (error) => {
        if (error.status === 401) {
          console.log('Unauthenticated');
        }
      });
  }

  onCatalogueSelected(event: any) {
    this.model.brand_id = event.target.value;
    this.getBrands(this.model.brand_id);
  }

  getBrands(id: number) {
    this.brandservice.getBrands(id).subscribe(
      (response) => {
        this.brand_data = response.data;
        this.model.brand_id = this.brand_data[0].id;
      },
      (error) => {
        if (error.status === 401) {
          console.log('Unauthenticated');
        }
      });
  }

  onBrandSelected($event: any) {
    this.model.brand_id = $event.target.value;
  }

  submitForm() {
    if (!this.validateForm()) {
      return;
    }

    this.modelservice.createModel(this.model).subscribe(
      (response) => {
        console.log(response);
        alert('¡Modelo creado correctamente!');
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

  private validateForm(): boolean {
    let isValid = true;

    if (!this.model.model_name || this.model.model_name.length < 3) {
      this.errorName = 'El nombre del modelo debe tener al menos 3 caracteres';
      isValid = false;
    } else {
      this.errorName = null;
    }

    if (!this.model.model_year || this.model.model_year < 1900 || this.model.model_year > new Date().getFullYear()) {
      this.errorYear = 'Ingrese un año válido';
      isValid = false;
    } else {
      this.errorYear = null;
    }

    if (!this.model.model_price || this.model.model_price <= 0) {
      this.errorPrice = 'El precio debe ser mayor que cero';
      isValid = false;
    } else {
      this.errorPrice = null;
    }

    if (!this.model.model_stock || this.model.model_stock < 0) {
      this.errorStock = 'El stock debe ser mayor o igual a cero';
      isValid = false;
    } else {
      this.errorStock = null;
    }

    if (!this.model.model_description || this.model.model_description.length < 10) {
      this.errorDescription = 'La descripción debe tener al menos 10 caracteres';
      isValid = false;
    } else {
      this.errorDescription = null;
    }

    return isValid;
  }
}
