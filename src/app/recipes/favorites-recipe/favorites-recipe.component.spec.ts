import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesRecipeComponent } from './favorites-recipe.component';

describe('FavoritesRecipeComponent', () => {
  let component: FavoritesRecipeComponent;
  let fixture: ComponentFixture<FavoritesRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritesRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
