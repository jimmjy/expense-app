import { createSlice } from '@reduxjs/toolkit';
import { DUMMY_EXPENSES } from '../../utils/constants';
import { sortByDate } from '../../utils/date';

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState: { expenses: [] },
  reducers: {
    setLocalExpenses: (state, action) => {
      const sortedExpenses = sortByDate(action.payload);
      state.expenses = sortedExpenses;
    },
    addLocalExpense: (state, action) => {
      state.expenses.push({ ...action.payload });
    },
    deleteLocalExpense: (state, action) => {
      const updatedState = state.expenses.filter((expense) => {
        return expense.id !== action.payload;
      });

      state.expenses = updatedState;
    },
    updateLocalExpense: (state, action) => {
      const updatableExpenseIndex = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );

      state.expenses[updatableExpenseIndex] = { ...action.payload };
    },
  },
});

export const {
  setLocalExpenses,
  addLocalExpense,
  deleteLocalExpense,
  updateLocalExpense,
} = expensesSlice.actions;

export default expensesSlice.reducer;
