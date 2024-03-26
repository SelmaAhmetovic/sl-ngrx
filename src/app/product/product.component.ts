import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ProductsService } from '../products/products.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  slug: string = '';

  product$ = this.route.params.pipe(
    map((x) => x['slug']),
    switchMap((slug) => this.productsService.getProductBySlug(slug)),
    tap((product: Product) => {
      console.log(product)
      //this.titleService.setTitle('product ' + product?.title);
      ///this.announcer.announce('product ' + product?.title);
    })
  );

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

}
