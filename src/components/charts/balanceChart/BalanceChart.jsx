import React from 'react';
import {ScrollView, Text} from 'react-native';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {
  VictoryChart,
  VictoryBar,
  VictoryLine,
  VictoryStack,
  VictoryLegend,
  VictoryAxis,
  VictoryLabel,
} from 'victory-native';
import {
  areMonthsAndYearIdentical,
  getLastSixMonthsDates,
} from '../../../utils/timeUtils';
import {
  getExpensesOfSelectedMonth,
  getExpensesTotal,
} from '../../../utils/expensesUtils';
import {balanceChartStyle} from './BalanceChart.style';
import {useTranslate} from '../../../utils/translationsUtils';
import {isEmpty} from 'lodash';

const BalanceChart = () => {
  const {balance, currency} = useSelector(state => state.user);
  const {expenses} = useSelector(state => state.expenses);
  const t = useTranslate();
  const labels = getLastSixMonthsDates();

  const getChartData = () => {
    return labels.reduce((acc, label) => {
      //get the item in balance array that its date is equal to year and month
      const monthData = balance.find(monthBalance =>
        areMonthsAndYearIdentical(new Date(monthBalance.date), label),
      );
      //get the toal expenses of that selected month
      const totalExpenses =
        getExpensesTotal(getExpensesOfSelectedMonth(expenses, label)) ?? 0;
      //handle case budget, goal or expenses are null
      const budget = monthData?.budget
        ? monthData?.budget - totalExpenses
        : totalExpenses;
      acc.push({
        x: moment(label).format('MMM'),
        expenses: totalExpenses,
        budget,
        goal: monthData?.goal ?? budget,
      });
      return acc;
    }, []);
  };
  const data = getChartData();
  return (
    <ScrollView style={balanceChartStyle.container}>
      <Text style={balanceChartStyle.title}>{t('stats_period')} </Text>
      <VictoryChart domainPadding={10}>
        <VictoryAxis tickValues={labels} />
        <VictoryAxis
          dependentAxis
          label={currency}
          axisLabelComponent={<VictoryLabel dy={15} dx={115} />}
        />
        <VictoryStack colorScale={['#1D5D9B', '#A1CCD1']}>
          <VictoryBar
            data={data}
            x="x"
            y="expenses"
            animate={{duration: 500}}
          />
          <VictoryBar data={data} x="x" y="budget" animate={{duration: 500}} />
        </VictoryStack>
        <VictoryLine
          style={{
            data: {stroke: '#F4D160'},
            parent: {border: '1px solid #ccc'},
          }}
          data={data}
          x="x"
          y="goal"
          size={20}
          animate={{duration: 500}}
        />
        <VictoryLegend
          x={50}
          y={10}
          orientation="horizontal"
          gutter={20}
          data={[
            {name: t('expenses'), symbol: {fill: '#1D5D9B'}},
            {name: t('budget'), symbol: {fill: '#A1CCD1'}},
            {name: t('goal'), symbol: {fill: '#F4D160'}},
          ]}
        />
      </VictoryChart>
    </ScrollView>
  );
};

export default BalanceChart;
