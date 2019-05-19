import { Component, OnInit, Input } from '@angular/core';
import Recipe from '../../../shared/interfaces/recipe.interface'

@Component({
  selector: 'app-recipes-preview',
  templateUrl: './recipes-preview.component.html',
  styleUrls: ['./recipes-preview.component.scss']
})
export class RecipesPreviewComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor() { }

  ngOnInit() {
  }

}
