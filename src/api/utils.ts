export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  messgae?: string;
}

export interface ICategory {
  __v: number;
  _id: string;
  name: string;
}
