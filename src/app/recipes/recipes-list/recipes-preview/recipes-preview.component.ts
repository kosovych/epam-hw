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
  private likesSubject$;

  constructor(
    private reciptesService: ReciptesService,
  ) { }

  ngOnInit() {
    this.likesSubject$ = this.reciptesService.likesSubject();
    this.likesSubject$.subscribe( this.reciptesService.changeLikes(this.recipe));
  }

  onRemoveRecipeHandler(id:string): void {
    this.onRemoveRecipe.emit(id)
  }

  onChangeLikesHeandler(flag) {
    this.likesSubject$.next(flag);
  }
}
