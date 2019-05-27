import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { PurchasesModule } from '../purchases/purchases.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { RecipesPreviewComponent } from './recipes-list/recipes-preview/recipes-preview.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { FavoritesRecipeComponent } from './favorites-recipe/favorites-recipe.component';


@NgModule({
  declarations: [
    RecipesListComponent,
    RecipeDetailComponent,
    RecipesPreviewComponent,
    RecipeFormComponent,
    FavoritesRecipeComponent,
  ],
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    FormsModule,
    CoreModule,
    SharedModule,
    PurchasesModule,
  ],
  exports: [
    RecipesListComponent,
    RecipeFormComponent,
    FavoritesRecipeComponent,
    RecipeDetailComponent
  ]
})
export class RecipesModule { }

