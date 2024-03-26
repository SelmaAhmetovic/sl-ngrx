import { Component } from '@angular/core';
import { ProductsService } from './products.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { ListOfProducts, ResponseBase } from '../models/response-base';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  products$ = this.productsService.getProducts()
  .pipe(
    map((r: ListOfProducts) => r.data)
  );

constructor(private productsService: ProductsService,
  private router: Router) {}

  isArray(obj: any): boolean {
    console.log('isArray', obj,  Array.isArray(obj))
    return Array.isArray(obj);
  }

navigateToProduct(slug: string) {
  this.router.navigate(['/products', slug]);
  
  /*let body = {
    title: 'Men Boxer Sneakers For Men  (Black)',
    price: 799,
    description: 'Lorem Ipsum is simply dummy text of the printing',
    category: "612e42d755b07f20de9ec6a5"

}
  this.productsService.createProduct(body).subscribe((res: any) =>
  {
    console.log(res);
  })*/
}

checkKeyboardPress(event: KeyboardEvent, slug: string) {
  if (event.key === "Enter") {
    this.navigateToProduct(slug)
    return;
  }
  if (event.key === "Tab") {
    return;
  }
}

}
