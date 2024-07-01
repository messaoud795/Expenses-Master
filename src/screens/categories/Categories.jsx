import React from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {categoriesStyle} from './Categories.style';
import {alertModal} from '../../utils/screenUtils';
import {removeCategory} from '../../actions/categoriesActions';
import {useTranslate} from '../../utils/translationsUtils';

const Categories = ({navigation: {navigate}}) => {
  const {categories} = useSelector(state => state.categories);
  const t = useTranslate();
  const dispatch = useDispatch();

  const deleteCategory = category => {
    const modalText = `${t(
      'category_delete_warnung',
    )} ${category.name.toUpperCase()}`;
    alertModal(t('category_delete_modal_title'), modalText, () =>
      dispatch(removeCategory(category)),
    );
  };

  return (
    <View style={categoriesStyle.container}>
      <TouchableOpacity
        style={categoriesStyle.header}
        onPress={() => navigate(t('set_category'))}>
        <EntypoIcon name="add-to-list" size={28} color={'#000'} />
      </TouchableOpacity>
      <FlatList
        contentContainerStyle={categoriesStyle.categories_container}
        data={categories}
        renderItem={({item}) => (
          <TouchableOpacity key={item.id} style={categoriesStyle.category}>
            <Text style={categoriesStyle.name}>{item.name}</Text>
            <View style={categoriesStyle.icons_container}>
              <TouchableOpacity
                onPress={() => navigate(t('set_category'), {category: item})}>
                <EntypoIcon name="edit" size={28} color={'#46AA2B'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteCategory(item)}>
                <MaterialIcon name="delete" size={28} color={'#F70000'} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Categories;
