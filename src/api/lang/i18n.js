import * as Localization from 'expo-localization';
import Lng from 'i18n-js';

import { en } from './en';
import { fr } from './fr';
import { es } from './es';

Lng.fallbacks = true;

Lng.translations = {
    en,
    fr,
    es
};

Lng.locale = Localization.locale;

export default Lng;
