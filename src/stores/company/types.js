import {ROUTES} from '@/navigation';
import {PercentageIcon} from '@/icons';
import {PermissionService} from '@/services';
import t from 'locales/use-translation';
import {isSuperAdmin} from '@/stores/common/helpers';

export const SPINNER = 'preferences/SPINNER';

export const PREFERENCES_FORM = 'preferences/PREFERENCES_FORM';

export const FETCH_PREFERENCES = 'preferences/FETCH_PREFERENCES';

export const FETCH_LANGUAGES = 'preferences/FETCH_LANGUAGES';
export const FETCH_LANGUAGES_SUCCESS = 'preferences/FETCH_LANGUAGES_SUCCESS';

export const FETCH_TIMEZONES = 'preferences/FETCH_TIMEZONES';
export const FETCH_TIMEZONES_SUCCESS = 'preferences/FETCH_TIMEZONES_SUCCESS';

export const FETCH_DATE_FORMATS = 'preferences/FETCH_DATE_FORMATS';
export const FETCH_DATE_FORMATS_SUCCESS =
  'preferences/FETCH_DATE_FORMATS_SUCCESS';

export const FETCH_FISCAL_YEARS = 'preferences/FETCH_FISCAL_YEARS';
export const FETCH_FISCAL_YEARS_SUCCESS =
  'preferences/FETCH_FISCAL_YEARS_SUCCESS';

export const FETCH_RETROSPECTIVES = 'preferences/FETCH_RETROSPECTIVES';
export const FETCH_RETROSPECTIVES_SUCCESS =
  'preferences/FETCH_RETROSPECTIVES_SUCCESS';

export const UPDATE_PREFERENCES = 'preferences/UPDATE_PREFERENCES';
export const UPDATE_PREFERENCES_SUCCESS =
  'preferences/UPDATE_PREFERENCES_SUCCESS';

export const SET_PREFERENCES = 'preferences/SET_PREFERENCES';
export const CLEAR_PREFERENCES = 'preferences/CLEAR_PREFERENCES';

export const PREFERENCES_SETTING_TYPE = [
  'currency',
  'time_zone',
  'language',
  'fiscal_year',
  'carbon_date_format',
  'moment_date_format',
  'discount_per_item',
  'tax_per_item',
  'retrospective_edits'
];
