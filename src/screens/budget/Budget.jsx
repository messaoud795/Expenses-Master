import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addExpenseStyle} from '../addExpense/AddExpense.style';
import {setBudget} from '../../actions/userActions';
import {useTranslate} from '../../utils/translationsUtils';

const Budget = ({navigation: {navigate}, route}) => {
  const budget = route?.params?.budget;
  const [newBudget, setNewBudget] = useState(budget);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const t = useTranslate();

  const createNewBudget = () => {
    if (newBudget.length < 1) return setError(t('enter_budget'));

    setError('');
    dispatch(setBudget(Number(newBudget)));
    navigate(t('dashboard'));
  };

  const cancelNewBudget = () => {
    navigate(t('dashboard'));
  };

  return (
    <ScrollView style={addExpenseStyle.container}>
      <View style={addExpenseStyle.inputs_container}>
        <View style={addExpenseStyle.input_container}>
          <Text style={addExpenseStyle.label}>{t('budget')}</Text>
          <TextInput
            style={addExpenseStyle.input}
            onChangeText={text => setNewBudget(text)}
            value={newBudget ? String(newBudget) : ''}
            keyboardType="numeric"
          />
          {error && <Text style={addExpenseStyle.error_msg}>{error}</Text>}
        </View>
      </View>

      <View style={addExpenseStyle.btns_container}>
        <TouchableOpacity
          onPress={cancelNewBudget}
          style={addExpenseStyle.cancel_btn}>
          <Text style={addExpenseStyle.btn_text}>{t('cancel')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={createNewBudget}
          style={addExpenseStyle.add_btn}>
          <Text style={addExpenseStyle.btn_text}>{t('confirm')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Budget;
