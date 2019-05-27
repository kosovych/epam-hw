import { Component, OnInit } from '@angular/core';
import Recipe from '../../core/interfaces/recipe.interface';
import { ActivatedRoute } from "@angular/router";
import { ReciptesService } from '../../core/services/reciptes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
  public recipes: Recipe[];

  constructor(
    private reciptesService: ReciptesService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.data.subscribe( data => this.recipes = data.recipes);
  }

  removeRecipe (id: string) {
    this.reciptesService.remove(id);
    this.recipes = this.reciptesService.getAllReciptes();
  }
}
