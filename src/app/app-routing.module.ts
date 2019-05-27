import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component'
import { RecipeComponent } from './recipes/recipe/recipe.component';
import { FavoritesRecipeComponent } from './recipes/favorites-recipe/favorites-recipe.component';
import { AddRecipeComponent } from './recipes/add-recipe/add-recipe.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { RecipesListResolve } from './resolvers/recipes-list.resolver';

const routes: Routes = [
  { path: 'recipes', component: RecipesComponent, resolve: {recipes: RecipesListResolve} },
  { path: 'recipes/:id', component: RecipeComponent, },
  { path: 'favorites', component: FavoritesRecipeComponent },
  { path: 'edit/:id', component: AddRecipeComponent },
  { path: 'purchases', component: PurchasesComponent },
  { path: 'add-recipe', component: AddRecipeComponent },
  { path: '', redirectTo: '/recipes',  pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    RecipesListResolve
  ],
  exports: [RouterModule]
})


export class AppRoutingModule {
}
