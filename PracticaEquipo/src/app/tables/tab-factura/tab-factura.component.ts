import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { Bills } from '../../Core/Interfaces/bills';
import { BillsService } from '../../Core/Services/Bills/bills.service';

@Component({
  selector: 'app-tab-factura',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './tab-factura.component.html',
  styleUrl: './tab-factura.component.css',
})
export class TabFacturaComponent {
  billsList: Bills[] = [];

  constructor(private billsService: BillsService) {
    this.getBills();
  }

  getBills() {
    this.billsService.getBills().subscribe({
      next: (result) => {
        this.billsList = result.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
    }
  }

