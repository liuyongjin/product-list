import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

interface ProductState {
  products: Product[];
  selectedProductId: number | null;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';

  private state = new BehaviorSubject<ProductState>({
    products: [],
    selectedProductId: null,
  });

  state$ = this.state.asObservable();

  constructor(private http: HttpClient) {
    // Load state from localStorage
    const savedState = localStorage.getItem('product_state');
    if (savedState) {
      this.state.next(JSON.parse(savedState));
    }

    // Persist state changes
    this.state$.subscribe((state) => {
      localStorage.setItem('product_state', JSON.stringify(state));
    });
  }

  // Load initial product list
  loadProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      tap((products) => {
        this.state.next({
          ...this.state.value,
          products,
        });
      })
    );
  }

  // Select product for detail view
  selectProduct(id: number): void {
    if (this.state.value.selectedProductId === id) {
      this.state.next({
        ...this.state.value,
        selectedProductId: null,
      });
    } else {
      this.state.next({
        ...this.state.value,
        selectedProductId: id,
      });
    }
  }

  // Get selected product details
  get selectedProduct$(): Observable<Product | undefined> {
    return this.state$.pipe(
      map((state) =>
        state.products.find((p) => p.id === state.selectedProductId)
      )
    );
  }
}
