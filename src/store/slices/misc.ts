import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

interface IInitialState {
  isOpen: boolean;
}

const initialState: IInitialState = {
  isOpen: true,
};

const getHotelOpenStatus = createAsyncThunk(
  'misc/getHotelOpenStatus',
  async () => {},
);

const toggleHotelOpenStatus = createAsyncThunk(
  'misc/toggleHotelOpenStatus',
  async () => {},
);

const miscSlice = createSlice({
  name: 'misc',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHotelOpenStatus.fulfilled, () => {});
    builder.addCase(getHotelOpenStatus.rejected, () => {});
    builder.addCase(toggleHotelOpenStatus.fulfilled, (state) => {
      state.isOpen = !state.isOpen;
    });
    builder.addCase(toggleHotelOpenStatus.rejected, () => {});
  },
});

export default miscSlice.reducer;
export {getHotelOpenStatus, toggleHotelOpenStatus};
