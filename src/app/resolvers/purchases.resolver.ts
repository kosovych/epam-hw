import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { PurchasesService } from '../shared/services/purchases.service';
@Injectable()

export class PurchasesResolve implements Resolve<any> {

  constructor(
    private purchases: PurchasesService
  ) {}

  resolve() {
    return this.purchases.getAll();
  }
}