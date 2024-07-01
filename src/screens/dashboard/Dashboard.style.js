import {getScreenWidth} from '../../utils/screenUtils';
const {StyleSheet} = require('react-native');

export const dashboardStyle = StyleSheet.create({
  dashboard: {
    padding: 15,
    gap: 15,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcome_text: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  kpisSection: {
    backgroundColor: '#fff',
    padding: 10,
    display: 'flex',
    gap: 10,
    borderRadius: 8,
    elevation: 5,
  },
  kpisSectionTitle: {
    color: '#000',
    fontWeight: '600',
    fontSize: 18,
    letterSpacing: 0.8,
  },
  kpisContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 7,
  },
  empty_expenses_msg: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    width: getScreenWidth() * 0.8,
    marginTop: 40,
    textAlign: 'center',
  },
});
