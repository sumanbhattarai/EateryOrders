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
