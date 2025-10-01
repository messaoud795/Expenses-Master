import React, {useEffect, useMemo} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Text} from 'react-native';
import {useTranslate} from '../../utils/translationsUtils';
import {isArrayEmpty} from '../../utils/arrayUtils';
import {getLastThreeMonths, getTop2ExpensesLast3Months} from './Profits.utils';
import {deleteTips, createTip, loadTips} from '../../actions/tipsActions';
import {isEmpty} from 'lodash';
import {formatDateToMonth, getDateMinusTwoMonths} from '../../utils/timeUtils';
import {loadExpenses} from '../../actions/expensesActions';
import moment from 'moment';
import {statisticsStyle} from './Profits.style';
import {useLoaderMargin} from '../../utils/screenUtils';
import TipCard from '../../components/tipCard/TipCard';
import TopExpenseCard from '../../components/topExpenseCard/TopExpenseCard';

const Profits = () => {
  const {expenses} = useSelector(state => state.expenses);
  const {tips, loading: loadingTips} = useSelector(state => state.tips);
  const {currency, country, selectedMonth} = useSelector(state => state.user);

  const t = useTranslate();
  const dispatch = useDispatch();
  const loaderMargin = useLoaderMargin();

  useEffect(() => {
    const now = moment();
    const endMonth = formatDateToMonth(now);
    const startMonth = formatDateToMonth(getDateMinusTwoMonths(now));
    dispatch(loadExpenses(startMonth, endMonth));
  }, []);

  const topExpenses = useMemo(() => {
    if (isArrayEmpty(tips) && expenses.length > 2) {
      return getTop2ExpensesLast3Months(expenses);
    }
  }, [expenses, tips]);

  useEffect(() => {
    if (expenses.length > 1) dispatch(loadTips());
  }, [dispatch, expenses]);

  const getRecommendationForTopExpenses = async () => {
    if (!isEmpty(topExpenses)) {
      await Promise.all(
        topExpenses.map(
          ({expenseName, expenseTotal, expenseStart, expenseEnd}) =>
            dispatch(
              createTip({
                expenseName,
                expenseTotal,
                expenseStart,
                expenseEnd,
                currency,
                country,
              }),
            ),
        ),
      );
    }

    dispatch(loadTips());
  };

  const updateRecommendationForTopExpenses = async () => {
    dispatch(deleteTips());
    const updatedTopExpenses = getTop2ExpensesLast3Months(expenses);

    if (!isEmpty(updatedTopExpenses)) {
      await Promise.all(
        updatedTopExpenses.map(
          ({expenseName, expenseTotal, expenseStart, expenseEnd}) =>
            dispatch(
              createTip({
                expenseName,
                expenseTotal,
                expenseStart,
                expenseEnd,
                currency,
                country,
              }),
            ),
        ),
      );
    }

    dispatch(loadTips());
  };

  const periodLabel = getLastThreeMonths(selectedMonth);

  return (
    <ScrollView contentContainerStyle={statisticsStyle.container}>
      <Text style={statisticsStyle.sectionTitle}>
        {t('top_expenses_last_3_months')}
      </Text>
      <Text style={statisticsStyle.periodLabel}>{periodLabel}</Text>
      <>
        {loadingTips ? (
          <ActivityIndicator size={80} style={{marginTop: loaderMargin}} />
        ) : (
          <>
            {isArrayEmpty(topExpenses) && isArrayEmpty(tips) ? (
              <Text>{t('min_expenses_needed')}</Text>
            ) : (
              <>
                {!isArrayEmpty(topExpenses) && (
                  <>
                    {topExpenses?.map((topExpense, index) => (
                      <TopExpenseCard key={index} topExpense={topExpense} />
                    ))}

                    <TouchableOpacity onPress={getRecommendationForTopExpenses}>
                      <View style={statisticsStyle.ctaBtn}>
                        <Text style={statisticsStyle.ctaText}>
                          {t('get_recommendations_to_reduce_it')}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </>
                )}
                {/* Recommendations */}
                {!isArrayEmpty(tips) && (
                  <View style={statisticsStyle.tipsSection}>
                    <View style={statisticsStyle.tipsSection}>
                      <Text style={statisticsStyle.sectionTitle}>
                        {t('recommendations')}
                      </Text>
                      {tips.map(tip => (
                        <TipCard
                          key={tip._id}
                          tip={tip}
                          currency={currency}
                          t={t}
                        />
                      ))}
                    </View>
                    <TouchableOpacity
                      onPress={updateRecommendationForTopExpenses}>
                      <View style={statisticsStyle.ctaBtn}>
                        <Text style={statisticsStyle.ctaText}>
                          {t('update_recommendations_to_reduce_it')}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </>
            )}
          </>
        )}
      </>
    </ScrollView>
  );
};

export default Profits;
