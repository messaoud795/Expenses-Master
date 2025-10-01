const {StyleSheet} = require('react-native');

export const statisticsStyle = StyleSheet.create({
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
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
  },
  tipDescription: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    color: '#2c3e50',
    lineHeight: 20,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipLabel: {
    fontSize: 13,
    marginLeft: 6,
    color: '#555',
  },
  expenseValue: {
    color: '#8e44ad',
    fontWeight: '600',
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
