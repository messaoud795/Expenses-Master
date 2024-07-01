import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {settingsStyle} from './Settings.style';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useTranslate} from '../../utils/translationsUtils';

const Settings = ({navigation: {navigate}}) => {
  const t = useTranslate();

  return (
    <View style={settingsStyle.container}>
      <TouchableOpacity
        style={settingsStyle.option}
        onPress={() => navigate(t('user_name'))}>
        <EntypoIcon name="user" size={26} color={'#1D5D9B'} />
        <Text style={settingsStyle.text}>{t('user_name')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={settingsStyle.option}
        onPress={() => navigate('Categories Stack')}>
        <MaterialIcon name="category" size={26} color={'#1D5D9B'} />
        <Text style={settingsStyle.text}>{t('categories')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={settingsStyle.option}
        onPress={() => navigate(t('currency'))}>
        <MaterialCommunityIcon
          name="currency-usd"
          size={26}
          color={'#1D5D9B'}
        />
        <Text style={settingsStyle.text}>{t('currency')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={settingsStyle.option}
        onPress={() => navigate(t('languages'))}>
        <FontAwesomeIcon name="language" size={26} color={'#1D5D9B'} />
        <Text style={settingsStyle.text}>{t('languages')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;
