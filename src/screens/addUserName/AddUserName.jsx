import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setUserName} from '../../actions/userActions';
import {addExpenseStyle} from '../addExpense/AddExpense.style';
import {useTranslate} from '../../utils/translationsUtils';

const AddUserName = ({navigation: {navigate}, route}) => {
  const {name} = useSelector(state => state.user);
  const t = useTranslate();
  const [newName, setNewName] = useState(name);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const config = route?.params?.config;

  const createNewName = () => {
    if (newName.length < 2) return setError(t('name_input_error_msg'));

    setError('');
    dispatch(setUserName(newName));
    if (config)
      navigate('Settings Stack', {
        screen: t('currency'),
      });
    else navigate(t('dashboard'));
  };

  const cancelNewName = () => {
    navigate(t('settings'));
  };

  return (
    <ScrollView style={addExpenseStyle.container}>
      <View style={addExpenseStyle.inputs_container}>
        <View style={addExpenseStyle.input_container}>
          <Text style={addExpenseStyle.label}>{t('name')}</Text>
          <TextInput
            style={addExpenseStyle.input}
            onChangeText={text => setNewName(text)}
            value={newName}
          />
          {error && <Text style={addExpenseStyle.error_msg}>{error}</Text>}
        </View>
      </View>

      <View style={addExpenseStyle.btns_container}>
        <TouchableOpacity
          onPress={cancelNewName}
          style={addExpenseStyle.cancel_btn}>
          <Text style={addExpenseStyle.btn_text}>{t('cancel')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={createNewName}
          style={addExpenseStyle.add_btn}>
          <Text style={addExpenseStyle.btn_text}>{t('confirm')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddUserName;
