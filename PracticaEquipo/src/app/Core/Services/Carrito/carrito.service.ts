import { Injectable } from '@angular/core';
import {MapModels} from "../../Interfaces/map-models";
import {HttpClient} from "@angular/common/http";
import {Carrito} from "../../Interfaces/carrito";
import {Observable} from "rxjs";
import {MsgResponse} from "../../Interfaces/MsgResponse";


@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: MapModels[] = [];

  constructor(private http: HttpClient) {
  }

  agregarAlCarrito(model: MapModels) {
    const item = this.carrito.find(m => m.id === model.id);
    if (item) {
      if (item.cantidad && item.cantidad < model.existencias) {
        item.cantidad++;
      }
    } else {
      const modelCopy = { ...model, cantidad: 1 };
      this.carrito.push(modelCopy);
    }
  }

  obtenerCarrito() {
    return this.carrito;
  }

  eliminarDelCarrito(item: MapModels) {
    this.carrito = this.carrito.filter(m => m.id !== item.id);
  }

  addElement(item: MapModels) {
    const carritoItem = this.carrito.find(m => m.id === item.id);
    if (carritoItem?.cantidad && carritoItem.cantidad < carritoItem.existencias) {
      carritoItem.cantidad++;
    }
  }

  quiteElement(item: MapModels) {
    const carritoItem = this.carrito.find(m => m.id === item.id);
    if (carritoItem?.cantidad && carritoItem.cantidad > 1) {
      carritoItem.cantidad--;
    }
  }
  actualizarCarrito(carrito: MapModels[]) {
    this.carrito = carrito;
  }

  enviarCarrito(carrito:Carrito):Observable<MsgResponse>
  {
    return this.http.post<MsgResponse>('http://127.0.0.1:8000/api/order/details/create', this.carrito)
  }

  eliminarCarrito() {
    this.carrito = [];
  }
}
