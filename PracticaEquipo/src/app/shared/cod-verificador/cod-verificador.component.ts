import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UsersService} from "../../Core/Services/User/users.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-cod-verificador',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './cod-verificador.component.html',
  styleUrl: './cod-verificador.component.css'
})
export class CodVerificadorComponent {
  verificationCode: number=0;
  errorCode:String|null=null;
  isLoading: boolean =false;

  constructor(private userService: UsersService,
    private router: Router) {
}

submitCode() {
    this.isLoading = true;
this.userService.CodeVerification({code: this.verificationCode}).subscribe(
(data) => {
console.log(data);
this.router.navigate(['navbar/tab-Catalogo']);
},
(error) => {
console.log(error);
if (error.status === 401) {
this.router.navigate(['/']);
} else {
if (error.error?.Errores?.code !== undefined && error.error.Errores.code !== null) {
  this.errorCode = error.error.Errores.code;
} else {
  if (error.error?.msg !== undefined && error.error?.msg !== null) {
    this.errorCode = error.error.msg;
  }
}
}
}
);
}
}
