import {IFoodItem, IMenu} from 'api/utils';

/* eslint-disable no-shadow */
export enum RequestStatus {
  Idle = 'idle',
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected',
}

export enum OrderStatus {
  Recieved = 'Recieved',
  Confirmed = 'Confirmed',
  Delivered = 'Delivered',
  Rejected = 'Rejected',
}

export interface IMappedMenus {
  [category: string]: Array<string>;
}

export const getFoodItemArray = (data: Array<IMenu>) => {
  let foodItems: Array<IFoodItem> = [];
  for (const category in data) {
    for (const item in data[(category as any) as number].item) {
      foodItems = [...foodItems, data[(category as any) as number].item[item]];
    }
  }
  return foodItems;
};

export const getIdMappedMenus = (data: Array<IMenu>) => {
  let obj: IMappedMenus = {};
  data.map((el) => {
    const ids = el.item.map((item) => item._id);
    obj[el.category] = ids;
  });
  return obj;
};
