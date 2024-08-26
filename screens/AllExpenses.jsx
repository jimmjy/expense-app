import { StyleSheet, Text, View } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useSelector } from 'react-redux';
import { sortByDate } from '../utils/date';

const AllExpenses = () => {
  const expenses = useSelector((state) => state.expenses);

  return (
    <ExpensesOutput
      expenses={sortByDate(expenses)}
      expensesPeriod='Total'
      fallbackText='No registered expenses found!'
    />
  );
};

export default AllExpenses;

const styles = StyleSheet.create({});
