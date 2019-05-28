import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ReciptesService } from '../core/services/reciptes.service';
import Recipe from '../core/interfaces/recipe.interface';
import { ActivatedRouteSnapshot } from '@angular/router';
@Injectable()

export class RecipesDetailResolve implements Resolve<any> {

  constructor(
    private recipe: ReciptesService,
    
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.recipe.getRecipeBuyId(route.paramMap.get('id'));
  }
}