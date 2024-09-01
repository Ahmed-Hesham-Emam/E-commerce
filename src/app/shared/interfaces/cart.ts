// add to cart
export interface addToCart {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: Data;
}

export interface Data {
  _id: string;
  cartOwner: string;
  products: Product[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface Product {
  count: number;
  _id: string;
  product: string;
  price: number;
}

// Cart
export interface cart {
  message(message: any, status: string, arg2: { timeOut: number; progressBar: true; closeButton: true; }): unknown;
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: cartData;
}

export interface cartData {
  _id: string;
  cartOwner: string;
  products: cartTotal[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface cartTotal {
  count: number;
  _id: string;
  product: cartProduct;
  price: number;
}

export interface cartProduct {
  subcategory: Subcategory[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: Category;
  ratingsAverage: number;
  id: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}


//round 2

