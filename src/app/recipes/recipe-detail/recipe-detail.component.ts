import { Component, OnInit } from '@angular/core';
import { ReciptesService } from '../../core/services/reciptes.service';
import Pecipe from '../../core/interfaces/recipe.interface';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})

export class RecipeDetailComponent implements OnInit {
  public recipte: Pecipe

  constructor(
    public reciptesService: ReciptesService
  ) {
  }
  
  ngOnInit() {
    this.recipte = this.reciptesService.getAllReciptes()[0];
  }
}
