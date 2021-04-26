import {configureStore} from '@reduxjs/toolkit';

import category from 'store/slices/category';
import menu from 'store/slices/menu';

export const store = configureStore({
  reducer: {
    category,
    menu,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
