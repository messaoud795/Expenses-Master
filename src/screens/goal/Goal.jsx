import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addExpenseStyle} from '../addExpense/AddExpense.style';
import {useTranslate} from '../../utils/translationsUtils';
import moment from 'moment';
import {createGoal} from '../../actions/goalActions';

const Goal = ({navigation: {navigate}, route}) => {
  const goal = route?.params?.goal;
  const [newGoal, setNewGoal] = useState(goal);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const t = useTranslate();
  const {selectedMonth} = useSelector(state => state.user);

  const createNewGoal = () => {
    if (newGoal.length < 1) return setError(t('enter_goal'));
    const month = moment(selectedMonth).month() + 1; // months are 0-based in JS
    const year = moment(selectedMonth).year();

    dispatch(createGoal(Number(newGoal), month, year));
    setError('');
    navigate(t('dashboard'));
  };

  const cancelNewGoal = () => {
    navigate(t('dashboard'));
  };
  return (
    <ScrollView style={addExpenseStyle.container}>
      <View style={addExpenseStyle.inputs_container}>
        <View style={addExpenseStyle.input_container}>
          <Text style={addExpenseStyle.label}>{t('goal')}</Text>
          <TextInput
            style={addExpenseStyle.input}
            onChangeText={text => setNewGoal(text)}
            value={newGoal ? String(newGoal) : ''}
            keyboardType="numeric"
          />
          {error && <Text style={addExpenseStyle.error_msg}>{error}</Text>}
        </View>
      </View>

      <View style={addExpenseStyle.btns_container}>
        <TouchableOpacity
          onPress={cancelNewGoal}
          style={addExpenseStyle.cancel_btn}>
          <Text style={addExpenseStyle.btn_text}>{t('cancel')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={createNewGoal}
          style={addExpenseStyle.add_btn}>
          <Text style={addExpenseStyle.btn_text}>{t('confirm')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Goal;
