import {inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Product} from "../../model/products/product.model";
import {Observable} from "rxjs";

export class ProductsApiService {
  private http: HttpClient = inject(HttpClient);

  private readonly baseUrl: string = "https://dummyjson.com/products/";

  get(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }
}
