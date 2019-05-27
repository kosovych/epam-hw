import { Component, OnInit, Input } from '@angular/core';
import { PurchasesService } from '../../core/services/purchases.service';


@Component({
  selector: 'app-purchases-list',
  templateUrl: './purchases-list.component.html',
  styleUrls: ['./purchases-list.component.scss']
})
export class PurchasesListComponent implements OnInit {
  public purchases;

  constructor(
    private purchasesService: PurchasesService,

  ) { }

  ngOnInit() {
    this.purchases = this.purchasesService.getAll()
  }



  rmPurchase(purchase: string): void {
    this.purchases = this.purchasesService.remove(purchase);
  }

}
