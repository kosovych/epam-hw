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
    private purchasesService: PurchasesService,
  ) {}

  ngOnInit() {
    this.purchasesService.getAll().subscribe(purchases => this.purchases = purchases);
  }

  purchaseAdded(purchases) {
    this.purchases = purchases
  }

  rmPurchase(id) {
    this.purchasesService.remove(id).subscribe(purchases => {
      this.purchases = purchases;
    })
  }
}
