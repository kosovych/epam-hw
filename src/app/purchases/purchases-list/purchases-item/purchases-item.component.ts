import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-purchases-item',
  templateUrl: './purchases-item.component.html',
  styleUrls: ['./purchases-item.component.scss']
})
export class PurchasesItemComponent implements OnInit {
  @Input() purchase;
  @Output() onRmPurchase = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  onRmPurchaseHandler(): void {
    this.onRmPurchase.emit(this.purchase);
  }
}
