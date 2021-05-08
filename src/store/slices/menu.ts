import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {Dispatch} from 'react';
import uuid from 'react-native-uuid';

import {apiGetMenu} from 'api/method/menu';
import {IMenu} from 'api/utils';
import {RootState} from 'store/';

interface IMenuWithId extends IMenu {
  id: string;
}

const menuAdapter = createEntityAdapter<IMenuWithId>({
  selectId: (item) => item.id,
});

const initialState = menuAdapter.getInitialState({loading: false});

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleLoading: (state) => {
      state.loading = !state.loading;
    },
    fetchAll: (state, action: PayloadAction<IMenuWithId[]>) => {
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
    const dataWithId = response.data?.map((el) => {
      return {id: uuid.v4().toString(), ...el};
    });
    dispatch(fetchAll(dataWithId!));
  } else {
    dispatch(toggleLoading());
  }
};

export {fetchMenu};
