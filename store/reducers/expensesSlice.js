import { createSlice } from '@reduxjs/toolkit';
import { DUMMY_EXPENSES } from '../../utils/constants';
import { sortByDate } from '../../utils/date';

const initialState = DUMMY_EXPENSES;

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      const id = new Date().toString() + Math.random().toString();

      state.push({ ...action.payload, id });
    },
    deleteExpense: (state, action) => {
      const updatedState = state.filter((expense) => {
        return expense.id !== action.payload;
      });

      return updatedState;
    },
    updateExpense: (state, action) => {
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );

      state[updatableExpenseIndex] = { ...action.payload };
    },
  },
});

export const { addExpense, deleteExpense, updateExpense } =
  expensesSlice.actions;

export default expensesSlice.reducer;
