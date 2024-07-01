import {StyleSheet} from 'react-native';
import {getScreenHeight} from '../../utils/screenUtils';

export const expensesStyle = StyleSheet.create({
  container: {
    padding: 20,
    gap: 15,
  },
  empty_expenses_msg_container: {
    alignItems: 'center',
    marginTop: getScreenHeight() * 0.3,
  },
  empty_expenses_msg: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  list: {gap: 15},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13,
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#1D5D9B',
    letterSpacing: 0.8,
  },
  total: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  expenses: {
    gap: 10,
  },
  expense: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 3,
    gap: 5,
  },
  expense_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expense_name: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
    color: '#000',
  },
  expense_amount: {
    fontSize: 14,
    fontWeight: '600',
    color: 'gray',
  },
});
