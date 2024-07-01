import React from 'react';
import {ScrollView} from 'react-native';
import BalanceChart from '../../components/charts/balanceChart/BalanceChart';
import {useSelector} from 'react-redux';
import {isArrayEmpty} from '../../utils/arrayUtils';
import {Text} from 'react-native';
import {statisticsStyle} from './Statistics.style';
import {useTranslate} from '../../utils/translationsUtils';

const Statistics = () => {
  const {expenses} = useSelector(state => state.expenses);
  const t = useTranslate();
  return (
    <ScrollView contentContainerStyle={statisticsStyle.container}>
      {isArrayEmpty(expenses) ? (
        <Text style={statisticsStyle.empty_data_msg}>
          {t('no_expenses_found_msg_for_stats')}
        </Text>
      ) : (
        <BalanceChart />
      )}
    </ScrollView>
  );
};

export default Statistics;
