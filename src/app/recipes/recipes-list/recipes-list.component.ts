import { Component, OnInit } from '@angular/core';
import { ReciptesService } from '../../shared/services/reciptes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
  public recipes: [];

  constructor(
    private reciptesService: ReciptesService
  ) { }

  ngOnInit() {
    this.recipes = this.reciptesService.getAllReciptes();
  }
}
