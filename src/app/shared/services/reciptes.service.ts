import { Injectable } from '@angular/core';
import recipes from '../../../data/recipes.js';

@Injectable({
  providedIn: 'root',
})
export class ReciptesService {
  private recipes = recipes;
  private category = new Set(recipes.map( recipe => recipe.categoryId));
  
  constructor() {
  }

  getAllReciptes() {
    return this.recipes;
  }

  getAllCategories() {
    return this.category;
  }

  add(recipe) {
    this.recipes.push(recipe);
  }

}