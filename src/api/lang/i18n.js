import * as Localization from 'expo-localization';
import Lng from 'i18n-js';

import en from './en.json';
import fr from './fr.json';
import es from './es.json';

Lng.fallbacks = true;

Lng.translations = {
    en,
    fr,
    es
};

Lng.locale = Localization.locale;

export default Lng;
