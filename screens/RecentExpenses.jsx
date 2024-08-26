import { StyleSheet, Text, View } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useSelector } from 'react-redux';
import { getDateMinusDays, sortByDate } from '../utils/date';

const RecentExpenses = () => {
  const expenses = useSelector((state) => state.expenses);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return (
      new Date(expense.date) > date7DaysAgo && new Date(expense.date) <= today
    );
  });

  return (
    <ExpensesOutput
      expenses={sortByDate(recentExpenses)}
      expensesPeriod='Last 7 days'
      fallbackText='No expenses registered for the last 7 days'
    />
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({});
