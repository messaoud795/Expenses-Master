const {StyleSheet} = require('react-native');

export const pieChartStyle = StyleSheet.create({
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    position: 'relative',
  },
  chart: {
    marginLeft: 'auto',
  },
  total: {
    position: 'absolute',
    textAlign: 'center',
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
  },
});
