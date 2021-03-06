import {OrderStatus} from 'store/utils';

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
  rating: string;
}

export interface IMenu {
  category: string;
  item: IFoodItem[];
}

export interface IOrder {
  __v: number;
  _id: string;
  customerName: string;
  customerAddress: string;
  deliveryMethod: string;
  customerEmail: string;
  customerPhone: string;
  cartTotalItems: Array<{
    _id: string;
    quantity: number;
  }>;
  status: OrderStatus;
  date: string;
  totalCost: string;
}
