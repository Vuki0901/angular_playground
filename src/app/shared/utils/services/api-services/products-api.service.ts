import {inject, Injectable} from "@angular/core";
import {Product} from "../../model/products/product.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {
  private http: HttpClient = inject(HttpClient);

  private readonly baseUrl: string = "https://dummyjson.com/products/";

  get(): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(this.baseUrl);
  }
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
