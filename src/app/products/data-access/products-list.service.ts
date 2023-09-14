import {computed, inject, Injectable, Signal, WritableSignal} from "@angular/core";
import {ProductsApiService, ProductsResponse} from "../../shared/utils/services/api-services/products-api.service";
import {Product} from "../../shared/utils/model/products/product.model";
import {first, map, Observable, Subject} from "rxjs";
import {signal} from "@angular/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

//Modified way
/*export interface ProductsListState {
  products: WritableSignal<Product[]>;
  counter: WritableSignal<number>;
}*/

export interface ProductsListState {
  products: Product[];
  counter: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsListService {
  private apiService: ProductsApiService = inject(ProductsApiService);

  // State
  //Modified way
  /*private state: ProductsListState = {
    products: signal<Product[]>([]),
    counter: signal<number>(0),
  };*/

  private state: WritableSignal<ProductsListState> = signal<ProductsListState>({
    products: [],
    counter: 0,
  });

  // Selectors
  public readonly products: Signal<Product[]> = computed(() => this.state().products);
  public readonly counter: Signal<number> = computed(() => this.state().counter);

  //Modified way
  /*public readonly products: Signal<Product[]> = this.state.products;
  public readonly counter: Signal<number> = this.state.counter;*/

  // Sources
  productsLoaded$: Observable<ProductsResponse> = this.apiService.get();
  counterIncrement$: Subject<number> = new Subject<number>();

  constructor() {
    // Reducers
    this.productsLoaded$.pipe(first()).subscribe({
      next: (response: ProductsResponse) =>
        /*this.state.products.set(response.products)*/
      this.state.update(state => ({
        ...state,
        products: response.products
      }))
    })

    this.counterIncrement$
      .pipe(takeUntilDestroyed())
      .pipe(map(value => this.counter() + value))
      .subscribe({
      next: value =>
        /*this.state.counter.set(value)*/
        this.state.update(state => ({
          ...state,
          counter: value
        }))
    })
  }
}
