import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-modelo-edit',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './modelo-edit.component.html',
  styleUrl: './modelo-edit.component.css'
})
export class ModeloEditComponent {
  constructor(private router: Router) {}
  redirectToChild() {
    this.router.navigate(['/navbar/tab-Modelos']);
  }
}
