import { Component, OnInit } from '@angular/core';
import { ReciptesService } from '../../core/services/reciptes.service';
import Recipe from '../../core/interfaces/recipe.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  public recipte: Recipe;

  constructor(
    public reciptesService: ReciptesService,
    private route: ActivatedRoute,
  ) {
  }
  
  ngOnInit() {
    this.route.data.subscribe( data => this.recipte = data.recipe)
  }

  getRecipeId(): string {
    return this.route.snapshot.paramMap.get('id');
  }

}