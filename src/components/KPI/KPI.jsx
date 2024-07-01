import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {kpiStyle} from './KPI.style';
import LinearGradient from 'react-native-linear-gradient';
import {formatKPI} from '../../utils/numbersUtils';
import {useSelector} from 'react-redux';

const KPI = ({title, value, onPress, leftColor, rightColor, icon}) => {
  const {currency} = useSelector(state => state.user);
  return (
    <LinearGradient
      colors={[leftColor, rightColor]}
      start={{x: 0, y: 0}} // Start from the top-left corner
      end={{x: 1, y: 1}} // End at the bottom-right corner
      style={kpiStyle.kpiContainer}>
      <TouchableOpacity onPress={onPress} style={kpiStyle.clickable_container}>
        {icon}
        <View>
          <Text style={kpiStyle.title}>{title}</Text>
          <Text style={kpiStyle.value}>{formatKPI(value, currency)}</Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default KPI;
