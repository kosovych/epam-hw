import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ReciptesService } from '../shared/services/reciptes.service';
import Recipe from "../shared/interfaces/recipe.interface";
@Injectable()

export class RecipesListResolve implements Resolve<any> {

  constructor(
    private recipe: ReciptesService
  ) {}

  resolve() : any {
    return this.recipe.getAllReciptes()
  }
}