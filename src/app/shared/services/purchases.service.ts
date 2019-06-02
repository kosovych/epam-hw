import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../constans/constans';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PurchasesService {
  constructor(
    private http: HttpClient,
  ) {
  }

  getAll(): Observable<[]> {
    return this.http.get<[]>(`${API_URL}/purchases`);
  }

  add(purchases): Observable<any> {
    const arrOfReq = purchases.map( purchases => this.http.post(`${API_URL}/purchases`, {purchases}) );
    return forkJoin(arrOfReq);
  }

  remove(id: string): Observable<[]> {
    return this.http.delete<[]>(`${API_URL}/purchases/${id}`);
  }
}