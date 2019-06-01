import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { FavoritesRecipeComponent } from './favorites-recipe/favorites-recipe.component';
import { RecipeFormComponent } from './recipes/recipe-form/recipe-form.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { RecipesListResolve } from './resolvers/recipes-list.resolver';
import { RecipesDetailResolve } from './resolvers/recipes-details.resolver';
import { PurchasesResolve } from './resolvers/purchases.resolver';

const routes: Routes = [
  { path: 'recipes', component: RecipesComponent, resolve: {recipes: RecipesListResolve} },
  { path: 'recipes/:id', component: RecipeDetailComponent, resolve: {recipe: RecipesDetailResolve}},
  { path: 'favorites', component: FavoritesRecipeComponent },
  { path: 'edit/:id', component: RecipeFormComponent, resolve: {recipe: RecipesDetailResolve}},
  { path: 'purchases', component: PurchasesComponent, resolve: {purchases: PurchasesResolve}},
  { path: 'add-recipe', component: RecipeFormComponent },
  { path: '', redirectTo: '/recipes',  pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    RecipesListResolve,
    RecipesDetailResolve,
    PurchasesResolve,
  ],
  exports: [RouterModule]
})


export class AppRoutingModule {
}
