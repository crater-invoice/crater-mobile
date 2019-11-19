
import { ROUTES } from "../routes";
import { generateStackNavigation } from "../actions";
import ItemsContainer from "../../features/more/containers/Items";
import ItemContainer from "../../features/more/containers/Item";
import ReportsContainer from "../../features/more/containers/Reports";
import ReportContainer from "../../features/more/containers/Report";
import LostConnectionContainer from "../../components/LostConnection";

export const MoreNavigator = {

    // Items
    // -----------------------------------------
    [ROUTES.GLOBAL_ITEMS]: generateStackNavigation(
        ROUTES.GLOBAL_ITEMS,
        ItemsContainer,
    ),

    [ROUTES.GLOBAL_ITEM]: generateStackNavigation(
        ROUTES.GLOBAL_ITEM,
        ItemContainer,
    ),

    // Reports
    // -----------------------------------------
    [ROUTES.REPORTS]: generateStackNavigation(
        ROUTES.REPORTS,
        ReportsContainer,
    ),

    [ROUTES.GENERATE_REPORT]: generateStackNavigation(
        ROUTES.GENERATE_REPORT,
        ReportContainer,
    ),

    // Lost Connection
    // -----------------------------------------
    [ROUTES.LOST_CONNECTION]: generateStackNavigation(
        ROUTES.LOST_CONNECTION,
        LostConnectionContainer,
    ),
}
