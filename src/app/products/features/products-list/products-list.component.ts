import {Component, effect, EffectRef, inject, Injector, OnDestroy, untracked} from '@angular/core';
import {ProductsListService} from "../../data-access/products-list.service";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  providers: [ProductsListService]
})
export class ProductsListComponent implements OnDestroy {
  protected service: ProductsListService = inject(ProductsListService);
  private injector: Injector = inject(Injector);

  // Effect which can be manually destroyed, the other 2 ways of specifying an effect() handle destroying by themselves
  /*private effectInDeclaration: EffectRef = effect(() => {
    console.log(this.service.products());
  })*/

  constructor() {
    // Effect in constructor - most common
    /*effect(() => {
      console.log(this.service.products());
    })*/

    effect((onCleanup) => {

      // It is impossible to have untracked signal with SSSR architecture because our selectors get recomputed on change of any state property
      // Therefore each selector will trigger every effect they are mentioned in
      console.log(`Products size is ${this.service.products().length} and counter is set to ${this.service.counter()}`);

      //a callback that is invoked before the next run of the effect begins, or when the effect is destroyed
      onCleanup(() => {
        console.log("Executing cleanup")
      })
    })
  }

  /*private effectInMethod(): void {
    //Effect inside a class method required an injection context (access to the inject function)
    effect(() => {
      console.log(this.service.products());
    }, {injector: this.injector})
  }*/

  protected incrementCounter(): void {
    this.service.counterIncrement$.next(1);
  }

  ngOnDestroy() {
    //Only possible with effects assigned to a field because those return an EffectRef which has a .destroy() method
    //this.effectInDeclaration.destroy();
  }
}
