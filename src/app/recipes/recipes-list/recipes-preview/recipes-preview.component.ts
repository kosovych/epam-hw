import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import Recipe from '../../../shared/interfaces/recipe.interface'

@Component({
  selector: 'app-recipes-preview',
  templateUrl: './recipes-preview.component.html',
  styleUrls: ['./recipes-preview.component.scss']
})
export class RecipesPreviewComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() onRemovePecipe = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onRemovePecipeHandler(id:string) {
    this.onRemovePecipe.emit(id)
  }
}
