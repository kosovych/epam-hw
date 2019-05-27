import { Component, OnInit } from '@angular/core';
import { ReciptesService } from '../../core/services/reciptes.service';
import { v4 as uuid } from 'uuid';
import { ActivatedRoute, Router, Event } from '@angular/router';
import Recipe from '../../core/interfaces/recipe.interface';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {
  public ingtidients: string[] = [];
  public ingtidientsListShow = false;
  private isEdit: boolean;
  public categories: any;
  private id: string;
  public recipe: Recipe = {
    title: '',
    description: '',
    instructions: '',
    photoUrl: '',
    categoryId: '',
    id: uuid(),
    likes: 0,
    ingredients: []
  };
  
  constructor(
    private reciptesService: ReciptesService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.router.events.subscribe( (event: Event) => {
      console.log(event);
    })
  }
  
  ngOnInit() {
    this.categories = this.reciptesService.getAllCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
      this.isEdit = true;
      this.recipe = {...this.reciptesService.getRecipeBuyId(this.id)};
    } else {
      this.isEdit = false;
    }
  }

  addIngtidient(input) {
    if(!input.value) {
      return
    }
    this.recipe.ingredients.push(input.value);
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

    if (this.isEdit) {
      this.reciptesService.editRecipe(this.recipe);
      this.router.navigate([`/recipes/${this.id}`]);
    } else {
      let _id = uuid();
      this.reciptesService.add({...data, id: _id});
      this.router.navigate([`/recipes/${_id}`]);
    }
  }

  rmIngtidient(val) {
    this.recipe.ingredients = this.recipe.ingredients.filter( ingtidients => ingtidients !== val );
  }
}
