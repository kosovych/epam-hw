import { Injectable } from '@angular/core';
import Recipe from '../interfaces/recipe.interface';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {

  private favorites: Recipe[] = []

  constructor() {
  }

  getAll() {
    return this.favorites;
  }

  add(recipe: Recipe) {
    return this.favorites = [...this.favorites, recipe];
  }

  remove(recipe: Recipe) {
    let result = this.favorites.filter( _recipe =>  _recipe.title !== recipe.title);
    return this.favorites = result;
  }
}