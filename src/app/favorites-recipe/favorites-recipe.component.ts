import { Component, OnInit } from '@angular/core';
import { FavoriteService } from './services/favorite.service';
import Recipe from '../core/interfaces/recipe.interface';

@Component({
  selector: 'app-favorites-recipe',
  templateUrl: './favorites-recipe.component.html',
  styleUrls: ['./favorites-recipe.component.scss']
})
export class FavoritesRecipeComponent implements OnInit {
  public favorites: Recipe[];

  constructor(
    private favoriteService: FavoriteService,
  ) { }

  ngOnInit() {
    this.favorites = this.favoriteService.getAll();
  }

}
