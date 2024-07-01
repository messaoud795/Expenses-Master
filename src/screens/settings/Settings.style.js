const {StyleSheet} = require('react-native');

export const settingsStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    gap: 15,
  },
  option: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  text: {
    color: '#000',
    fontSize: 20,
    textTransform: 'capitalize',
    fontWeight: '500',
    borderRadius: 8,
    letterSpacing: 0.5,
  },
});
