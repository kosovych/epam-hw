import { Component, OnInit } from '@angular/core';
import { ReciptesService } from '../../shared/services/reciptes.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {
  public ingtidients: string[] = [];
  public ingtidientsListShow = false;
  public categories: any;
  recipe = {
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

  addIngtidient(input) {
    if(!input.value) {
      return
    }
    this.ingtidients = [...this.ingtidients, input.value];
    input.value = '';
    input.focus();
  }

  toogleIngtidientsList() {
    this.ingtidientsListShow = !this.ingtidientsListShow;
  }

  submitHandled(event) {
    event.preventDefault();
    let data = {
      ...this.recipe,
      ingtidients: this.ingtidients,
      likes: 0
    }
    this.reciptesService.add(data);
    event.target.reset();
    this.ingtidients = [];
    this.ingtidientsListShow = false;

    
  }

  rmIngtidient(val) {
    let newIngtidients = this.ingtidients.filter( ingtidients => ingtidients !== val );
    this.ingtidients.filter( ingtidients => ingtidients !== val );
    this.ingtidients = newIngtidients;
  }

}
