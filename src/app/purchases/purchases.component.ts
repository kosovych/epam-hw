import { Component, OnInit } from '@angular/core';
import { PurchasesService } from '../shared/services/purchases.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit {
  purchases = [];
  constructor(
    public purchasesService: PurchasesService
  ) { }

  ngOnInit() {
    this.purchases = this.purchasesService.getAll();
  }
}
