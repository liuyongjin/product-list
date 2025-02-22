import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../core/services/product.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less'],
})
export class ProductListComponent implements OnInit {
  products$!: Observable<Product[]>;
  selectedProduct$;
  displayedColumns: string[] = [
    'select',
    'image',
    'title',
    'category',
    'price',
  ];

  constructor(private productService: ProductService) {
    this.selectedProduct$ = this.productService.selectedProduct$;
  }

  ngOnInit(): void {
    this.products$ = this.productService.state$.pipe(
      map((state) => state.products),
      startWith([]) // Add a default value to ensure products$ is never null
    );
    this.productService.loadProducts().subscribe();
  }

  selectProduct(id: number): void {
    this.productService.selectProduct(id);
  }
}
