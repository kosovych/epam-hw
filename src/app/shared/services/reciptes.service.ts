import { Injectable } from '@angular/core';
import recipes from '../../../data/recipes.js';
import Recipe from '../interfaces/recipe.interface';

@Injectable({
  providedIn: 'root',
})
export class ReciptesService {
  private recipes = recipes;
  private category = new Set(recipes.map( recipe => recipe.categoryId));
  
  constructor() {
  }

  getAllReciptes() :Recipe[] {
    return this.recipes;
  }

  getRecipeBuyId( id: string ) :Recipe {
    return this.recipes.find( recipe => recipe.id === id)
  }

  getAllCategories() {
    return this.category;
  }

  add(recipe) :void {
    this.recipes.push(recipe);
  }

  remove(title) :Recipe[] {
    return this.recipes = this.recipes.filter( recipes => recipes.title !== title);
  }

  editRecipe(_recipe: Recipe) :string {
    let recipeIndex = this.recipes.indexOf(this.getRecipeBuyId(_recipe.id));
    this.recipes[recipeIndex] = _recipe;
    console.log(this.recipes[recipeIndex]);
    return _recipe.id;
  }
}