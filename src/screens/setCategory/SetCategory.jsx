import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addExpenseStyle} from '../addExpense/AddExpense.style';
import {generateUniqueId} from '../../utils/stringUtils';
import {editCategory} from '../../actions/categoriesActions';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {doesNewCategoryExists} from '../../utils/categoriesUtils';
import {useTranslate} from '../../utils/translationsUtils';

const SetCategory = ({navigation: {navigate}, route}) => {
  const navigation = useNavigation();
  const t = useTranslate();
  const selectedCategory = route?.params?.category;
  const expenseEditInProgress = route?.params?.expenseEditInProgress;
  let selectedExpense = route?.params?.selectedExpense;
  const isEditMode = Boolean(selectedCategory);
  const [newCategory, setNewCategory] = useState(selectedCategory?.name);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const createNewCategory = () => {
    if (newCategory.length < 2) return setError(t('name_input_error_msg'));
    if (doesNewCategoryExists(newCategory))
      return setError(t('category_already_exist'));

    setError('');
    const id = isEditMode ? selectedCategory.id : generateUniqueId();
    dispatch(editCategory({id, name: newCategory}, isEditMode));
    setNewCategory();
    //this bloc to handle adding new category from add or edit expense scree,
    if (expenseEditInProgress) {
      navigate(t('add_expense'), {newCategoryId: id, expense: selectedExpense});
      navigation.dispatch(
        CommonActions.reset({
          index: 0, // Index of the screen to navigate to (the initial screen)
          routes: [{name: t('settings')}], // Name of the initial screen
        }),
      );
    } else navigate(t('categories'));
  };

  const cancelNewCategory = () => {
    navigate(t('categories'));
  };

  return (
    <ScrollView style={addExpenseStyle.container}>
      <View style={addExpenseStyle.inputs_container}>
        <View style={addExpenseStyle.input_container}>
          <Text style={addExpenseStyle.label}>{t('category')}</Text>
          <TextInput
            style={addExpenseStyle.input}
            onChangeText={text => setNewCategory(text)}
            value={newCategory}
          />
          {error && <Text style={addExpenseStyle.error_msg}>{error}</Text>}
        </View>
      </View>

      <View style={addExpenseStyle.btns_container}>
        <TouchableOpacity
          onPress={cancelNewCategory}
          style={addExpenseStyle.cancel_btn}>
          <Text style={addExpenseStyle.btn_text}>{t('cancel')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={createNewCategory}
          style={addExpenseStyle.add_btn}>
          <Text style={addExpenseStyle.btn_text}>OK</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SetCategory;
