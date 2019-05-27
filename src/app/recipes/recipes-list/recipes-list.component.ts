import { Component, OnInit } from '@angular/core';
import { ReciptesService } from '../../shared/services/reciptes.service';
import Recipe from '../../shared/interfaces/recipe.interface';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
  public recipes: Recipe[];

  constructor(
    private reciptesService: ReciptesService
  ) { }

  ngOnInit() {
    this.recipes = this.reciptesService.getAllReciptes();
  }

  removeRecipe (id: string) {
    this.reciptesService.remove(id);
    this.recipes = this.reciptesService.getAllReciptes();
  }
}
