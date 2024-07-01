import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {addExpenseStyle} from '../addExpense/AddExpense.style';
import {addCurrency} from '../../actions/userActions';
import {currencies} from '../../constants/currenciesConstants';
import {Picker} from '@react-native-picker/picker';
import {useTranslate} from '../../utils/translationsUtils';
import {CommonActions, useNavigation} from '@react-navigation/native';
const SetCurrency = ({navigation: {navigate}}) => {
  const {currency} = useSelector(state => state.user);
  const t = useTranslate();
  const [newCurrency, setNewCurrency] = useState(currency);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const createNewCurrency = () => {
    dispatch(addCurrency(newCurrency));
    navigate(t('dashboard'));
    navigation.dispatch(
      CommonActions.reset({
        index: 0, // Index of the screen to navigate to (the initial screen)
        routes: [{name: t('settings')}], // Name of the initial screen
      }),
    );
  };

  const cancelNewCurrency = () => {
    navigate(t('settings'));
  };
  return (
    <ScrollView style={addExpenseStyle.container}>
      <View style={addExpenseStyle.inputs_container}>
        <View style={addExpenseStyle.input_container}>
          <Picker
            itemStyle={addExpenseStyle.input}
            style={addExpenseStyle.input}
            selectedValue={newCurrency}
            onValueChange={itemValue => setNewCurrency(itemValue)}>
            {currencies.sort().map(currencyAbreviation => (
              <Picker.Item
                key={currencyAbreviation}
                label={currencyAbreviation}
                value={currencyAbreviation}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={addExpenseStyle.btns_container}>
        <TouchableOpacity
          onPress={cancelNewCurrency}
          style={addExpenseStyle.cancel_btn}>
          <Text style={addExpenseStyle.btn_text}>{t('cancel')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={createNewCurrency}
          style={addExpenseStyle.add_btn}>
          <Text style={addExpenseStyle.btn_text}>{t('confirm')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SetCurrency;
