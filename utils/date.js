export const getFormattedDate = (date) => {
  return date.slice(0, 10);
};

export const getDateMinusDays = (date, days) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};

export const sortByDate = (expensesArray) => {
  return expensesArray.slice().sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    } else if (a.date > b.date) {
      return 1;
    }

    return 0;
  });
};
