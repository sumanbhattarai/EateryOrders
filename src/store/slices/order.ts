import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityId,
} from '@reduxjs/toolkit';

import {apiGetOrders, apiUpdateOrderStatus} from 'api/method/order';
import {IOrder, IStatus} from 'api/utils';
import {RootState} from 'store/';
import {RequestStatus} from 'store/utils';
import {showError} from 'utils/Toast';

const orderAdaptor = createEntityAdapter<IOrder>({
  selectId: (item) => item._id,
});

const initialState = orderAdaptor.getInitialState<{status: RequestStatus}>({
  status: RequestStatus.Idle,
});

const getOrder = createAsyncThunk(
  'order/get',
  async () => {
    const response = await apiGetOrders();
    if (!response.success) {
      throw new Error();
    }
    return response.data as IOrder[];
  },
  {
    condition: (_, {getState}) => {
      const rootState = getState() as RootState;
      const {status} = rootState.order;
      return status !== RequestStatus.Pending;
    },
  },
);

const updateOrderStatus = createAsyncThunk(
  'order/updateStatus',
  async ({id, status}: {id: EntityId; status: IStatus}) => {
    const response = await apiUpdateOrderStatus({_id: id, status});
    if (!response.success) {
      throw new Error();
    }
    return {message: response.message, id, status} as {
      message: string;
      id: EntityId;
      status: IStatus;
    };
  },
  {
    condition: (_, {getState}) => {
      const rootState = getState() as RootState;
      const {status} = rootState.order;
      return status !== RequestStatus.Pending;
    },
  },
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrder.pending, (state) => {
      state.status = RequestStatus.Pending;
    });
    builder.addCase(getOrder.rejected, (state) => {
      state.status = RequestStatus.Rejected;
      showError('Failed! Something went wrong.');
    });
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.status = RequestStatus.Fulfilled;
      orderAdaptor.upsertMany(state, action.payload);
    });
    builder.addCase(updateOrderStatus.pending, () => {});
    builder.addCase(updateOrderStatus.rejected, () => {
      showError('Failed! Something went wrong');
    });
    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      orderAdaptor.updateOne(state, {
        id: action.payload.id,
        changes: {status: action.payload.status},
      });
    });
  },
});

export default orderSlice.reducer;
export {getOrder, updateOrderStatus};
