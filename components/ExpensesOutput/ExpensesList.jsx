import { FlatList, StyleSheet, Text, View } from 'react-native';
import ExpenseItem from './ExpenseItem';

const renderExpenseItem = (itemData) => {
  return <ExpenseItem {...itemData.item} />;
};

const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      key={(item) => item.id}
      renderItem={renderExpenseItem}
    />
  );
};

export default ExpensesList;

const styles = StyleSheet.create({});
