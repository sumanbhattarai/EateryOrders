import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {RequestStatus} from 'store/utils';
import {apiLogin} from 'api/method/auth';
import {RootState} from 'store/index';

const initialState: {
  status: RequestStatus;
  isLoggedIn: boolean;
  token: string | null;
} = {
  status: RequestStatus.Idle,
  isLoggedIn: false,
  token: null,
};

const login = createAsyncThunk(
  'auth/login',
  async ({email, password}: {email: string; password: string}) => {
    const response = await apiLogin({email, password});
  },
  {
    condition: (_, {getState}) => {
      const rootState = getState() as RootState;
      const {status} = rootState.auth;
      return status !== RequestStatus.Pending;
    },
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.status = RequestStatus.Pending;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = RequestStatus.Rejected;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = RequestStatus.Fulfilled;
    });
  },
});

export default authSlice.reducer;
export {login};
