import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListOfProducts } from '../models/response-base';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 
  url = environment.apiUrl + `/products`;

  constructor(private readonly http: HttpClient) { }

  // TODO: create models
  getProducts(): Observable<ListOfProducts> {
    return this.http.get<ListOfProducts>(this.url);
  }

}
