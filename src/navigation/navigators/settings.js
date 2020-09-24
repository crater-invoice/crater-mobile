
import { ROUTES } from "../routes";
import SettingsContainer from "../../features/settings/containers/Settings";
import AccountContainer from "../../features/settings/containers/Account";
import CompanyContainer from "../../features/settings/containers/Company";
import LanguageAndCurrencyContainer from "../../features/settings/containers/LanguageAndCurrency";
import { generateStackNavigation } from "../actions";
import NotificationContainer from "../../features/settings/containers/Notification";
import PreferencesContainer from "../../features/settings/containers/Preferences";
import EndpointContainer from "../../features/authentication/containers/Endpoint";
import UpdateAppVersionContainer from "../../components/UpdateAppVersion";
import CustomizesContainer from "../../features/settings/containers/Customizes";
import CustomizeContainer from "../../features/settings/containers/Customize";

export const SettingNavigator = {

    // Settings
    // -----------------------------------------
    [ROUTES.SETTING_LIST]: generateStackNavigation(
        ROUTES.SETTING_LIST,
        SettingsContainer,
    ),
    [ROUTES.LANGUAGE_AND_CURRENCY]: generateStackNavigation(
        ROUTES.LANGUAGE_AND_CURRENCY,
        LanguageAndCurrencyContainer,
    ),
    [ROUTES.NOTIFICATIONS]: generateStackNavigation(
        ROUTES.NOTIFICATIONS,
        NotificationContainer,
    ),
    [ROUTES.PREFERENCES]: generateStackNavigation(
        ROUTES.PREFERENCES,
        PreferencesContainer,
    ),

    // User Information
    // -----------------------------------------
    [ROUTES.ACCOUNT_INFO]: generateStackNavigation(
        ROUTES.ACCOUNT_INFO,
        AccountContainer,
    ),
    [ROUTES.COMPANY_INFO]: generateStackNavigation(
        ROUTES.COMPANY_INFO,
        CompanyContainer,
    ),

    [ROUTES.ENDPOINTS_SETTINGS]: generateStackNavigation(
        ROUTES.ENDPOINTS_SETTINGS,
        EndpointContainer
    ),

    // Customize
    // -----------------------------------------
    [ROUTES.CUSTOMIZES]: generateStackNavigation(
        ROUTES.CUSTOMIZES,
        CustomizesContainer
    ),
    [ROUTES.CUSTOMIZE]: generateStackNavigation(
        ROUTES.CUSTOMIZE,
        CustomizeContainer
    ),

    // Update App Version
    // -----------------------------------------
    [ROUTES.UPDATE_APP_VERSION]: generateStackNavigation(
        ROUTES.UPDATE_APP_VERSION,
        UpdateAppVersionContainer,
    ),

}
