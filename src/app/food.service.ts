import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class FoodService {
  constructor(
    private http: Http
  ) {}
  getSides(): Observable<any[]> {
    return this.http.get('http://localhost:3000/sides')
      .map(response => response.json());
  }
  getPizzas(): Observable<any[]> {
    return this.http.get('http://localhost:3000/pizzas')
      .map(response => response.json());
  }
  getDrinks(): Observable<any[]> {
    return this.http.get('http://localhost:3000/drinks')
      .map(response => response.json());
  }
}