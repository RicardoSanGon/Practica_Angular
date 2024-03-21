import {Component, OnInit} from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import {UserForm} from "../../Core/Interfaces/user-form";
import {User} from "../../Core/Interfaces/user";
import {UsersService} from "../../Core/Services/User/users.service";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Rol} from "../../Core/Interfaces/rol";
import {data} from "jquery";
import {error} from "@angular/compiler-cli/src/transformers/util";


@Component({
  selector: 'app-tab-usuarios',
  standalone: true,
  imports: [NavbarComponent, NgForOf, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './tab-usuarios.component.html',
  styleUrl: './tab-usuarios.component.css'
})
export class TabUsuariosComponent implements OnInit{
  userList: User[]=[];

  userModify:User={
    id:0,
    name:"",
    email:"",
    status:"",
    rol:""
  }
  rols: Rol[] = [];
  is_admin: boolean = false;

  constructor(private userService: UsersService) {
    this.IsAdmin()
    this.getUsers()
    this.getRols()
  }

  IsAdmin() {
    this.userService.isAdmin().subscribe(data => {
      console.log(data);
      this.is_admin = data.is_admin;
    });
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

  ngOnInit(): void {
      this.refreshUserList();
  }

  refreshUserList(): void {
    this.userService.getUsers().subscribe(
      data => {
        console.log(data.data)
        this.userList = data.data;
        setTimeout(() => {
          this.refreshUserList();
        }, 5000); // 1 minuto = 60000 milisegundos
      },
      error => {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    );
  }
}
