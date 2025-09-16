import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect, useMemo, useState, useLayoutEffect} from 'react';
import {dashboardStyle} from './Dashboard.style';
import KPI from '../../components/KPI/KPI';
import {useDispatch, useSelector} from 'react-redux';
import CategoriesPieChart from '../../components/charts/categoriesPieChart/CategoriesPieChart';
import {ScrollView} from 'react-native';
import {
  getExpensesOfSelectedMonth,
  getExpensesTotal,
} from '../../utils/expensesUtils';
import {capitalize, isEmpty} from 'lodash';
import {areMonthsAndYearIdentical} from '../../utils/timeUtils';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import {arePropsEqual, useLoaderMargin} from '../../utils/screenUtils';
import {useTranslate} from '../../utils/translationsUtils';
import {getGoal} from '../../actions/goalActions';
import moment from 'moment';

const Dashboard = ({navigation: {navigate}}) => {
  const [budget, setBudget] = useState();
  const goal = useSelector(state => state.goal);
  const dispatch = useDispatch();

  const {expenses, loading: expensesLoading} = useSelector(
    state => state.expenses,
  );
  const {
    name,
    balance,
    selectedMonth,
    loading: userLoading,
  } = useSelector(state => state.user);
  const t = useTranslate();
  const {loading: categoriesLoading} = useSelector(state => state.categories);
  const loaderMargin = useLoaderMargin();

  //set budget and goal after user changes balances
  useEffect(() => {
    const month = moment(selectedMonth).month() + 1; // months are 0-based in JS
    const year = moment(selectedMonth).year();

    dispatch(getGoal(month, year));
    if (!isEmpty(balance)) {
      const monthData = balance.find(monthBalance =>
        areMonthsAndYearIdentical(new Date(monthBalance.date), selectedMonth),
      );
      setBudget(monthData?.budget);
    }
  }, [selectedMonth, balance]);

  const expensesOfSelectedMonth = useMemo(
    () => getExpensesOfSelectedMonth(expenses, selectedMonth),
    [expenses, selectedMonth],
  );
  const expensesTotal = useMemo(
    () => getExpensesTotal(expensesOfSelectedMonth),
    [expensesOfSelectedMonth],
  );

  const handleExpensesKpiclick = () => {
    navigate(t('expenses'));
  };

  const handleBudgetKPIClick = () => {
    navigate(t('budget'), {budget});
  };

  const handleGoalKPIClick = () => {
    navigate(t('goal'), {goal});
  };

  return (
    <View style={{flex: 1, alignContent: 'center'}}>
      <ScrollView contentContainerStyle={dashboardStyle.dashboard}>
        {categoriesLoading || expensesLoading || userLoading ? (
          <ActivityIndicator size={80} style={{marginTop: loaderMargin}} />
        ) : (
          <>
            <View style={dashboardStyle.header}>
              <Text style={dashboardStyle.welcome_text}>
                {t('welcome') + ' ' + capitalize(name)}
              </Text>
            </View>

            <View style={dashboardStyle.kpisSection}>
              <Text style={dashboardStyle.kpisSectionTitle}>Balance</Text>
              <View style={dashboardStyle.kpisContainer}>
                <KPI
                  title={t('budget')}
                  value={budget}
                  onPress={handleBudgetKPIClick}
                  leftColor={'#7bfa3c'}
                  rightColor={'#52f502'}
                  icon={
                    <FontAwesome5Icon name="wallet" size={28} color={'#fff'} />
                  }
                />
                <KPI
                  title={t('expenses')}
                  value={expensesTotal}
                  onPress={handleExpensesKpiclick}
                  leftColor={'#1D5D9B'}
                  rightColor={'#2e90f0'}
                  icon={
                    <FontAwesome5Icon
                      name="money-bill-alt"
                      size={28}
                      color={'#fff'}
                    />
                  }
                />
                <KPI
                  title={t('goal')}
                  value={goal?.target}
                  onPress={handleGoalKPIClick}
                  leftColor={'#f7f443'}
                  rightColor={'#fcf803'}
                  icon={
                    <FoundationIcon
                      name="target-two"
                      size={28}
                      color={'#fff'}
                    />
                  }
                />
              </View>
            </View>

            {isEmpty(expensesOfSelectedMonth) ? (
              <View style={{alignItems: 'center'}}>
                <Text style={dashboardStyle.empty_expenses_msg}>
                  {t('no_chart_expenses_found_msg')}
                </Text>
              </View>
            ) : (
              <CategoriesPieChart
                selectedMonth={selectedMonth}
                expenses={expenses}
                navigate={navigate}
              />
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default React.memo(Dashboard, arePropsEqual);
