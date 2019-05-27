import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PurchasesService {
  private purchases = ['milk', 'bread'];
  constructor() {
  }

  getAll(): string[] {
    return this.purchases;
  }

  add(purchase: string): void {
    this.purchases.push(purchase);
  }

  remove(purchase: string): string[] {
    let result = this.purchases.filter( _purchase =>  _purchase !== purchase);
    return this.purchases = result;
  }
}