import React, {useEffect, useMemo} from 'react';
import {ScrollView, TouchableOpacity, View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Text} from 'react-native';
import {useTranslate} from '../../utils/translationsUtils';
import {isArrayEmpty} from '../../utils/arrayUtils';
import {getTopExpenseLast3Months} from './Statistics.utils';
import {getTip, loadTips} from '../../actions/tipsActions';
import {isEmpty} from 'lodash';
import BalanceChart from '../../components/charts/balanceChart/BalanceChart';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Statistics = () => {
  const {expenses} = useSelector(state => state.expenses);
  const {tips} = useSelector(state => state.tips);
  const {currency, country} = useSelector(state => state.user);

  const t = useTranslate();
  const dispatch = useDispatch();
  const topExpense = useMemo(
    () => getTopExpenseLast3Months(expenses),
    [expenses],
  );

  const getRecommendationForTopExpense = () => {
    if (!isEmpty(topExpense))
      dispatch(
        getTip({expense: topExpense, currency, expenseDuration: 3, country}),
      );
  };

  useEffect(() => {
    dispatch(loadTips());
  }, [dispatch]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isArrayEmpty(expenses) ? (
        <Text style={styles.emptyMsg}>
          {t('no_expenses_found_msg_for_stats')}
        </Text>
      ) : (
        <>
          {/* Top Expense */}
          <Text style={styles.sectionTitle}>
            {t('top_expenses_last_3_months')}
          </Text>
          <View style={styles.expenseCard}>
            <FontAwesome5 name="wallet" size={20} color="#2c3e50" />
            <Text style={styles.expenseName}>{topExpense?.name}</Text>
          </View>

          {/* Get Recommendations Button */}
          <TouchableOpacity onPress={getRecommendationForTopExpense}>
            <View style={styles.ctaBtn}>
              <Text style={styles.ctaText}>
                {t('get_recommendations_to_reduce_it')}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Balance Chart */}
          <View style={styles.chartWrapper}>
            <BalanceChart />
          </View>

          {/* Recommendations */}
          {!isArrayEmpty(tips) && (
            <View style={styles.tipsSection}>
              <Text style={styles.sectionTitle}>{t('recommendations')}</Text>
              {tips.map(tip => (
                <View key={tip._id} style={styles.tipCard}>
                  <Text style={styles.tipDescription}>{tip.description}</Text>

                  <View style={styles.tipRow}>
                    <FontAwesome5 name="wallet" size={20} color="#2c3e50" />
                    <Text style={styles.tipLabel}>
                      {t('investment')}:
                      <Text style={styles.investmentValue}>
                        {' '}
                        {tip.investment} {currency}
                      </Text>
                    </Text>
                  </View>

                  <View style={styles.tipRow}>
                    <FontAwesome5 name="chart-line" size={16} color="#27ae60" />
                    <Text style={styles.tipLabel}>
                      {t('profit')}:
                      <Text style={styles.profitValue}>
                        {' '}
                        {tip.profit} {currency}
                      </Text>
                    </Text>
                  </View>

                  <View style={styles.tipRow}>
                    <FontAwesome5 name="clock" size={16} color="#2980b9" />
                    <Text style={styles.tipLabel}>
                      {t('time_to_profit')}:
                      <Text style={styles.durationValue}>
                        {' '}
                        {tip.timeToProfit} {t('months')}
                      </Text>
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  emptyMsg: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#7f8c8d',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#2c3e50',
  },
  expenseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  expenseName: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#34495e',
  },
  ctaBtn: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  ctaText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 15,
  },
  chartWrapper: {
    marginBottom: 20,
  },
  tipsSection: {
    marginTop: 10,
  },
  tipCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3,
  },
  tipDescription: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2c3e50',
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  tipLabel: {
    fontSize: 13,
    marginLeft: 6,
    color: '#555',
  },
  investmentValue: {
    color: '#e74c3c',
    fontWeight: '600',
  },
  profitValue: {
    color: '#27ae60',
    fontWeight: '600',
  },
  durationValue: {
    color: '#2980b9',
    fontWeight: '600',
  },
});

export default Statistics;
