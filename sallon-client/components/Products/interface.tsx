export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

export interface EditedProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imgPath: string
  imgFile: File
}