import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CataloguesService } from '../../Core/Services/Catalogue/catalogues.service';
import { Catalogue } from '../../Core/Interfaces/catalogue';
import { NgForOf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tab-catalogo',
  standalone: true,
  imports: [NavbarComponent, NgForOf, RouterModule],
  templateUrl: './tab-catalogo.component.html',
  styleUrl: './tab-catalogo.component.css',
})
export class TabCatalogoComponent {
  catalogoList: Catalogue[] = [];

  constructor(private cataloguesService: CataloguesService) {
    this.getCatalogo();
  }
  getCatalogo() {
    this.cataloguesService.getCatalogues().subscribe({
      next: (result) => {
        this.catalogoList = result.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
