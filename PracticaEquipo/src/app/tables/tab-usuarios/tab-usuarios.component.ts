import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import {UserForm} from "../../Core/Interfaces/user-form";
import {User} from "../../Core/Interfaces/user";
import {UsersService} from "../../Core/Services/User/users.service";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Rol} from "../../Core/Interfaces/rol";


@Component({
  selector: 'app-tab-usuarios',
  standalone: true,
  imports: [NavbarComponent, NgForOf, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './tab-usuarios.component.html',
  styleUrl: './tab-usuarios.component.css'
})
export class TabUsuariosComponent {
  userList: User[]=[];

  userModify:User={
    id:0,
    name:"",
    email:"",
    status:"",
    rol:""
  }
  rols: Rol[] = [];

  constructor(private userService: UsersService) {
    this.getUsers()
    this.getRols()
  }


  getRols() {
    this.userService.getRols().subscribe(data => {
      console.log(data);
      this.rols = data.data;
    });

  }


  getUsers() {
    this.userService.getUsers().subscribe(data => {
      console.log(data);
      this.userList = data.data;
    });
  }

  isStatusChange($event: any) {
    this.userModify.status = $event.target.value;
  }

  updateUser() {
  // Validar que se haya seleccionado un estado y un rol
  if (!this.userModify.status || !this.userModify.rol) {
    console.log("Por favor selecciona un estado y un rol.");
    return;
  }

  // Si se han seleccionado ambos, proceder con la actualización
  this.userService.updateUser(this.userModify).subscribe(
    data => {
      console.log(data);
      this.getUsers();
    },
    error => {
      console.log(error);
    }
  );
}
  selectedRol($event: any) {
    this.userModify.rol = $event.target.value;
    console.log(this.userModify.rol);
  }

  selectedUser(item: User) {
    this.userModify = item;
  }

  
}
