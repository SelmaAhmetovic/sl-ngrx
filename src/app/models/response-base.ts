import { Metadata } from "./metadata";
import { Product } from "./product";


export interface ResponseBase<T> {
  data?: (T)[] | null;
  status: number;
  message: string;
  metadata?: Metadata
}

export interface ListOfProducts extends ResponseBase<Product> {}
