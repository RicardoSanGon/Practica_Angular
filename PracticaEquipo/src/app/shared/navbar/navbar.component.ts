import {Component, NgModule, NgZone, OnDestroy, OnInit} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../Core/Services/User/users.service';
import {NgForOf, NgIf} from '@angular/common';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import {environment} from "../../../environments/environments";
import {MessageUser} from "../../Core/Interfaces/message-user";
import {FormsModule} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {  inject } from '@angular/core';
import {error} from "@angular/compiler-cli/src/transformers/util";
import {SseService} from "../../Core/Services/See/see.service";
(window as any).Pusher = Pusher;


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NgIf, NgForOf, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit,OnDestroy {
  is_admin: boolean = false;
  is_user: boolean = false;
  is_guest: boolean = false;
  is_client: boolean = false;
  chat:MessageUser[] = [];
  message:String='';
  private toastSv=inject(ToastrService);
  private echo:any;
  constructor(private userService: UsersService,
              private router: Router,
              private zone: NgZone)
  {
  }
  ngOnInit(): void {
    this.ConnectWebSocket()
    this.is_Admin();
    this.is_User();
    this.is_Guest();
    this.is_Client();
    const token=localStorage.getItem('token') || '';
    let url = `http://127.0.0.1:8000/api/sse/${token}`;
    this.connectSSE(url);
  }

  is_Admin() {
    this.userService.isAdmin().subscribe(
      (res) => {
        this.is_admin = res.is_admin;
      },
      (error) => {
        if (error.status === 401) {
          this.router.navigate(['/']);
        }
      }
    );
  }

  is_User() {
    this.userService.isUser().subscribe(
      (res) => {
        this.is_user = res.is_user;
      },
      (error) => {
        if (error.status === 401) {
          this.router.navigate(['/']);
        }
      }
    );
  }

  is_Guest() {
    this.userService.isGuest().subscribe(
      (res) => {
        this.is_guest = res.is_guest;
      },
      (error) => {
        if (error.status === 401) {
          this.router.navigate(['/']);
        }
      }
    );
  }

  is_Client() {
    this.userService.isClient().subscribe(
      (res) => {
        this.is_client = res.is_client;
      },
      (error) => {
        if (error.status === 401) {
          this.router.navigate(['/']);
        }
      }
    );
  }
  ConnectWebSocket()
  {
    this.echo = new Echo({
      broadcaster: 'pusher',
      key: '123',
      wsHost: environment.wsHost,
      wsPort: environment.wsPort,
      disableStats: true,
      forceTLS: false,
      cluster: 'mt1',
    });
    this.echo.channel('chat').listen('ChatEvent', (e:any) => {
      this.chat.push({msg:e.msg, user:e.user});
    })
  }

  CerrarSesion() {
    this.userService.LogOut().subscribe(
      () => {
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  sendMessage(){
    const msg=this.message;
    this.message='';
    if(msg.trim()=='')
    {
      this.toastSv.error('No puedes enviar mensajes vacios');
      return;
    }
    this.userService.sendMessage(msg).subscribe(
      (res) => {

        this.toastSv.success(res.msg);
      },
      (error) => {
        this.toastSv.error(error.msg)
      }
    );
  }

  connectSSE(url:string)
  {
   var source = new EventSource(url);
    source.onmessage = (event) => {
      if(event.data!==''){
        let data=JSON.parse(event.data);
        console.log(data)
        console.log(data.detail_status)
        this.zone.run(() => {
          if(data.detail_status===1)
          {
            this.toastSv.success(data.message);
          }
          else
          {
            this.toastSv.error(data.message);
          }
        });
      }
    };
  }



  ngOnDestroy(): void {
    this.echo.disconnect();
  }
}
