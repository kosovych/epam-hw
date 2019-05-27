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

  getAllCategories() {
    return this.category;
  }

  add(recipe: Recipe): void {
    this.recipes.push(recipe);
  }

  remove(title: string): Recipe[] {
    return this.recipes = this.recipes.filter( recipes => recipes.title !== title);
  }

}