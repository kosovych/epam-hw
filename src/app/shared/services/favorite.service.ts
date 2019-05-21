import { Injectable } from '@angular/core';
import Recipe from '../interfaces/recipe.interface';
import { ReciptesService } from './reciptes.service'

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {

  private favorites: Recipe[] = []

  constructor(
    private reciptesService: ReciptesService,
  ) {
    this.add(reciptesService.getAllReciptes()[0]);
    this.add(reciptesService.getAllReciptes()[1])
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