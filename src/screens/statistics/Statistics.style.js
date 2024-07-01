import {getScreenHeight} from '../../utils/screenUtils';

const {StyleSheet} = require('react-native');

export const statisticsStyle = StyleSheet.create({
  container: {
    gap: 15,
    alignItems: 'center',
  },
  empty_data_msg: {
    marginTop: getScreenHeight() * 0.3,
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    padding: 20,
  },
});
