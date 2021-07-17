import Lng from '@/lang/i18n';

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
