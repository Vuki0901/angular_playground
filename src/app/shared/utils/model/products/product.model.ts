export class Product {
  id?: number;
  title?: string;
  description?: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];

  constructor(model?: Partial<Product>) {
    Object.assign(this, model);
  }
}
