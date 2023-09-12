import {inject, Injectable} from "@angular/core";
import {ProductsApiService} from "../../shared/utils/services/api-services/products-api.service";
import {Product} from "../../shared/utils/model/products/product.model";
import {Observable} from "rxjs";
import {signal, computed} from "@angular/core";

export interface ProductsListState {
  products: Product[];
}

@Injectable()
export class ProductsListService {
  private apiService: ProductsApiService = inject(ProductsApiService);

  // State
  private state = signal<ProductsListState>({
    products: []
  });

  // Selectors
  public readonly products = computed(() => this.state().products);

  // Sources
  productsLoaded$: Observable<Product[]> = this.apiService.get();
}
