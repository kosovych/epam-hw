import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteService } from './services/favorite.service';
import { PurchasesService } from './services/purchases.service';
import { ReciptesService } from './services/reciptes.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
})

 export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        FavoriteService,
        PurchasesService,
        ReciptesService,
      ]
    };
  }
}
