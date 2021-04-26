import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {Dispatch} from 'react';

import {apiGetCategory} from 'api/method/category';
import {ICategory} from 'api/utils';
import {showError} from 'utils/Toast';

const categoryAdaptor = createEntityAdapter({
  selectId: (item: ICategory) => item._id,
});

const initialState = categoryAdaptor.getInitialState({loading: false});

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    toggleLoading: (state) => {
      state.loading = !state.loading;
    },
    fetchAll: (state, action: PayloadAction<ICategory[]>) => {
      categoryAdaptor.addMany(state, action.payload);
      state.loading = false;
    },
  },
});

export default categorySlice.reducer;
const {fetchAll, toggleLoading} = categorySlice.actions;

const fetchCategory = () => async (
  dispatch: Dispatch<any>,
  getState: () => any,
) => {
  const loading = getState().category.loading;
  if (loading) {
    return;
  }
  dispatch(toggleLoading());
  const response = await apiGetCategory();
  if (response.success) {
    dispatch(fetchAll(response.data!));
  } else {
    showError({message: response.message!});
    dispatch(toggleLoading());
  }
};
export {fetchCategory};
