import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { NgForOf } from '@angular/common';


@Component({
  selector: 'app-tab-ordenes',
  standalone: true,
  imports: [
    NavbarComponent, NgForOf
  ],
  templateUrl: './tab-ordenes.component.html',
  styleUrl: './tab-ordenes.component.css'
})
export class TabOrdenesComponent {

}
