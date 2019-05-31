import { Injectable } from '@angular/core';
import Recipe from '../interfaces/recipe.interface';
import recipes from '../../../data/recipes.js';

@Injectable({
  providedIn: 'root',
})
export class ReciptesService {
  private recipes = recipes;
  private category = new Set(recipes.map( recipe => recipe.categoryId));
  
  constructor() {
  }

  getAllReciptes(): Recipe[] {
    return this.recipes;
  }

  getRecipeBuyId( id: string ) :Recipe {
    return this.recipes.find( recipe => recipe.id === id)
  }

  getAllCategories() {
    return this.category;
  }

  add(recipe: Recipe): void {
    this.recipes.push(recipe);
  }

  remove(id: string): Recipe[] {
    return this.recipes = this.recipes.filter( recipes => recipes.id !== id);
  }

  editRecipe(_recipe: Recipe) :string {
    let recipeIndex = this.recipes.indexOf(this.getRecipeBuyId(_recipe.id));
    this.recipes[recipeIndex] = _recipe;
    return _recipe.id;
  }

  changeLikes(id, flag) {
    if(flag !== 'inc' || flag !== 'dec') {
      return
    }
    let recipe =  this.getRecipeBuyId(id);
    const operator = flag === 'inc' ? 1 : -1;
    recipe.likes = recipe.likes + operator;
  }
}