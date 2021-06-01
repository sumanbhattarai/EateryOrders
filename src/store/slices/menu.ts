import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import {apiGetMenu} from 'api/method/menu';
import {IFoodItem} from 'api/utils';
import {
  getFoodItemArray,
  getIdMappedMenus,
  IMappedMenus,
  RequestStatus,
} from 'store/utils';
import {RootState} from 'store/';

const menuAdapter = createEntityAdapter<IFoodItem>({
  selectId: (item) => item._id,
  sortComparer: (a, b) =>
    a.name.toUpperCase().localeCompare(b.name.toUpperCase()),
});

const initialState = menuAdapter.getInitialState<{
  status: RequestStatus;
  menus: IMappedMenus;
}>({
  status: RequestStatus.Idle,
  menus: {},
});

const fetchMenu = createAsyncThunk(
  'menu/fetch',
  async () => {
    const response = await apiGetMenu();
    if (!response.success) {
      throw new Error(response.message);
    }
    const foodItems = getFoodItemArray(response.data!);
    const menus = getIdMappedMenus(response.data!);
    return {foodItems, menus} as {
      foodItems: Array<IFoodItem>;
      menus: IMappedMenus;
    };
  },
  {
    condition: (_, {getState}) => {
      const rootState = getState() as RootState;
      const {status} = rootState.menu;
      return status !== RequestStatus.Pending;
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
      (
        state,
        {
          payload: {foodItems, menus},
        }: PayloadAction<{
          foodItems: Array<IFoodItem>;
          menus: IMappedMenus;
        }>,
      ) => {
        menuAdapter.upsertMany(state, foodItems);
        state.menus = menus;
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
