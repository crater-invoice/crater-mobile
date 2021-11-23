import * as Localization from 'expo-localization';
import Lng from 'i18n-js';

import en from './en.json';
import fr from './fr.json';
import es from './es.json';
import de from './de.json';
import it from './it.json';
import ar from './ar.json';
import sk from './sk.json';
import ko from './ko.json';
import lv from './lv.json';

Lng.fallbacks = true;

Lng.translations = {
  en, // English
  fr, // French
  es, // Spanish
  de, // German
  it, // Italian
  ar, // Arabic
  sk, //  Slovak,
  ko, //  Korean,
  lv // Latvian
};

Lng.locale = Localization.locale;

class Translation {
  locale: string;

  constructor() {
    this.locale = 'en';
  }

  setLocale = locale => {
    if (this.locale === locale) {
      return;
    }

    this.locale = locale;
  };

  t = (title: string, options = {}) => {
    return Lng.t(title, {locale: this.locale, ...options});
  };
}

export const TranslationService = new Translation();
export default TranslationService.t;
