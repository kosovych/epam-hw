import { Component, OnInit } from '@angular/core';
import { ReciptesService } from '../../shared/services/reciptes.service';
import Recipe from '../../shared/interfaces/recipe.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  public recipte: Recipe;

  constructor(
    public reciptesService: ReciptesService,
    private route: ActivatedRoute,
  ) {
  }
  
  ngOnInit() {
    this.recipte = this.reciptesService.getRecipeBuyId(this.getRecipeId());
  }

  getRecipeId(): string {
    return this.route.snapshot.paramMap.get('id');
  }

}
