import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import Recipe from '../../../core/interfaces/recipe.interface';

@Component({
  selector: 'app-recipes-preview',
  templateUrl: './recipes-preview.component.html',
  styleUrls: ['./recipes-preview.component.scss']
})
export class RecipesPreviewComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() onRemoveRecipe = new EventEmitter<any>();
  @Output() onChangeLikes = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onRemoveRecipeHandler(id:string): void {
    this.onRemoveRecipe.emit(id)
  }

  onChangeLikesHeandler(flag) {
    this.onChangeLikes.emit(flag);
  }
}
