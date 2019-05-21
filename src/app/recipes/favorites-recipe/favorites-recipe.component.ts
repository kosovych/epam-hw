import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../shared/services/favorite.service';
import Recipe from '../../shared/interfaces/recipe.interface';
import { ReciptesService } from '../../shared/services/reciptes.service';

@Component({
  selector: 'app-favorites-recipe',
  templateUrl: './favorites-recipe.component.html',
  styleUrls: ['./favorites-recipe.component.scss']
})
export class FavoritesRecipeComponent implements OnInit {
  public favorites: Recipe[];

  constructor(
    private favoriteService: FavoriteService,
    private reciptesService :ReciptesService,
  ) { }

  ngOnInit() {
    this.favorites = this.favoriteService.getAll();
  }

}
