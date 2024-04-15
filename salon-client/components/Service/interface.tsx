export interface Service {
  _id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  category: string;
  staff: string;
  image: string;
  location: string;
  reviews: Reviews[];
}

export interface Reviews {
  _id: string;
  user: string;
  comment: string;
  rating: number;
}
