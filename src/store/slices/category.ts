import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import {apiAddCategory, apiGetCategory} from 'api/method/category';
import {ICategory} from 'api/utils';
import {properStringValue} from 'services/StringService';
import {RootState} from 'store/index';
import {RequestStatus} from 'store/utils';
import {showError} from 'utils/Toast';

const categoryAdaptor = createEntityAdapter<ICategory>({
  selectId: (item) => item._id,
});

const initialState = categoryAdaptor.getInitialState<{status: RequestStatus}>({
  status: RequestStatus.Idle,
});

const fetchCategory = createAsyncThunk(
  'category/fetch',
  async () => {
    const response = await apiGetCategory();
    if (!response.success) {
      throw Error();
    }
    return response.data as Array<ICategory>;
  },
  {
    condition: (_, {getState}) => {
      const rootState = getState() as RootState;
      const {status} = rootState.category;
      return status !== RequestStatus.Pending;
    },
  },
);

const addCategory = createAsyncThunk(
  'category/add',
  async (name: string) => {
    const response = await apiAddCategory(properStringValue(name));
    if (!response.success) {
      throw Error();
    }
    return response.data as ICategory;
  },
  {
    condition: (name, {getState}) => {
      const rootState = getState() as RootState;
      const {status, entities} = rootState.category;
      let isPresent: boolean = false;
      for (const id in entities) {
        if (entities[id]?.name.toUpperCase() === name.toUpperCase()) {
          isPresent = true;
          showError(`Category "${name}" already exists.`);
        }
      }
      return status !== RequestStatus.Pending && !isPresent;
    },
  },
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.pending, (state) => {
      state.status = RequestStatus.Pending;
    });
    builder.addCase(
      fetchCategory.fulfilled,
      (state, {payload: data}: PayloadAction<Array<ICategory>>) => {
        categoryAdaptor.upsertMany(state, data);
        state.status = RequestStatus.Fulfilled;
      },
    );
    builder.addCase(fetchCategory.rejected, (state) => {
      state.status = RequestStatus.Rejected;
    });
    builder.addCase(addCategory.pending, (state) => {
      state.status = RequestStatus.Pending;
    });
    builder.addCase(
      addCategory.fulfilled,
      (state, {payload: data}: PayloadAction<ICategory>) => {
        categoryAdaptor.upsertOne(state, data);
        state.status = RequestStatus.Fulfilled;
      },
    );
    builder.addCase(addCategory.rejected, (state) => {
      state.status = RequestStatus.Rejected;
    });
  },
});

export default categorySlice.reducer;
export {fetchCategory, addCategory};
