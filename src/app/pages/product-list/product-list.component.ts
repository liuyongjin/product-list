import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less'],
})
export class ProductListComponent implements OnInit {
  products$;
  selectedProduct$;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.state$.pipe(
      map((state) => state.products)
    );
    this.selectedProduct$ = this.productService.selectedProduct$;
  }

  ngOnInit(): void {
    this.productService.loadProducts().subscribe();
  }
  selectProduct(id: number): void {
    this.productService.selectProduct(id);
  }
}
