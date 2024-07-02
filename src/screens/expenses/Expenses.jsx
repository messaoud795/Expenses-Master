import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {
  getExpensesOfSelectedMonth,
  getExpensesTotal,
  groupExpensesByCatgeory,
} from '../../utils/expensesUtils';
import {expensesStyle} from './Expenses.style';
import moment from 'moment';
import {isArray, isNumber} from 'lodash';
import {getCategoryId, getCategoryName} from '../../utils/categoriesUtils';
import {isArrayEmpty} from '../../utils/arrayUtils';
import {useLoaderMargin} from '../../utils/screenUtils';
import {useTranslate} from '../../utils/translationsUtils';

const Expenses = ({navigation, route}) => {
  const {navigate} = navigation;
  const {expenses, loading} = useSelector(state => state.expenses);
  const {categories} = useSelector(state => state.categories);
  const {currency, selectedMonth} = useSelector(state => state.user);
  const [data, setData] = useState([]);
  const selectedCategoryId = route?.params?.category;
  const loaderMargin = useLoaderMargin();
  const t = useTranslate();
  useEffect(() => {
    if (isArrayEmpty(expenses)) setData([]);
    else {
      //filter expenses of selected Month
      const expensesOfSelectedMonth = getExpensesOfSelectedMonth(
        expenses,
        selectedMonth,
      );
      //formulate the data array in this form [{categoryId:'' , expenses:[], total:xx}]
      const groupedExpensesByCatgeoryId = groupExpensesByCatgeory(
        expensesOfSelectedMonth,
      );
      let expensesData = Object.keys(groupedExpensesByCatgeoryId).reduce(
        (acc, categoryId) => {
          if (isNumber(selectedCategoryId) && selectedCategoryId != categoryId)
            return acc;
          const expenses = groupedExpensesByCatgeoryId[categoryId].sort(
            (a, b) => b.amount - a.amount,
          );
          const category = getCategoryName(categoryId);
          acc.push({category, expenses, total: getExpensesTotal(expenses)});
          return acc;
        },
        [],
      );
      //sort data by total
      expensesData.sort((a, b) => b.total - a.total);
      setData(expensesData);
    }
  }, [expenses, selectedMonth, selectedCategoryId, categories]);

  // reset the category when 'blur' event is triggered
  //that means the screen loses focus, meaning the user navigated away from this screen to another one.
  useEffect(() => {
    navigation.addListener('blur', () => {
      navigation.setParams({category: undefined});
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={expensesStyle.container}>
      {loading ? (
        <ActivityIndicator size={80} style={{marginTop: loaderMargin}} />
      ) : isArray(data) && data.length === 0 ? (
        <View style={expensesStyle.empty_expenses_msg_container}>
          <Text style={expensesStyle.empty_expenses_msg}>
            {t('no_expenses_found_msg')}
          </Text>
        </View>
      ) : (
        <View style={expensesStyle.list}>
          {data.map((item, index) => (
            <View key={index}>
              {(!selectedCategoryId ||
                selectedCategoryId === getCategoryId(item.category)) && (
                <View>
                  <View style={expensesStyle.header}>
                    <Text style={expensesStyle.title}>{item.category} :</Text>
                    <Text style={expensesStyle.total}>
                      {item.total + ' ' + currency}
                    </Text>
                  </View>
                  <View style={expensesStyle.expenses}>
                    {item.expenses.map((expense, index) => (
                      <TouchableOpacity
                        key={index}
                        style={expensesStyle.expense}
                        onPress={() =>
                          navigate(t('add_expense'), {
                            expense: JSON.stringify(expense),
                          })
                        }>
                        <View style={expensesStyle.expense_header}>
                          <Text style={expensesStyle.expense_name}>
                            {expense.name}
                          </Text>
                          <Text style={expensesStyle.expense_amount}>
                            {expense.amount + ' ' + currency}
                          </Text>
                        </View>
                        <Text style={expensesStyle.expense_amount}>
                          {moment(expense.date).format('DD-MM-YYYY hh:mm')}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default Expenses;
