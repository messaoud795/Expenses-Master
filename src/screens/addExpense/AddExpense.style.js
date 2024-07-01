const {StyleSheet} = require('react-native');

export const addExpenseStyle = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  title: {
    color: '#2C3333',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#bdc3c7',
    color: '#000',
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#bdc3c7',
  },
  label: {
    color: '#000',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  input_container: {
    gap: 8,
  },
  error_msg: {color: '#F74158'},
  inputs_container: {
    gap: 15,
  },
  btns_container: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 30,
  },
  add_btn: {
    backgroundColor: '#3AD701',
    borderRadius: 60,
    paddingHorizontal: 15,
    paddingVertical: 13,
    alignItems: 'center',
    flex: 2,
  },
  cancel_btn: {
    backgroundColor: '#A1CCD1',
    borderRadius: 60,
    paddingHorizontal: 15,
    paddingVertical: 13,
    alignItems: 'center',
    flex: 1,
  },
  delete_btn: {
    backgroundColor: '#F74158',
    borderRadius: 60,
    paddingHorizontal: 15,
    paddingVertical: 13,
    alignItems: 'center',
    flex: 1,
  },
  btn_text: {
    color: '#fff',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  date_container: {
    flexDirection: 'row',
    gap: 20,
  },
});
