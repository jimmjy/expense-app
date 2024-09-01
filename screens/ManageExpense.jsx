// vendor imports
import { useLayoutEffect, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// components
import IconButton from '../components/ui/IconButton';

// utils
import { GlobalStyles } from '../utils/constants';

// store
import {
  addLocalExpense,
  deleteLocalExpense,
  updateLocalExpense,
} from '../store/reducers/expensesSlice';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeExpense, updateExpense, deleteExpense } from '../utils/http';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { setIsLoading } from '../store/reducers/loadingSlice';
import ErrorOverlay from '../components/ui/ErrorOverlay';

const ManageExpense = ({ route, navigation }) => {
  const [error, setError] = useState(null);

  const editingExpenseId = route.params?.expenseId;
  const isEditing = !!editingExpenseId;

  const { expenses } = useSelector((state) => state.expenses);
  const { isLoading } = useSelector((state) => state.loading);

  const selectedExpense = expenses.find((expense) => {
    return expense.id === editingExpenseId;
  });

  const dispatch = useDispatch();

  const deleteExpenseHandler = async (id) => {
    dispatch(setIsLoading(true));
    try {
      await deleteExpense(editingExpenseId);
      dispatch(deleteLocalExpense(editingExpenseId));
      navigation.goBack();
    } catch (error) {
      setError('Could not delete expense - please try again later');
      dispatch(setIsLoading(false));
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData) => {
    dispatch(setIsLoading(true));

    try {
      if (isEditing) {
        await updateExpense(editingExpenseId, expenseData);
        dispatch(
          updateLocalExpense({
            id: editingExpenseId,
            ...expenseData,
          })
        );
      } else {
        const id = await storeExpense(expenseData);
        dispatch(addLocalExpense({ ...expenseData, id }));
      }
      navigation.goBack();
    } catch (error) {
      setError('Could not save data = please try again later!');
    }

    dispatch(setIsLoading(false));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  if (error && !isLoading) {
    return <ErrorOverlay message={error} />;
  }

  return isLoading ? (
    <LoadingOverlay />
  ) : (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        defaultValues={selectedExpense}
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
