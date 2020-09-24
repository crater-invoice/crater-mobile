import queryString from 'query-string';
import { ROUTES } from "../../navigation/routes";

// Forms
// -----------------------------------------
export const SET_ENDPOINT_API = 'moreForm/SET_ENDPOINT_API';

// Actions
// -----------------------------------------
export const MORE_SEARCH = 'more/MORE_SEARCH';
export const MORE_TRIGGER_SPINNER = 'more/MORE_TRIGGER_SPINNER';
export const LOGOUT = 'more/LOGOUT';

// Menus
// -----------------------------------------
export const MORE_MENU = (language, Lng) => {
    return [
        {
            title: Lng.t("more.estimate", { locale: language }),
            leftIcon: 'file-alt',
            iconSize: 28,
            fullItem: {
                route: ROUTES.ESTIMATE_LIST
            }
        },
        {
            title: Lng.t("more.items", { locale: language }),
            leftIcon: 'product-hunt',
            iconSize: 27,
            fullItem: {
                route: ROUTES.GLOBAL_ITEMS
            }
        },
        {
            title: Lng.t("more.reports", { locale: language }),
            leftIcon: 'signal',
            fullItem: {
                route: ROUTES.REPORTS
            }
        },
        {
            title: Lng.t("more.settings", { locale: language }),
            leftIcon: 'cogs',
            fullItem: {
                route: ROUTES.SETTING_LIST
            }
        },
        {
            title: Lng.t("more.logout", { locale: language }),
            leftIcon: 'sign-out-alt',
            iconSize: 26,
            fullItem: {
                action: 'onLogout'
            }
        },
    ]
}
