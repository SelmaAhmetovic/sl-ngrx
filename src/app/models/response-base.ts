import { LoginData } from "./login-data";
import { Metadata } from "./metadata";
import { Product } from "./product";
import { User } from "./user";


export interface ResponseBase<T> {
  data?: (T)[] | null;
  status: number;
  message: string;
  metadata?: Metadata
}

export interface ListOfProducts extends ResponseBase<Product> {}

export interface ListOfUsers extends ResponseBase<User> {}

export interface LoginDataResponse extends ResponseBase<LoginData> {}
