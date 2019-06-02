import { Injectable } from '@angular/core';
import Recipe from '../../core/interfaces/recipe.interface';
import { ReciptesService } from '../../core/services/reciptes.service';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../constans/constans';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {

  private favorites: Recipe[] = [];

  constructor(
    private reciptesService: ReciptesService,
    private http: HttpClient,
  ) {
  }

  getAll(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${API_URL}/favorites`);
  }

  add(id: string): Observable<string> {
    const data = {id: id};
    return this.http.post<string>(`${API_URL}/favorites`, data);
  }

  remove(id: string): Observable<any> {
    return this.http.delete<string>(`${API_URL}/favorites/${id}`);
  }
}