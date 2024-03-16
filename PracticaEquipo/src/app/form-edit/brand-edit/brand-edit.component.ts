import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-brand-edit',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule],
  templateUrl: './brand-edit.component.html',
  styleUrl: './brand-edit.component.css',
})
export class BrandEditComponent {
  constructor(private router: Router) {}
  redirectToChild() {
    this.router.navigate(['/navbar/tab-Marcas']);
  }
}
