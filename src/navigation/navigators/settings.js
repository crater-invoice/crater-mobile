import {routes} from '../routes';
import SettingsContainer from '../../features/settings/containers/Settings';
import AccountContainer from '../../features/settings/containers/Account';
import CompanyContainer from '../../features/settings/containers/Company';
import LanguageAndCurrencyContainer from '../../features/settings/containers/LanguageAndCurrency';
import {generateStackNavigation} from '../actions';
import NotificationContainer from '../../features/settings/containers/Notification';
import PreferencesContainer from '../../features/settings/containers/Preferences';
import CategoriesContainer from '../../features/settings/containers/Categories';
import CategoryContainer from '../../features/settings/containers/Category';
import TaxesContainer from '../../features/settings/containers/Taxes';
import TaxContainer from '../../features/settings/containers/Tax';
import EndpointContainer from '../../features/authentication/containers/Endpoint';
import UpdateAppVersionContainer from '../../components/UpdateAppVersion';
import CurrenciesContainer from '../../features/settings/containers/Currencies';
import CurrencyContainer from '../../features/settings/containers/Currency';
import CustomFieldsContainer from '../../features/settings/containers/CustomFields';
import CustomFieldContainer from '../../features/settings/containers/CustomField';
import NotesContainer from '@/features/settings/containers/Notes';
import NoteContainer from '@/features/settings/containers/Note';
import TouchOrFaceIdContainer from '@/features/settings/containers/Touch-Face-Id';

import {Roles, CreateRole} from 'screens/roles';
import {
  CustomizeList,
  CustomizeInvoice,
  CustomizeEstimate,
  CustomizePayment
} from 'screens/customize';
import {ItemUnits} from 'screens/item-units';
export const SettingNavigator = {
  // Settings
  // -----------------------------------------
  [routes.SETTING_LIST]: generateStackNavigation(
    routes.SETTING_LIST,
    SettingsContainer
  ),
  [routes.LANGUAGE_AND_CURRENCY]: generateStackNavigation(
    routes.LANGUAGE_AND_CURRENCY,
    LanguageAndCurrencyContainer
  ),
  [routes.NOTIFICATIONS]: generateStackNavigation(
    routes.NOTIFICATIONS,
    NotificationContainer
  ),
  [routes.PREFERENCES]: generateStackNavigation(
    routes.PREFERENCES,
    PreferencesContainer
  ),

  // User Information
  // -----------------------------------------
  [routes.ACCOUNT_INFO]: generateStackNavigation(
    routes.ACCOUNT_INFO,
    AccountContainer
  ),
  [routes.COMPANY_INFO]: generateStackNavigation(
    routes.COMPANY_INFO,
    CompanyContainer
  ),

  // Notes
  [routes.NOTES]: generateStackNavigation(routes.NOTES, NotesContainer),
  [routes.NOTE]: generateStackNavigation(routes.NOTE, NoteContainer),

  // Taxes
  // -----------------------------------------
  [routes.TAXES]: generateStackNavigation(routes.TAXES, TaxesContainer),
  [routes.TAXES]: generateStackNavigation(routes.TAXES, TaxesContainer),
  [routes.TAX]: generateStackNavigation(routes.TAX, TaxContainer),

  // Categories
  // -----------------------------------------
  [routes.CATEGORIES]: generateStackNavigation(
    routes.CATEGORIES,
    CategoriesContainer
  ),
  [routes.CATEGORY]: generateStackNavigation(
    routes.CATEGORY,
    CategoryContainer
  ),
  [routes.ENDPOINTS_SETTINGS]: generateStackNavigation(
    routes.ENDPOINTS_SETTINGS,
    EndpointContainer
  ),

  // Customize
  // -----------------------------------------
  [routes.CUSTOMIZE_LIST]: generateStackNavigation(
    routes.CUSTOMIZE_LIST,
    CustomizeList
  ),
  [routes.CUSTOMIZE_INVOICE]: generateStackNavigation(
    routes.CUSTOMIZE_INVOICE,
    CustomizeInvoice
  ),
  [routes.CUSTOMIZE_ESTIMATE]: generateStackNavigation(
    routes.CUSTOMIZE_ESTIMATE,
    CustomizeEstimate
  ),
  [routes.CUSTOMIZE_PAYMENT]: generateStackNavigation(
    routes.CUSTOMIZE_PAYMENT,
    CustomizePayment
  ),
  [routes.ITEM_UNITS]: generateStackNavigation(routes.ITEM_UNITS, ItemUnits),

  // Currencies
  // -----------------------------------------
  [routes.CURRENCIES]: generateStackNavigation(
    routes.CURRENCIES,
    CurrenciesContainer
  ),
  [routes.CURRENCY]: generateStackNavigation(
    routes.CURRENCY,
    CurrencyContainer
  ),

  // Custom Fields
  // -----------------------------------------
  [routes.CUSTOM_FIELDS]: generateStackNavigation(
    routes.CUSTOM_FIELDS,
    CustomFieldsContainer
  ),
  [routes.CUSTOMER_FIELD]: generateStackNavigation(
    routes.CUSTOMER_FIELD,
    CustomFieldContainer
  ),

  // Touch/Face ID
  // -----------------------------------------
  [routes.TOUCH_OR_FACE_ID]: generateStackNavigation(
    routes.TOUCH_OR_FACE_ID,
    TouchOrFaceIdContainer
  ),

  // Update App Version
  // -----------------------------------------
  [routes.UPDATE_APP_VERSION]: generateStackNavigation(
    routes.UPDATE_APP_VERSION,
    UpdateAppVersionContainer
  ),

  [routes.ROLES]: generateStackNavigation(routes.ROLES, Roles),
  [routes.CREATE_ROLE]: generateStackNavigation(routes.CREATE_ROLE, CreateRole)
};
