import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import {apiGetCategory} from 'api/method/category';
import {ICategory} from 'api/utils';
import {RootState} from 'store/index';
import {RequestStatus} from 'store/utils';

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
      if (status === RequestStatus.Pending) {
        return false;
      }
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
  },
});

export default categorySlice.reducer;
export {fetchCategory};
