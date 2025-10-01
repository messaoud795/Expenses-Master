import React from 'react';
import {View, Text} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {statisticsStyle} from '../../screens/profits/Profits.style';

const TipCard = ({tip, currency, t}) => {
  return (
    <View style={statisticsStyle.tipCard}>
      {/* Expense Name */}
      <View style={statisticsStyle.tipRow}>
        <FontAwesome5 name="wallet" size={18} />
        <Text style={statisticsStyle.tipLabel}>
          {t('expense_name')}:
          <Text style={statisticsStyle.expenseValue}> {tip.expenseName}</Text>
        </Text>
      </View>

      {/* Expense Period */}
      <View style={statisticsStyle.tipRow}>
        <FontAwesome5 name="calendar-alt" size={16} color="#8e44ad" />
        <Text style={statisticsStyle.tipLabel}>
          {t('expense_period')}:
          <Text style={statisticsStyle.expenseValue}>
            {' '}
            {tip.expenseStart.month}/{tip.expenseStart.year} –{' '}
            {tip.expenseEnd.month}/{tip.expenseEnd.year}
          </Text>
        </Text>
      </View>

      {/* Expense Total */}
      <View style={statisticsStyle.tipRow}>
        <FontAwesome5 name="money-bill-wave" size={16} color="#16a085" />
        <Text style={statisticsStyle.tipLabel}>
          {t('expense_total')}:
          <Text style={statisticsStyle.expenseValue}>
            {' '}
            {tip.expenseTotal} {currency}
          </Text>
        </Text>
      </View>

      {/* Recommendation Description */}
      <Text style={statisticsStyle.tipDescription}>{tip.description}</Text>

      {/* Investment */}
      <View style={statisticsStyle.tipRow}>
        <FontAwesome5 name="piggy-bank" size={16} />
        <Text style={statisticsStyle.tipLabel}>
          {t('investment')}:
          <Text style={statisticsStyle.investmentValue}>
            {' '}
            {tip.investment} {currency}
          </Text>
        </Text>
      </View>

      {/* Profit */}
      <View style={statisticsStyle.tipRow}>
        <FontAwesome5 name="chart-line" size={16} color="#27ae60" />
        <Text style={statisticsStyle.tipLabel}>
          {t('profit')}:
          <Text style={statisticsStyle.profitValue}>
            {' '}
            {tip.profit} {currency}
          </Text>
        </Text>
      </View>

      {/* Time to Profit */}
      <View style={statisticsStyle.tipRow}>
        <FontAwesome5 name="clock" size={16} color="#2980b9" />
        <Text style={statisticsStyle.tipLabel}>
          {t('time_to_profit')}:
          <Text style={statisticsStyle.durationValue}>
            {' '}
            {tip.timeToProfit} {t('months')}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default TipCard;
