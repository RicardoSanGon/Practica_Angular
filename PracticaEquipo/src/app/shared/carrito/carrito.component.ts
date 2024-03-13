import {ChangeDetectorRef, Component, NgModule, OnInit} from '@angular/core';
import {Injectable} from '@angular/core';
import {CarritoService} from "../../Core/Services/Carrito/carrito.service";
import {MapModels} from "../../Core/Interfaces/map-models";
import {NavbarComponent} from "../navbar/navbar.component";
import { NgForOf} from "@angular/common";

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [
    NavbarComponent,
    NgForOf
  ],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})


export class CarritoComponent implements OnInit{
  carrito: MapModels[]=[];
  constructor(private carritoService: CarritoService,
              private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {this.carrito = this.carritoService.obtenerCarrito();}

  eliminarElemento(item: MapModels) {
    this.carrito = this.carrito.filter(m => m.id !== item.id);
    this.carritoService.eliminarDelCarrito(item);
  }

  addElement(item: MapModels) {
    const carritoItem = this.carrito.find(m => m.id === item.id);
    if (carritoItem && carritoItem.cantidad && carritoItem.cantidad < carritoItem.existencias) {
      carritoItem.cantidad++;
      this.carritoService.actualizarCarrito(this.carrito);
      this.changeDetector.detectChanges();
    }
  }

  quiteElement(item: MapModels) {
    const carritoItem = this.carrito.find(m => m.id === item.id);
    if (carritoItem && carritoItem.cantidad && carritoItem.cantidad > 1) {
      carritoItem.cantidad--;
      this.carritoService.actualizarCarrito(this.carrito);
      this.changeDetector.detectChanges();
    }
  }
}
