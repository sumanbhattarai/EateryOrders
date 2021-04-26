export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface ICategory {
  __v: number;
  _id: string;
  name: string;
}

export interface IFoodItem {
  __v: number;
  _id: string;
  category: string;
  description: string;
  name: string;
  photo: string;
  price: string;
}

export interface IMenu {
  category: string;
  item: IFoodItem[];
}
