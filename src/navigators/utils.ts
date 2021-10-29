export type TopTabParamList = {
  Recieved: undefined;
  Confirmed: undefined;
  Delivered: undefined;
};

export type BottomTabParamList = {
  Menu: undefined;
  Order: undefined;
  Account: undefined;
};

export type RootStackParamList = {
  Home: undefined;
  AddFood: undefined;
  FoodDetail: {
    id: string;
    name: string;
  };
};
