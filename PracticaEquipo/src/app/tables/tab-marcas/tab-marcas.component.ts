import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { NgForOf } from '@angular/common';
import { BrandByCatalogue } from '../../Core/Interfaces/brand-by-catalogue';
import { BrandsService } from '../../Core/Services/Brand/brands.service';
import { Brands } from '../../Core/Interfaces/brands';

@Component({
  selector: 'app-tab-marcas',
  standalone: true,
  imports: [NavbarComponent, NgForOf],
  templateUrl: './tab-marcas.component.html',
  styleUrl: './tab-marcas.component.css',
})
export class TabMarcasComponent {
  brandsList: Brands[] = [];

  constructor(private brandsService: BrandsService) {
    this.getBrands();
  }

  getBrands() {
    this.brandsService.tabgetBrands().subscribe({
      next: (result) => {
        this.brandsList = result.data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
