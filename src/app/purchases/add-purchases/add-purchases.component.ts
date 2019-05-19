import { Component, OnInit } from '@angular/core';
import { PurchasesService } from '../../shared/services/purchases.service'

@Component({
  selector: 'app-add-purchases',
  templateUrl: './add-purchases.component.html',
  styleUrls: ['./add-purchases.component.scss']
})
export class AddPurchasesComponent implements OnInit {

  constructor(
    private purchasesService: PurchasesService,
  ) { }

  ngOnInit() {
  }

  addToPurchases(event, input) {
    event.preventDefault();
    this.purchasesService.add(input.value);
  }
}
