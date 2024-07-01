import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {addExpenseStyle} from './AddExpense.style';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {generateUniqueId, isValidJSON} from '../../utils/stringUtils';
import {isNumber} from '../../utils/numbersUtils';
import {
  createExpense,
  deleteExpense,
  editExpense,
} from '../../actions/expensesActions';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {alertModal, arePropsEqual} from '../../utils/screenUtils';
import {areMonthsAndYearIdentical} from '../../utils/timeUtils';
import {useTranslate} from '../../utils/translationsUtils';
import {capitalize} from 'lodash';

const AddExpense = ({navigation: {navigate}, route}) => {
  let selectedExpense = route?.params?.expense;
  const newCategoryId = route?.params?.newCategoryId;
  const {categories} = useSelector(state => state.categories);
  const {selectedMonth} = useSelector(state => state.user);
  const t = useTranslate();
  const [isRedirectedToCategories, setIsRedirectedToCategories] =
    useState(false);
  const isEditMode = useMemo(() => {
    return isValidJSON(selectedExpense);
  }, [selectedExpense]);
  const isFocused = useIsFocused();

  const initialDate = useMemo(() => {
    const currentDate = new Date();
    return areMonthsAndYearIdentical(currentDate, selectedMonth)
      ? currentDate
      : new Date(selectedMonth);
  }, [selectedMonth]);

  const lastLabel = t('add_new_category');
  const emptyForm = {
    name: '',
    categoryId: categories[0]?.id,
    amount: '',
    date: initialDate,
  };

  const [newExpense, setNewExpense] = useState(emptyForm);
  const [error, setError] = useState({
    name: '',
    amount: '',
  });
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (newExpense.categoryId === lastLabel) {
      setIsRedirectedToCategories(true);
    }
  }, [newExpense]);

  useEffect(() => {
    if (isRedirectedToCategories) {
      navigate('Settings Stack', {
        screen: 'Categories Stack',
        params: {
          screen: t('set_category'),
          params: {expenseEditInProgress: true, selectedExpense},
        },
      });
    }
  }, [isRedirectedToCategories, selectedExpense]);

  useEffect(() => {
    const initialExpenseValue = selectedExpense
      ? JSON.parse(selectedExpense)
      : emptyForm;
    if (isFocused) {
      if (isRedirectedToCategories) {
        setNewExpense(newExpense => ({
          ...newExpense,
          categoryId: newCategoryId,
        }));
      } else {
        setNewExpense(initialExpenseValue);
      }
    } else if (!isFocused) {
      if (!isRedirectedToCategories) {
        setNewExpense(emptyForm);
        navigation.setParams({expense: undefined});
      }
    }
  }, [isFocused, isRedirectedToCategories, selectedExpense, navigation]);

  const createNewExpense = () => {
    const {name, amount} = newExpense;

    if (name.length < 2)
      return setError(error => ({
        ...error,
        name: t('name_input_error_msg'),
      }));
    if (!isNumber(amount))
      return setError({...error, amount: t('amount_input_error_msg')});

    setError({name: '', amount: ''});
    if (isEditMode) dispatch(editExpense(newExpense));
    else {
      dispatch(createExpense({id: generateUniqueId(), ...newExpense}));
    }
    setNewExpense(emptyForm);
    setIsRedirectedToCategories(false);
    navigate(t('expenses'));
  };

  const cancelNewExpense = () => {
    navigate(t('expenses'));
  };

  const handleDeleteExpense = expenseId => {
    if (selectedExpense) {
      const modalText = t(`expense_delete_warnung`);
      alertModal(t('expense_delete_modal_title'), modalText, () => {
        dispatch(deleteExpense(expenseId));
        navigate(t('expenses'));
      });
    }
  };

  const handleDateChange = (date, pickerShow) => {
    setNewExpense({...newExpense, date});
    pickerShow(false);
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={addExpenseStyle.container}>
        <View style={addExpenseStyle.inputs_container}>
          <View style={addExpenseStyle.input_container}>
            <Text style={addExpenseStyle.label}>{t('name')}</Text>
            <TextInput
              style={addExpenseStyle.input}
              onChangeText={text => setNewExpense({...newExpense, name: text})}
              value={newExpense.name}
            />
            {error.name && (
              <Text style={addExpenseStyle.error_msg}>{error.name}</Text>
            )}
          </View>
          <View style={addExpenseStyle.input_container}>
            <Text style={addExpenseStyle.label}>{t('amount')}</Text>
            <TextInput
              style={addExpenseStyle.input}
              onChangeText={num => setNewExpense({...newExpense, amount: num})}
              value={newExpense.amount}
              keyboardType="numeric"
            />
            {error.amount && (
              <Text style={addExpenseStyle.error_msg}>{error.amount}</Text>
            )}
          </View>
          <View style={addExpenseStyle.input_container}>
            <Text style={addExpenseStyle.label}>{t('category')}</Text>
            <View style={addExpenseStyle.picker}>
              <Picker
                style={{color: '#000'}}
                itemStyle={addExpenseStyle.input}
                selectedValue={newExpense.categoryId}
                onValueChange={itemValue =>
                  setNewExpense({...newExpense, categoryId: itemValue})
                }>
                {categories.map(category => (
                  <Picker.Item
                    key={category.id}
                    label={capitalize(category.name)}
                    value={category.id}
                  />
                ))}
                <Picker.Item
                  key={generateUniqueId()}
                  label={lastLabel}
                  value={lastLabel}
                />
              </Picker>
            </View>
          </View>
          <View style={addExpenseStyle.date_container}>
            <View style={{...addExpenseStyle.input_container, flex: 2.5}}>
              <Text style={addExpenseStyle.label}>{t('date')}</Text>
              <TouchableOpacity onPress={() => setShowDate(true)}>
                <Text style={addExpenseStyle.input}>
                  {moment(newExpense.date).format('DD-MM-YYYY')}
                </Text>
              </TouchableOpacity>
              {showDate && (
                <DateTimePicker
                  value={newExpense.date}
                  mode="date"
                  display="default"
                  onChange={(e, date) => {
                    handleDateChange(date, setShowDate);
                  }}
                />
              )}
            </View>
            <View style={{...addExpenseStyle.input_container, flex: 1.5}}>
              <Text style={addExpenseStyle.label}>{t('time')}</Text>
              <TouchableOpacity onPress={() => setShowTime(true)}>
                <Text style={addExpenseStyle.input}>
                  {moment(newExpense.date).format('HH:mm')}
                </Text>
              </TouchableOpacity>
              {showTime && (
                <DateTimePicker
                  value={newExpense.date}
                  is24Hour={true}
                  mode="time"
                  display="default"
                  onChange={(e, date) => {
                    handleDateChange(date, setShowTime);
                  }}
                />
              )}
            </View>
          </View>
        </View>

        <View style={addExpenseStyle.btns_container}>
          <TouchableOpacity
            onPress={() => cancelNewExpense()}
            style={addExpenseStyle.cancel_btn}>
            <Text style={addExpenseStyle.btn_text}>{t('cancel')}</Text>
          </TouchableOpacity>
          {isEditMode && (
            <TouchableOpacity
              onPress={() => handleDeleteExpense(newExpense?.id)}
              style={addExpenseStyle.delete_btn}>
              <Text style={addExpenseStyle.btn_text}>{t('delete')}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={createNewExpense}
            style={addExpenseStyle.add_btn}>
            <Text style={addExpenseStyle.btn_text}>
              {isEditMode ? t('edit') : t('add')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default React.memo(AddExpense, arePropsEqual);
