import { Component, OnInit } from '@angular/core';
import { PurchasesService } from '../services/purchases.service'

@Component({
  selector: 'app-add-purchases',
  templateUrl: './add-purchases.component.html',
  styleUrls: ['./add-purchases.component.scss']
})
export class AddPurchasesComponent implements OnInit {
  public purchase = '';

  constructor(
    private purchasesService: PurchasesService,
  ) { }

  ngOnInit() {
  }

  addToPurchases(event): void {
    event.preventDefault();
    this.purchasesService.add(this.purchase);
    this.purchase = '';
  }
}
