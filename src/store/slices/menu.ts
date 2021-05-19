import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import {apiGetMenu} from 'api/method/menu';
import {IMenu} from 'api/utils';
import {RequestStatus} from 'store/utils';
import {RootState} from 'store/';

const menuAdapter = createEntityAdapter<IMenu>({
  selectId: (item) => item.category,
});

const initialState = menuAdapter.getInitialState<{status: RequestStatus}>({
  status: RequestStatus.Idle,
});

const fetchMenu = createAsyncThunk(
  'menu/fetch',
  async () => {
    const response = await apiGetMenu();
    if (!response.success) {
      throw Error();
    }
    return response.data as Array<IMenu>;
  },
  {
    condition: (_, {getState}) => {
      const rootState = getState() as RootState;
      const {status} = rootState.menu;
      if (status === RequestStatus.Pending) {
        return false;
      }
      return true;
    },
  },
);

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMenu.pending, (state) => {
      state.status = RequestStatus.Pending;
    });
    builder.addCase(
      fetchMenu.fulfilled,
      (state, {payload: data}: PayloadAction<Array<IMenu>>) => {
        menuAdapter.upsertMany(state, data);
        state.status = RequestStatus.Fulfilled;
      },
    );
    builder.addCase(fetchMenu.rejected, (state) => {
      state.status = RequestStatus.Rejected;
    });
  },
});

export default menuSlice.reducer;
export {fetchMenu};
