import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsShellRoutingModule } from './products-shell-routing.module';
import {ProductsListComponent} from "../products-list/products-list.component";


@NgModule({
  declarations: [
    ProductsListComponent
  ],
  imports: [
    CommonModule,
    ProductsShellRoutingModule
  ]
})
export class ProductsShellModule { }
