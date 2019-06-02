import { Component, OnInit } from '@angular/core';
import { ReciptesService } from '../../core/services/reciptes.service';
import { ActivatedRoute, Router, Event } from '@angular/router';
import Recipe from '../../core/interfaces/recipe.interface';
import { FormBuilder, FormControl, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup;
  title: FormControl;
  description: FormControl;
  photoUrl: FormControl;
  instructions: FormControl;
  categoryId: FormControl;
  ingtidientsForm: FormGroup;
  _ingridients: FormControl;


  public ingtidients: string[] = [];
  public ingtidientsListShow = false;
  private isEdit: boolean;
  public categories: any;
  private id: string;

  public recipe: Recipe = {
    id: '',
    title: '',
    description: '',
    photoUrl: '',
    ingredients: [],
    instructions: '',
    categoryId: '',
    likes: 0,
  };
  
  constructor(
    private reciptesService: ReciptesService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
  }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.reciptesService.getAllCategories().subscribe( categories => {
      this.categories = categories;
    });

    if (this.id) {
      this.isEdit = true;
      this.route.data.subscribe( data => this.recipe = {...data.recipe});
    } else {
      this.isEdit = false;
    }

    this.title =  new FormControl(this.recipe.title, [Validators.minLength(15), Validators.required]),
    this.description =  new FormControl(this.recipe.description, [Validators.required]),
    this.photoUrl =  new FormControl(this.recipe.photoUrl, [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
    this.instructions =  new FormControl(this.recipe.instructions, [Validators.required]),
    this.categoryId =  new FormControl(this.recipe.categoryId, [Validators.required]),
    this._ingridients = new FormControl('', [Validators.minLength(3), Validators.required]);

    this.recipeForm = this.fb.group({
      'title': this.title,
      'description': this.description,
      'photoUrl': this.photoUrl,
      'instructions': this.instructions,
      'categoryId': this.categoryId,
    });

    this.ingtidientsForm = this.fb.group({
      'ingtidients': this._ingridients,
    });
  }

  addIngtidient(): void {
    if(!this._ingridients.value || this.ingtidientsForm.invalid) {
      return
    }
    this.recipe.ingredients.push(this._ingridients.value);
    this._ingridients.reset();
    console.log(this._ingridients);
  }

  toogleIngtidientsList(): void {
    this.ingtidientsListShow = !this.ingtidientsListShow;
  }

  submitHandled(): void {
    if (this.recipeForm.invalid) {
      return
    }
    const data = {...this.recipeForm.value, ingredients: this.recipe.ingredients, likes: this.recipe.likes};

    if (this.isEdit) {
      data.id = this.id;
      this.reciptesService.editRecipe(data).subscribe( res => this.router.navigate([`/recipes/${this.id}`]));
    } else {
      this.reciptesService.add(data).subscribe( id => this.router.navigate([`/recipes/${id}`]) )
    }
  }

  rmIngtidient(val): void {
    this.recipe.ingredients = this.recipe.ingredients.filter( ingtidients => ingtidients !== val );
  }
}
