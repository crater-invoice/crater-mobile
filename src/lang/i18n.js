import * as Localization from 'expo-localization';
import Lng from 'i18n-js';

import en from './en.json';
import fr from './fr.json';
import es from './es.json';
import de from './de.json';
import it from './it.json';

Lng.fallbacks = true;

Lng.translations = {
    en,
    fr,
    es,
    de,
    it
};

Lng.locale = Localization.locale;

export default Lng;
