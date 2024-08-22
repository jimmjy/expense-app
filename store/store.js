import { configureStore } from '@reduxjs/toolkit';
import expensesSlice from './reducers/expensesSlice';

export const store = configureStore({
  reducer: {
    expenses: expensesSlice,
  },
});
