import * as Localization from 'expo-localization';
import Lng from 'i18n-js';

import en from './en.json';
import fr from './fr.json';
import es from './es.json';
import de from './de.json';
import it from './it.json';
import ar from './ar.json';
import ar from './sk.json';

Lng.fallbacks = true;

Lng.translations = {
    en, // English
    fr, // French
    es, // Spanish
    de, // German
    it, // Italian
    ar, // Arabic
	sk //  Slovak
};

Lng.locale = Localization.locale;

export default Lng;
