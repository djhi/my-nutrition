/* global ReactIntlLocaleData */
import {addLocaleData} from 'react-intl';

export const SET_TITLE = 'SET_TITLE';
export const SWITCH_LOCALE = 'SWITCH_LOCALE';

export function setTitle(title) {
  return {
    type: SET_TITLE,
    title,
  };
}

export function switchLocale(locale) {
  return dispatch => {
    const language = locale.substr(locale.indexOf('-') + 1);

    const messages = require(`app/i18n/${locale}`);
    const reactLocaleData = require(`react-intl/lib/locale-data/${language}`);
    addLocaleData(reactLocaleData);

    // If we need the Intl polyfill, we also need the locale data for it
    if (!global.Intl) {
      require(`intl/locale-data/jsonp/${locale}`);
    }

    return dispatch({
      type: SWITCH_LOCALE,
      locale,
      messages,
    });
  };
}
