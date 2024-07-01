import {StyleSheet} from 'react-native';

export const appStyle = StyleSheet.create({
  addBtn: {
    position: 'absolute',
    flex: 1,
    width: 65,
    height: 65,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    top: -40,
    left: 5,
    elevation: 5,
    backgroundColor: '#F9F54B',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tabBar: {
    backgroundColor: '#3F979B',
    height: 65,
    paddingVertical: 7,
  },
});

export const screenHeaderStyle = {
  headerStyle: {backgroundColor: '#3F979B'},
  tabBarInactiveTintColor: '#fff',
  tabBarActiveTintColor: '#000',
  headerTintColor: 'white',
};
