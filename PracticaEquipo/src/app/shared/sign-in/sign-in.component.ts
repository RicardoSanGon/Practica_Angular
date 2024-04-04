import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterModule } from '@angular/router';
import { UserForm } from '../../Core/Interfaces/user-form';
import { UsersService } from '../../Core/Services/User/users.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterModule, NavbarComponent, FormsModule, NgIf],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  isLoading: boolean =false;
  user: UserForm = {
    name: '',
    email: '',
    password: '',
  };
  public errorEmail: String | null = null;
  public errorName: String | null = null;
  public errorPassword: String | null = null;
  constructor(private usersService: UsersService,
              private router:Router) {}

  submitForm() {
    this.isLoading = true;
    if (!this.validateForm()) {
      return;
    }

    this.usersService.createUser(this.user).subscribe(
      (response) => {

        this.router.navigate(['/']);
        console.log(response);
      },
      (error) => {
        if (error.error?.Errores?.email) {
          this.errorEmail = error.error.Errores.email;
        }
        if (error.error?.Errores?.name) {
          this.errorName = error.error.Errores.name;
        }
        if (error.error?.Errores?.password) {
          this.errorPassword = error.error.Errores.password;
        } else {
          this.errorEmail = null;
          this.errorName = null;
          this.errorPassword = null;
        }

        console.log(error);
      }
    );
  }

  private validateForm(): boolean {
    let isValid = true;

    if (!this.user.name || this.user.name.length < 3 || this.user.name.length > 50) {
      this.errorName = 'El nombre debe tener entre 3 y 50 caracteres';
      isValid = false;
    } else {
      this.errorName = null;
    }

    if (!this.user.email) {
      this.errorEmail = 'El correo es obligatorio';
      isValid = false;
    } else {
      this.errorEmail = null;
    }

    if (!this.user.password) {
      this.errorPassword = 'La contraseña es obligatoria';
      isValid = false;
    } else {
      this.errorPassword = null;
    }

    return isValid;
  }
}
