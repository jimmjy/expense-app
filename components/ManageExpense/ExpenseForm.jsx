import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

import Input from './Input';
import Button from '../ui/Button';
import { getFormattedDate } from '../../utils/date';
import { GlobalStyles } from '../../utils/constants';

const ExpenseForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputs((currentInput) => {
      return {
        ...currentInput,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  };

  const submitHandler = () => {
    const convertedAmount = +inputs.amount.value;
    const convertedDate = new Date(inputs.date.value);
    const description = inputs.description.value;

    const amountIsValid = !isNaN(convertedAmount) && convertedAmount > 0;
    const dateIsValid = convertedDate.toString() !== 'Invalid Date';
    const descriptionIsValid = description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert('Invalid input', 'Please check your input values');
      setInputs((currentInputs) => ({
        amount: { value: currentInputs.amount.value, isValid: amountIsValid },
        date: { value: currentInputs.date.value, isValid: dateIsValid },
        description: {
          value: currentInputs.description.value,
          isValid: descriptionIsValid,
        },
      }));
      return;
    }

    onSubmit({
      amount: convertedAmount,
      date: convertedDate.toISOString(),
      description,
    });
  };

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          invalid={!inputs.amount.isValid}
          label='Amount'
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: (enteredText) =>
              inputChangeHandler('amount', enteredText),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          invalid={!inputs.date.isValid}
          label='Date'
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: (enteredText) =>
              inputChangeHandler('date', enteredText),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        style={styles.input}
        label='Description'
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          // autoCorrect: false // default is true
          //   autoCapitalize: 'characters' or 'words' or 'sentences' // important prop
          onChangeText: (enteredText) =>
            inputChangeHandler('description', enteredText),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Invalid input values - please check your entered data
          </Text>
        </View>
      )}
      <View style={styles.buttons}>
        <Button custom={styles.button} mode='flat' onPress={onCancel}>
          Cancel
        </Button>
        <Button onPress={submitHandler} custom={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: { marginTop: 40 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  input: {
    marginBottom: 16,
  },
  errorContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: 4,
    marginBottom: 16,
  },
  errorText: {
    padding: 4,
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    backgroundColor: GlobalStyles.colors.primary100,
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
});
