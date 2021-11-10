export type TopTabParamList = {
  InReview: undefined;
  Confirmed: undefined;
  Delivered: undefined;
};

export type BottomTabParamList = {
  Menu: undefined;
  Order: undefined;
  Account: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  AddFood: {
    id?: string;
    isEdit: boolean;
  };
  AddCategory: undefined;
  FoodDetail: {
    id: string;
    name: string;
  };
  Settings: undefined;
};
