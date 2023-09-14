import {Component, effect, EffectRef, inject, Injector, OnDestroy, untracked} from '@angular/core';
import {ProductsListService} from "../../data-access/products-list.service";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  providers: [ProductsListService]
})
export class ProductsListComponent {
  protected service: ProductsListService = inject(ProductsListService);

  constructor() {
    effect(() => {
      // #1
      // This will trigger effect if either of selectors change.
      //console.log(`Products size is ${this.service.products().length} and counter is set to ${this.service.counter()}`);

      // #2
      // This should trigger only when products come in from server.
      //console.log(`Products size is ${this.service.products().length} and counter is set to ${untracked(this.service.counter)}`);

      // #3
      // This should also trigger only when products come in, but not when a counter increments.
      console.log(`Products size is ${this.service.products().length}.`);
    })
  }

  protected incrementCounter(): void {
    this.service.counterIncrement$.next(1);
  }
}
