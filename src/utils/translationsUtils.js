import {en} from '../screens/languages/locales/en';
import {fr} from '../screens/languages/locales/fr';
import {de} from '../screens/languages/locales/de';
import {es} from '../screens/languages/locales/es';
import {shallowEqual, useSelector} from 'react-redux';
import {isStringNotEmpty} from './stringUtils';
import {useCallback} from 'react';

//custom hook to translate text
const resources = {en, fr, es, de};

export function useTranslate() {
  const {language} = useSelector(state => state.user, shallowEqual);

  const t = useCallback(
    word => {
      try {
        const translatedWord = resources[language][word];
        return isStringNotEmpty(translatedWord) ? translatedWord : word;
      } catch (error) {
        return resources.en[word];
      }
    },
    [language],
  );

  return t;
}
