const {StyleSheet} = require('react-native');

export const kpiStyle = StyleSheet.create({
  kpiContainer: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 200,
    gap: 5,
    elevation: 5,
    opacity: 0.9,
    width: '48%',
    minWidth: 160,
  },
  clickable_container: {
    alignItems: 'center',
    gap: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  value: {
    color: '#000',
    fontWeight: '600',
    textAlign: 'center',
  },
});
