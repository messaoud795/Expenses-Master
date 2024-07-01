const {StyleSheet} = require('react-native');

export const categoriesStyle = StyleSheet.create({
  container: {gap: 15, flex: 1},
  header: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  categories_container: {
    gap: 15,
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  category: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    backgroundColor: '#fff',
  },
  icons_container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    color: '#000',
    textTransform: 'capitalize',
    fontWeight: '500',
    fontSize: 16,
  },
});
