import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {View, Text} from 'react-native';
import {addExpenseStyle} from '../addExpense/AddExpense.style';
import {languagesLabels, languagesSymbols} from './languages';
import {arePropsEqual} from '../../utils/screenUtils';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {setLanguage} from '../../actions/userActions';
import {useTranslate} from '../../utils/translationsUtils';
import {useCallback} from 'react';
import {languagesStyle} from './Languages.style';
import {capitalize} from 'lodash';
import {useNavigation} from '@react-navigation/native';

const Languages = () => {
  const {language} = useSelector(state => state.user, shallowEqual);
  const dispatch = useDispatch();
  const t = useTranslate();
  const navigation = useNavigation();

  const onChangeLanguage = useCallback(
    newLanguage => {
      const symbol = newLanguage.substring(0, 2);
      dispatch(setLanguage(symbol));
      navigation.navigate(t('dashboard'));
    },
    [dispatch],
  );

  return (
    <View style={languagesStyle.container}>
      <Text style={languagesStyle.label}>{t('pick_your_language')}</Text>
      <Picker
        style={addExpenseStyle.input}
        selectedValue={languagesSymbols[language]}
        onValueChange={itemValue => onChangeLanguage(itemValue)}>
        {languagesLabels.map(label => (
          <Picker.Item key={label} label={capitalize(label)} value={label} />
        ))}
      </Picker>
    </View>
  );
};

export default React.memo(Languages, arePropsEqual);
