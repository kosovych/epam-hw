import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import Recipe from '../../../core/interfaces/recipe.interface';
import { ReciptesService } from '../../../core/services/reciptes.service';

@Component({
  selector: 'app-recipes-preview',
  templateUrl: './recipes-preview.component.html',
  styleUrls: ['./recipes-preview.component.scss']
})
export class RecipesPreviewComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() onRemoveRecipe = new EventEmitter<any>();
  @Output() onChangeLikes = new EventEmitter<any>();

  constructor(
    private reciptesService: ReciptesService,
  ) { }

  ngOnInit() {
  }

  onRemoveRecipeHandler(id:string): void {
    this.onRemoveRecipe.emit(id)
  }

  onChangeLikesHeandler(flag) {
    if(!this.recipe.likes && flag === 'dec') {
      return
    }
    this.reciptesService.changeLikes(this.recipe.id, flag).subscribe( recipe => {
      const { likes } = recipe;
      this.recipe.likes = likes;
    })
  }
}
