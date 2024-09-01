import { configureStore } from '@reduxjs/toolkit';
import expensesSlice from './reducers/expensesSlice';
import loadingSlice from './reducers/loadingSlice';

export const store = configureStore({
  reducer: {
    expenses: expensesSlice,
    loading: loadingSlice,
  },
});
