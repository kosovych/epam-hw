import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-purchases-list',
  templateUrl: './purchases-list.component.html',
  styleUrls: ['./purchases-list.component.scss']
})
export class PurchasesListComponent implements OnInit {
  @Input() purchases;
  @Output() OnRmPurchase = new EventEmitter<any>();

  constructor(
  ) { }

  ngOnInit() {
  }

  rmPurchase(id) {
    this.OnRmPurchase.emit(id);
  }
}
