import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenses: [],
};

// add expense
// remove expense
// update expense

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state) => {
      console.log(' add', { state });
    },
    removeExpense: (state) => {
      console.log('remove', { state });
    },
    updateExpense: (state, action) => {
      console.log('update', { state, action });
    },
  },
});

export const { addExpense, removeExpense, updateExpense } =
  expensesSlice.actions;

export default expensesSlice.reducer;
