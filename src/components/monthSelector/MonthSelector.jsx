import React, {useState, useCallback} from 'react';
import {monthSelectorStyle} from './MonthSelector.style';
// import moment from 'moment';
import {View, Text, TouchableOpacity} from 'react-native';
import MonthPicker from 'react-native-year-month-picker';
import {changeSelectedMonth} from '../../actions/userActions';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment/min/moment-with-locales';

const MonthSelector = () => {
  const [show, setShow] = useState(false);
  const {selectedMonth, language} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const showPicker = useCallback(value => {
    setShow(value);
  }, []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || selectedMonth;
      showPicker(false);
      dispatch(changeSelectedMonth(new Date(selectedDate)));
    },
    [selectedMonth, showPicker],
  );

  return (
    <View>
      <TouchableOpacity
        onPress={() => showPicker(true)}
        style={monthSelectorStyle.selectedMonthContainer}>
        <Text style={monthSelectorStyle.selectedMonthText}>
          {moment(selectedMonth).locale(language).format('MMMM YYYY')}
        </Text>
      </TouchableOpacity>
      {show && (
        <MonthPicker
          onChange={onValueChange}
          value={new Date(selectedMonth)}
          minimumDate={new Date(2000, 0)}
          maximumDate={new Date()}
          mode="full"
        />
      )}
    </View>
  );
};

export default MonthSelector;
