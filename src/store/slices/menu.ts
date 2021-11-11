import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityId,
} from '@reduxjs/toolkit';

import {
  apiAddFood,
  apiDeleteFood,
  apiEditFood,
  apiGetMenu,
} from 'api/method/menu';
import {IFoodItem} from 'api/utils';
import {
  getFoodItemArray,
  getIdMappedMenus,
  IMappedMenus,
  RequestStatus,
} from 'store/utils';
import {RootState} from 'store/';
import {showError, showSuccess} from 'utils/Toast';

const menuAdapter = createEntityAdapter<IFoodItem>({
  selectId: (item) => item._id,
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

const addMenu = createAsyncThunk(
  'menu/add',
  async ({
    name,
    category,
    price,
    photo,
    description,
  }: {
    name: string;
    category: string;
    price: string;
    photo: string; // TODO: Have to change it to ImagePickerResponse
    description: string;
  }) => {
    const response = await apiAddFood({
      name,
      category,
      price,
      photo,
      description,
    });
    if (!response.success) {
      throw new Error(response.message);
    }
    return response.data?.model as IFoodItem;
  },
  {
    condition: (_, {getState}) => {
      const rootState = getState() as RootState;
      const {status} = rootState.menu;
      return status !== RequestStatus.Pending;
    },
  },
);

const editMenu = createAsyncThunk(
  'menu/edit',
  async ({
    id,
    name,
    category,
    price,
    photo,
    description,
  }: {
    id: EntityId;
    name: string;
    category: string;
    price: string;
    photo: string; // TODO: Have to change it to ImagePickerResponse
    description: string;
  }) => {
    const response = await apiEditFood(id, {
      name,
      category,
      price,
      photo,
      description,
    });
    if (!response.success) {
      throw new Error(response.message);
    }
    return response.data as IFoodItem;
  },
  {
    condition: (_, {getState}) => {
      const rootState = getState() as RootState;
      const {status} = rootState.menu;
      return status !== RequestStatus.Pending;
    },
  },
);

const deleteMenu = createAsyncThunk(
  'menu/delete',
  async (id: EntityId) => {
    const response = await apiDeleteFood(id);
    if (!response.success) {
      throw new Error();
    }
    return response.data?.message as string;
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
    builder.addCase(fetchMenu.fulfilled, (state, action) => {
      menuAdapter.upsertMany(state, action.payload.foodItems);
      state.menus = action.payload.menus;
      state.status = RequestStatus.Fulfilled;
    });
    builder.addCase(fetchMenu.rejected, (state) => {
      state.status = RequestStatus.Rejected;
    });
    builder.addCase(addMenu.pending, (state) => {
      state.status = RequestStatus.Pending;
    });
    builder.addCase(addMenu.fulfilled, (state, action) => {
      menuAdapter.upsertOne(state, action.payload);
      if (Object.keys(state.menus).includes(action.payload.category)) {
        state.menus[action.payload.category].push(action.payload._id);
      } else {
        state.menus[action.payload.category] = [action.payload._id];
      }
      showSuccess(`Success! '${action.payload.name}' has been added.`);
      state.status = RequestStatus.Fulfilled;
    });
    builder.addCase(addMenu.rejected, (state, action) => {
      showError(action.error.message || 'Failed! Something went wrong.');
      state.status = RequestStatus.Rejected;
    });
    builder.addCase(deleteMenu.pending, (state) => {
      state.status = RequestStatus.Pending;
    });
    builder.addCase(deleteMenu.rejected, (state) => {
      state.status = RequestStatus.Rejected;
      showError('Failed! Something went wrong.');
    });
    builder.addCase(deleteMenu.fulfilled, (state, action) => {
      state.status = RequestStatus.Fulfilled;
      const cat = state.entities[action.meta.arg]?.category as string;
      state.menus[cat] = state.menus[cat].filter(
        (el) => el !== action.meta.arg,
      );
      showSuccess(
        `Success! ${state.entities[action.meta.arg]?.name} has been deleted.`,
      );
    });
    builder.addCase(editMenu.pending, (state) => {
      state.status = RequestStatus.Pending;
    });
    builder.addCase(editMenu.rejected, (state) => {
      state.status = RequestStatus.Rejected;
      showError('Failed! Something went wrong.');
    });
    builder.addCase(editMenu.fulfilled, (state, action) => {
      menuAdapter.updateOne(state, {
        id: action.meta.arg.id,
        changes: {
          name: action.meta.arg.name,
          photo: action.meta.arg.photo,
          price: action.meta.arg.price,
          description: action.meta.arg.description,
          category: action.meta.arg.category,
        },
      });
      state.status = RequestStatus.Fulfilled;
      showSuccess('Success! Item has been successfully modified.');
    });
  },
});

export default menuSlice.reducer;
export {fetchMenu, addMenu, deleteMenu, editMenu};
