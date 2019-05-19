import { Component, OnInit } from '@angular/core';
import { ReciptesService } from '../../shared/services/reciptes.service';
import Pecipe from '../../shared/interfaces/recipe.interface';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  public recipte: Pecipe

  constructor(
    public reciptesService: ReciptesService
  ) {
    this.recipte = reciptesService.getAllReciptes()[0];
  }

  ngOnInit() {
  }

}
