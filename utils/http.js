import axios from 'axios';

const BACKEND_URL = 'https://native-6f8e1-default-rtdb.firebaseio.com';

export const storeExpense = async (expenseData) => {
  const response = await axios.post(
    BACKEND_URL + '/expenses.json',
    expenseData
  );
  const id = response.data.name;

  return id;
};

export const fetchExpenses = async () => {
  const response = await axios.get(BACKEND_URL + '/expenses.json');

  const expenses = [];

  for (const key in response.data) {
    const { amount, description, date } = response.data[key];
    const expense = {
      id: key,
      amount,
      description,
      date: new Date(date).toISOString(),
    };
    expenses.push(expense);
  }

  return expenses;
};

export const updateExpense = (id, expenseData) => {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
};

export const deleteExpense = async (id) => {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
};
