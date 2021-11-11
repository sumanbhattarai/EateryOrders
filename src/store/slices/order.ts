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
import {showError, showSuccess} from 'utils/Toast';

const orderAdaptor = createEntityAdapter<IOrder>({
  selectId: (item) => item._id,
});

const initialState = orderAdaptor.getInitialState<{
  status: RequestStatus;
  individualOrderStatus: {
    [id: EntityId]: RequestStatus;
  };
}>({
  status: RequestStatus.Idle,
  individualOrderStatus: {},
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
    condition: ({id}, {getState}) => {
      const rootState = getState() as RootState;
      const {individualOrderStatus} = rootState.order;
      return individualOrderStatus[id] !== RequestStatus.Pending;
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
    builder.addCase(updateOrderStatus.pending, (state, action) => {
      state.individualOrderStatus[action.meta.arg.id] = RequestStatus.Pending;
    });
    builder.addCase(updateOrderStatus.rejected, (state, action) => {
      showError('Failed! Something went wrong');
      state.individualOrderStatus[action.meta.arg.id] = RequestStatus.Rejected;
    });
    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      orderAdaptor.updateOne(state, {
        id: action.payload.id,
        changes: {status: action.payload.status},
      });
      showSuccess(
        `Success! Order by ${
          state.entities[action.payload.id]?.customerName
        } of price Rs. ${
          state.entities[action.payload.id]?.totalCost
        } has been shifted.`,
      );
      state.individualOrderStatus[action.meta.arg.id] = RequestStatus.Fulfilled;
    });
  },
});

export default orderSlice.reducer;
export {getOrder, updateOrderStatus};
