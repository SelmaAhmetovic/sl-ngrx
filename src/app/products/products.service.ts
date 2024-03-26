import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListOfProducts } from '../models/response-base';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 
  url = environment.apiUrl + `/products`;

  constructor(private readonly http: HttpClient) { }

  getProducts(): Observable<ListOfProducts> {
    return this.http.get<ListOfProducts>(this.url);
  }

  getProductBySlug(slug: string): Observable<Product> {
    slug = 'special-cotton-shirt-for-men'
    const uri =  this.url + `/${slug}/`;
    return this.http.get<Product>(uri);
    }

  createProduct(body: any): Observable<any> {
    return this.http.post('https://api.storerestapi.com/products', body);
  }

}
