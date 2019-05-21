import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DecodeCategory } from "../shared/pipes/decode-category.pipe"

import { RecipesPreviewComponent } from './recipes-list/recipes-preview/recipes-preview.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { FavoritesRecipeComponent } from './favorites-recipe/favorites-recipe.component';
import { BoxShadowDirective } from '../shared/directives/box-shadow.directive';


@NgModule({
  declarations: [
    RecipesComponent,
    RecipesListComponent,
    RecipeComponent,
    RecipesPreviewComponent,
    DecodeCategory,
    AddRecipeComponent,
    FavoritesRecipeComponent,
    BoxShadowDirective
  ],
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    FormsModule
   
  ],
  exports: [
    RecipesListComponent,
    RecipeComponent,
    AddRecipeComponent,
    FavoritesRecipeComponent,
  ]
})
export class RecipesModule { }

