import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PurchasesComponent } from './purchases.component';
import { AddPurchasesComponent } from './add-purchases/add-purchases.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { PurchasesListComponent } from './purchases-list/purchases-list.component';

@NgModule({
  declarations: [PurchasesComponent, AddPurchasesComponent, PurchasesListComponent],
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    FormsModule,
  ],
  exports: [
    PurchasesComponent
  ]
})
export class PurchasesModule { }
