import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {Dispatch} from 'react';

import {apiGetMenu} from 'api/method/menu';
import {IMenu} from 'api/utils';
import {RootState} from 'store/';

const menuAdapter = createEntityAdapter<IMenu>({
  selectId: (item) => item.category,
});

const initialState = menuAdapter.getInitialState({loading: false});

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleLoading: (state) => {
      state.loading = !state.loading;
    },
    fetchAll: (state, action: PayloadAction<IMenu[]>) => {
      menuAdapter.addMany(state, action.payload);
      state.loading = false;
    },
  },
});

export default menuSlice.reducer;
const {fetchAll, toggleLoading} = menuSlice.actions;

const fetchMenu = () => async (
  dispatch: Dispatch<any>,
  getStore: () => RootState,
) => {
  const {loading} = getStore().menu;
  if (loading) {
    return;
  }
  dispatch(toggleLoading());
  const response = await apiGetMenu();
  if (response.success) {
    dispatch(fetchAll(response.data!));
  } else {
    dispatch(toggleLoading());
  }
};

export {fetchMenu};
