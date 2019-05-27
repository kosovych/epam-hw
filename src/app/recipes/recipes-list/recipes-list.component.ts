import { Component, OnInit } from '@angular/core';
import { ReciptesService } from '../../core/services/reciptes.service';
import Recipe from '../../core/interfaces/recipe.interface';

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

  removePecipe (id: string) {
    this.reciptesService.remove(id);
    this.recipes = this.reciptesService.getAllReciptes();
  }
}
