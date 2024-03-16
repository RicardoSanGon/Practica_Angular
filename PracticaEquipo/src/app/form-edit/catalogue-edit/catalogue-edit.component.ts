import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-catalogue-edit',
  standalone: true,
  imports: [ RouterModule],
  templateUrl: './catalogue-edit.component.html',
  styleUrl: './catalogue-edit.component.css'
})
export class CatalogueEditComponent {
  constructor(private router: Router) {}
  redirectToChild() {
    this.router.navigate(['/navbar/tab-Catalogo']);
  }
}
