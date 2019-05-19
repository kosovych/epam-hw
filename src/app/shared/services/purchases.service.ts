import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PurchasesService {
  private purchases = ['milk', 'bread'];
  constructor() {
  }

  getAll() {
    return this.purchases;
  }

  add(purchase) {
    return this.purchases = [...this.purchases, purchase];
  }

  remove(purchase) {
    let result = this.purchases.filter( _purchase =>  _purchase !== purchase);
    return this.purchases = result;
  }
}