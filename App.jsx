import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Dashboard from './src/screens/dashboard/Dashboard';
import {View, StatusBar} from 'react-native';
import Settings from './src/screens/settings/Settings';
import Statistics from './src/screens/statistics/Statistics';
import AddExpense from './src/screens/addExpense/AddExpense';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Expenses from './src/screens/expenses/Expenses';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddUserName from './src/screens/addUserName/AddUserName';
import Categories from './src/screens/categories/Categories';
import SetCurrency from './src/screens/setCurrency/SetCurrency';
import SetCategory from './src/screens/setCategory/SetCategory';
import Budget from './src/screens/budget/Budget';
import Goal from './src/screens/goal/Goal';
import MonthSelector from './src/components/monthSelector/MonthSelector';
import Languages from './src/screens/languages/Languages';
import {useTranslate} from './src/utils/translationsUtils';
import {arePropsEqual} from './src/utils/screenUtils';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUserSavedData} from './src/actions/userActions';
import {loadExpenses} from './src/actions/expensesActions';
import {loadCategories} from './src/actions/categoriesActions';
import {screenHeaderStyle, appStyle} from './App.style';

function App() {
  const {language} = useSelector(state => state.user);
  const t = useTranslate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserSavedData());
    dispatch(loadExpenses());
    dispatch(loadCategories(language));
  }, []);

  const BottomTabs = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const DashboardStack = () => (
    <Stack.Navigator screenOptions={screenHeaderStyle}>
      <Stack.Screen
        name={t('dashboard')}
        component={Dashboard}
        options={{
          headerRight: () => <MonthSelector />,
        }}
      />
      <Stack.Screen name={t('budget')} component={Budget} />
      <Stack.Screen name={t('goal')} component={Goal} />
    </Stack.Navigator>
  );

  const CategoryStack = () => (
    <Stack.Navigator screenOptions={screenHeaderStyle}>
      <Stack.Screen name={t('categories')} component={Categories} />
      <Stack.Screen name={t('set_category')} component={SetCategory} />
    </Stack.Navigator>
  );

  const SettingsStack = () => (
    <Stack.Navigator screenOptions={screenHeaderStyle}>
      <Stack.Screen
        name={t('settings')}
        component={Settings}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen name={t('user_name')} component={AddUserName} />
      <Stack.Screen
        name="Categories Stack"
        component={CategoryStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name={t('currency')} component={SetCurrency} />
      <Stack.Screen name={t('languages')} component={Languages} />
    </Stack.Navigator>
  );

  return (
    <>
      <StatusBar style="light" hidden={false} />
      <NavigationContainer>
        <BottomTabs.Navigator
          screenOptions={{
            ...screenHeaderStyle,
            paddingHorizontal: 10,
            tabBarStyle: appStyle.tabBar,
          }}>
          <BottomTabs.Screen
            name="DashboardStack"
            component={DashboardStack}
            options={({navigation}) => ({
              title: t('dashboard'),
              tabBarLabel: t('dashboard'),
              headerShown: false,
              tabBarIcon: () => (
                <FontAwesomeIcon
                  name="dashboard"
                  size={30}
                  color={navigation.isFocused() ? '#000' : '#fff'}
                />
              ),
            })}
          />
          <BottomTabs.Screen
            name={t('expenses')}
            component={Expenses}
            options={({navigation}) => ({
              title: t('expenses'),
              tabBarLabel: t('expenses'),
              headerRight: () => (
                <View style={{paddingRight: 15}}>
                  <MonthSelector />
                </View>
              ),
              tabBarIcon: () => (
                <FontAwesomeIcon
                  name="list-ul"
                  size={30}
                  color={navigation.isFocused() ? '#000' : '#fff'}
                />
              ),
            })}
          />
          <BottomTabs.Screen
            name={t('add_expense')}
            component={AddExpense}
            options={({route}) => ({
              tabBarLabelStyle: {color: 'transparent'},
              title: route?.params?.expense
                ? t('edit_expense')
                : t('add_new_expense'),
              tabBarIcon: () => (
                <View style={appStyle.addBtn}>
                  <FontAwesomeIcon name="plus" size={35} color={'#fff'} />
                </View>
              ),
            })}
          />
          <BottomTabs.Screen
            name={t('statistics')}
            component={Statistics}
            options={({navigation}) => ({
              title: t('statistics'),
              tabBarLabel: t('statistics'),
              tabBarIcon: () => (
                <MaterialCommunityIcon
                  name="google-analytics"
                  size={30}
                  color={navigation.isFocused() ? '#000' : '#fff'}
                />
              ),
            })}
          />
          <BottomTabs.Screen
            name="Settings Stack"
            component={SettingsStack}
            options={({navigation}) => ({
              title: t('settings'),
              tabBarLabel: t('settings'),
              headerShown: false,
              tabBarIcon: () => (
                <Ionicon
                  name="settings"
                  size={35}
                  color={navigation.isFocused() ? '#000' : 'white'}
                />
              ),
            })}
          />
        </BottomTabs.Navigator>
      </NavigationContainer>
    </>
  );
}

export default React.memo(App, arePropsEqual);
