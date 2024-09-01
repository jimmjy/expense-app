import { StyleSheet } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useDispatch, useSelector } from 'react-redux';
import { getDateMinusDays } from '../utils/date';
import { useEffect, useState } from 'react';
import { fetchExpenses } from '../utils/http';
import LoadingOverlay from '../components/ui/LoadingOverlay';

import { setLocalExpenses } from '../store/reducers/expensesSlice';
import { setIsLoading } from '../store/reducers/loadingSlice';
import ErrorOverlay from '../components/ui/ErrorOverlay';

const RecentExpenses = () => {
  const { isLoading } = useSelector((state) => state.loading);
  const { expenses = [] } = useSelector((state) => state.expenses);

  const [error, setError] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const getExpenses = async () => {
      dispatch(setIsLoading(true));
      try {
        const expenses = await fetchExpenses();
        dispatch(setLocalExpenses(expenses));
      } catch (error) {
        console.log(error);
        setError('Could not fetch expenses!');
      }
      dispatch(setIsLoading(false));
    };

    getExpenses();
  }, []);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return (
      new Date(expense.date) > date7DaysAgo && new Date(expense.date) <= today
    );
  });

  if (error && !isLoading) {
    return <ErrorOverlay message={error} />;
  }

  return isLoading ? (
    <LoadingOverlay />
  ) : (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod='Last 7 days'
      fallbackText='No expenses registered for the last 7 days'
    />
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({});
