import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesRecipeComponent } from './favorites-recipe.component'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FavoritesRecipeComponent
  ],
  exports: [
    FavoritesRecipeComponent
  ]
})
export class FavoritesRecipeModule { }
