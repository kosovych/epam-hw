import { Component, OnInit, Input } from '@angular/core';
import { PurchasesService } from '../services/purchases.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-purchases-list',
  templateUrl: './purchases-list.component.html',
  styleUrls: ['./purchases-list.component.scss']
})
export class PurchasesListComponent implements OnInit {
  public purchases;

  constructor(
    private purchasesService: PurchasesService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.route.data.subscribe( data => this.purchases = data.purchases);
  }



  rmPurchase(purchase: string): void {
    this.purchases = this.purchasesService.remove(purchase);
  }

}
