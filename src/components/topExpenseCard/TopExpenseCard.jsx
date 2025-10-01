import React from 'react';
import {View, Text} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {statisticsStyle} from '../../screens/profits/Profits.style';

const TopExpenseCard = ({topExpense}) => {
  return (
    <View style={statisticsStyle.expenseCard}>
      <FontAwesome5 name="wallet" size={20} />
      <Text style={statisticsStyle.expenseName}>{topExpense.expenseName}</Text>
      <Text style={statisticsStyle.expenseName}>{topExpense.expenseTotal}</Text>
    </View>
  );
};

export default TopExpenseCard;
