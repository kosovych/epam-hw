import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PurchasesService } from '../../shared/services/purchases.service'

@Component({
  selector: 'app-add-purchases',
  templateUrl: './add-purchases.component.html',
  styleUrls: ['./add-purchases.component.scss']
})
export class AddPurchasesComponent implements OnInit {
  @Output() onPurchaseAdded = new EventEmitter<[]>()
  public purchase = '';

  constructor(
    private purchasesService: PurchasesService,
  ) { }

  ngOnInit() {
  }

  addToPurchases(): void {
    this.purchasesService.add([this.purchase]).subscribe( puechases => {
      this.onPurchaseAdded.emit(puechases[0]);
      this.purchase = '';
    });
  }
}
