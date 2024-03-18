import { Component } from '@angular/core';
import {Log} from "../../Core/Interfaces/log";
import {LogsService} from "../../Core/Services/Log/logs.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-tab-log',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './tab-log.component.html',
  styleUrl: './tab-log.component.css'
})
export class TabLogComponent {
  datalog:Log[] = [];

  constructor(private logService:LogsService) {
    this.getLogs()
  }


  getLogs(){
    this.logService.getLogs().subscribe((data:Log[])=>{
      this.datalog = data;
    });
  }


}
