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
import {setGoal} from '../../actions/userActions';
import {useTranslate} from '../../utils/translationsUtils';

const Goal = ({navigation: {navigate}, route}) => {
  const goal = route?.params?.goal;
  const [newGoal, setNewGoal] = useState(goal);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const t = useTranslate();

  const createNewGoal = () => {
    if (newGoal.length < 1) return setError(t('enter_goal'));

    setError('');
    dispatch(setGoal(Number(newGoal)));
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
