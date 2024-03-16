import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-provider-edit',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './provider-edit.component.html',
  styleUrl: './provider-edit.component.css'
})
export class ProviderEditComponent {
  constructor(private router: Router) {}
  redirectToChild() {
    this.router.navigate(['/navbar/tab-Proveedores']);
  }
}
