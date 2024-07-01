const {StyleSheet} = require('react-native');

export const monthSelectorStyle = StyleSheet.create({
  selectedMonthContainer: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 'auto',
    borderRadius: 20,
    backgroundColor: '#fff',
    elevation: 4,
  },
  selectedMonthText: {
    color: '#000',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
