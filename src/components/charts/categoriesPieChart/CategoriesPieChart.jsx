import React, {useMemo} from 'react';
import {Text, View} from 'react-native';
import {chartColors} from './CategoriesPieChart.constants';
import {capitalize, round, sum} from 'lodash';
import {pieChartStyle} from './CategoriesPieChart.style';
import {
  calculateTotalOfCategorizedExpenses,
  getExpensesOfSelectedMonth,
  groupExpensesByCatgeory,
  sortCategoriesTotals,
} from '../../../utils/expensesUtils';
import {VictoryContainer, VictoryLabel, VictoryPie} from 'victory-native';
import {formatLabel} from '../../../utils/stringUtils';
import {useScreenWidth} from '../../../utils/screenUtils';
import {getCategoryId, getCategoryName} from '../../../utils/categoriesUtils';
import {formatKPI} from '../../../utils/numbersUtils';

const CategoriesPieChart = ({selectedMonth, expenses, navigate}) => {
  const screenWidth = useScreenWidth();

  const groupedExpenses = useMemo(
    () =>
      groupExpensesByCatgeory(
        getExpensesOfSelectedMonth(expenses, selectedMonth),
      ),
    [expenses, selectedMonth],
  );
  let categories = Object.keys(groupedExpenses);
  let series = useMemo(
    () => calculateTotalOfCategorizedExpenses(groupedExpenses),
    [groupedExpenses],
  );
  const total = sum(series);
  const colors = chartColors.slice(0, series.length);
  [categories, series] = sortCategoriesTotals(series, categories);

  const navigateToCategoryExpenses = category => {
    navigate('Expenses', {category});
  };
  const data = categories.reduce(
    (acc, categoryId, index) => [
      ...acc,
      {x: capitalize(getCategoryName(categoryId)), y: series[index]},
    ],
    [],
  );

  return (
    <View
      style={{
        ...pieChartStyle.chartContainer,
        width: screenWidth,
      }}>
      <VictoryPie
        animate={{
          duration: 500,
        }}
        data={data}
        style={pieChartStyle.chart}
        innerRadius={screenWidth * 0.13}
        padAngle={2}
        containerComponent={<VictoryContainer />}
        labelRadius={115}
        labels={({datum}) =>
          `${formatLabel(datum.x)}\n${round((datum.y / total) * 100, 1)}%`
        }
        colorScale={colors}
        height={screenWidth * 0.8}
        width={screenWidth * 0.8}
        labelComponent={
          <VictoryLabel
            textAnchor="middle"
            verticalAnchor="middle"
            style={{
              fontSize: 14,
              fontWeight: '500',
            }}
          />
        }
        labelPosition={'centroid'}
        events={[
          {
            target: 'data',
            eventHandlers: {
              onPress: () => {
                return [
                  {
                    target: 'data',
                    mutation: props => {
                      navigateToCategoryExpenses(
                        getCategoryId(props.datum.xName.toLowerCase()),
                      );
                    },
                  },
                ];
              },
              onPressOut: () => {},
            },
          },
        ]}
      />
      <Text style={pieChartStyle.total}>{formatKPI(total)}</Text>
    </View>
  );
};
export default CategoriesPieChart;
