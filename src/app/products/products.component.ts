import { Component } from '@angular/core';
import { ProductsService } from './products.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { ListOfProducts } from '../models/response-base';

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


navigateToProduct(id: string) {
  //this.router.navigate(['/products', id]);
}

checkKeyboardPress(event: KeyboardEvent, id: string) {
  if (event.key === "Enter") {
    this.navigateToProduct(id)
    return;
  }
  if (event.key === "Tab") {
    return;
  }
}

}
