// vendor imports
import { useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// components
import IconButton from '../components/ui/IconButton';
import Button from '../components/ui/Button';

// utils
import { GlobalStyles } from '../utils/constants';

// store
import {
  addExpense,
  removeExpense,
  updateExpense,
} from '../store/reducers/expensesSlice';

const ManageExpense = ({ route, navigation }) => {
  const editingExpenseId = route.params?.expenseId;
  const isEditing = !!editingExpenseId;

  const state = useSelector((state) => state);

  const deleteExpenseHandler = () => {
    console.log('delete', { state });
  };

  const cancelHandler = () => {
    console.log('cancel', { state });
  };

  const confirmHandler = () => {
    console.log('confirm', { state });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button custom={styles.button} mode='flat' onPress={cancelHandler}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} custom={styles.button}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});

export default ManageExpense;
