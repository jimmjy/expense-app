// vendor imports
import { useLayoutEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// components
import IconButton from '../components/ui/IconButton';
import Button from '../components/ui/Button';

// utils
import { GlobalStyles } from '../utils/constants';

// store
import {
  addExpense,
  deleteExpense,
  updateExpense,
} from '../store/reducers/expensesSlice';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

const ManageExpense = ({ route, navigation }) => {
  const editingExpenseId = route.params?.expenseId;
  const isEditing = !!editingExpenseId;

  const dispatch = useDispatch();

  const expenses = useSelector((state) => state.expenses);

  const deleteExpenseHandler = (id) => {
    dispatch(deleteExpense(editingExpenseId));

    navigation.goBack();
  };

  const cancelHandler = () => {
    console.log('cancel', { expenses });
    navigation.goBack();
  };

  const confirmHandler = (expenseData) => {
    if (isEditing) {
      dispatch(
        updateExpense({
          id: editingExpenseId,
          ...expenseData,
        })
      );
    } else {
      dispatch(addExpense(expenseData));
    }
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
      />
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

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});

export default ManageExpense;
