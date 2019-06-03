import { Component, OnInit } from '@angular/core';
import { ReciptesService } from '../../core/services/reciptes.service';
import Recipe from '../../core/interfaces/recipe.interface';
import { ActivatedRoute } from '@angular/router';
import { FavoriteService } from '../../shared/services/favorite.service';
import { PurchasesService } from '../../shared/services/purchases.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  public recipte: Recipe;
  public  isFavorites: boolean;

  constructor(
    public reciptesService: ReciptesService,
    private route: ActivatedRoute,
    private favoriteService: FavoriteService,
    private purchasesService :PurchasesService,
  ) {
  }
  
  ngOnInit() {
    this.route.data.subscribe( data => this.recipte = data.recipe);
    this.isFav();
  }

  getRecipeId(): string {
    return this.route.snapshot.paramMap.get('id');
  }

  addToFavorites() {
    this.favoriteService.add(this.recipte.id).subscribe( id => id );
    this.isFav();
  }

  deleteFromFavorites() {
    this.favoriteService.remove(this.recipte.id).subscribe( id => id );
    this.isFav();
  }

  isFav() {
    this.favoriteService.getAll().subscribe( recipes => {
      let recipe = recipes.find(recipe => recipe.id === this.recipte.id);
      if (recipe) {
        this.isFavorites = true;
      } else {
        this.isFavorites = false;
      }
    })
  }

  addToPurchases() {
    this.purchasesService.add(this.recipte.ingredients).subscribe( x => x );
  }
}