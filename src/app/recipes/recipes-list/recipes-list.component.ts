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
    this.reciptesService.getAllReciptes().subscribe( recipes => {
      this.recipes = recipes;
    })
  }

  removeRecipe(id: string): void {
    this.reciptesService.remove(id).subscribe( () => {
      this.recipes = this.recipes.filter( recipe =>  recipe.id !== id );
    })
  }
}
