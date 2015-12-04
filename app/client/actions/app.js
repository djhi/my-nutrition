/* global ReactIntlLocaleData */
import {addLocaleData} from 'react-intl';
import actionTypeBuilder from './actionTypeBuilder';

export const SET_TITLE = actionTypeBuilder.type('SET_TITLE');
export const SWITCH_LOCALE = actionTypeBuilder.type('SWITCH_LOCALE');

export function setTitle(title) {
  return {
    type: SET_TITLE,
    title,
  };
}

export function switchLocale(locale) {
  return dispatch => {
    const indexOfHyphen = locale.indexOf('-');
    const language = indexOfHyphen > -1 ? locale.substr(0, locale.indexOf('-')) : locale;
    let messages;

    if (language !== 'en') {
      messages = require(`app/i18n/${language}`);
    }

    const reactLocaleData = require(`react-intl/lib/locale-data/${language}`);
    addLocaleData(reactLocaleData);

    // If we need the Intl polyfill, we also need the locale data for it
    if (!global.Intl) {
      require(`intl/locale-data/jsonp/${language}`);
    }

    return dispatch({
      type: SWITCH_LOCALE,
      locale,
      messages,
    });
  };
}
