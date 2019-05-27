import { Component, OnInit } from '@angular/core';
import { ReciptesService } from '../../core/services/reciptes.service';
import Recipe from '../../core/interfaces/recipe.interface';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {
  public ingredients: string[] = [];
  public ingtidientsListShow = false;
  public categories: any;
  public recipe = {
    title: '',
    description: '',
    instructions: '',
    photoUrl: '',
    categoryId: '',
    
  };

  constructor(
    private reciptesService: ReciptesService
  ) {
    
  }
  
  ngOnInit() {
    this.categories = this.reciptesService.getAllCategories();
  }

  addIngtidient(input): void {
    if(!input.value) {
      return
    }
    this.ingredients = [...this.ingredients, input.value];
    input.value = '';
    input.focus();
  }

  toogleIngtidientsList(): void {
    this.ingtidientsListShow = !this.ingtidientsListShow;
  }

  submitHandled(event): void {
    event.preventDefault();
    let data: Recipe = {
      ...this.recipe,
      ingredients: this.ingredients,
      likes: 0,
    }
    this.reciptesService.add(data);
    event.target.reset();
    this.ingredients = [];
    this.ingtidientsListShow = false;
  }

  rmIngtidient(val: string) {
    let newIngtidients = this.ingredients.filter( ingredients => ingredients !== val );
    this.ingredients.filter( ingredients => ingredients !== val );
    this.ingredients = newIngtidients;
  }

}
