import { Component, OnInit, Input } from '@angular/core';
import { PurchasesService } from '../../shared/services/purchases.service';


@Component({
  selector: 'app-purchases-list',
  templateUrl: './purchases-list.component.html',
  styleUrls: ['./purchases-list.component.scss']
})
export class PurchasesListComponent implements OnInit {
  @Input() purchases: string[];

  constructor(
    private purchasesService: PurchasesService,

  ) { }

  ngOnInit() {
  }

  rmPurchase(purchase: string) {
    this.purchases = this.purchasesService.remove(purchase);
  }

}
