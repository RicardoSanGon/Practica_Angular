import { Component } from '@angular/core';
import {BrandsService} from "../../Core/Services/Brand/brands.service";
import {Brand} from "../../Core/Interfaces/brand";
import {CataloguesService} from "../../Core/Services/Catalogue/catalogues.service";
import {NgForOf, NgIf} from "@angular/common";
import {CatalogueIndex} from "../../Core/Interfaces/catalogue-index";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-reg-marca',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    NavbarComponent
  ],
  templateUrl: './reg-marca.component.html',
  styleUrl: './reg-marca.component.css'
})
export class RegMarcaComponent {
  public brand:Brand={
    brand_name:null,
    catalogue_id:null
  } ;
  public data:any[] = [];
  public errorName:String|null = null;
  public errorCatalogue:String|null = null;
constructor(private brandservice: BrandsService,private catalogueservice:CataloguesService) {
  this.getCatalogues();
}

  private getCatalogues() {
    this.catalogueservice.getCatalogues().subscribe(
      (response) => {
        this.data = response.data;
      },
      (error) => {
        if(error.status===401){
          //redireccionar al login
          return console.log('No estas autenticado');
        }
        //otro error
      });
  }


  public onSelectChange(event: any) {
    this.brand.catalogue_id = event.target.value;
  }
  public submitForm() {
    this.brandservice.createBrand(this.brand).subscribe(
      (response) => {
        this.errorName = null;
        this.errorCatalogue = null;
        console.log(response)
      },
      (error) => {
        if(error.message==='Unauthenticated.'){
          //redireccionar al login
          return console.log('No estas autenticado');
        }
        if (error.error?.Errores?.brand_name!==undefined && error.error.Errores.brand_name!==null)
        {
          this.errorName = error.error.Errores.brand_name;
        }
        else {
          this.errorName = null;
        }
        if (error.error?.catalogue_id!==undefined && error.error.catalogue_id!==null)
        {
          this.errorCatalogue = error.error.catalogue_id;
        }
        else {
          this.errorCatalogue = null;
        }
      });
  }

}
