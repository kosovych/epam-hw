import { Injectable } from '@angular/core';
import Recipe from '../interfaces/recipe.interface';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { API_URL } from '../../constans/constans';

@Injectable({
  providedIn: 'root',
})
export class ReciptesService {
  
  constructor(
    private http: HttpClient,
  ) {
  }

  getAllReciptes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${API_URL}/recipes`);
  }

  getRecipeBuyId(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${API_URL}/recipes/${id}`);
  }

  getAllCategories() {
    return this.http.get(`${API_URL}/categories`);
  }

  add(recipe: Recipe): Observable<string> {
    return this.http.post<string>(`${API_URL}/recipes`, recipe);
  }

  remove(id: string): Observable<null> {
    return this.http.delete<null>(`${API_URL}/recipes/${id}`);
  }

  editRecipe(recipe: Recipe): Observable<null> {
    return this.http.put<null>(`${API_URL}/recipes`, recipe)
  }

  changeLikes(id, flag): Observable<any> {
    return flag === 'inc' ?
    this.http.post<any>(`${API_URL}/recipes/likes`, {id})
    :
    this.http.post<any>(`${API_URL}/recipes/dislikes`, {id})
  }
}