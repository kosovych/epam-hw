import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ReciptesService } from '../core/services/reciptes.service';
import Recipe from '../core/interfaces/recipe.interface';
@Injectable()

export class RecipesListResolve implements Resolve<any> {

  constructor(
    private recipe: ReciptesService
  ) {}

  resolve(): Recipe[] {
    return this.recipe.getAllReciptes()
  }
}