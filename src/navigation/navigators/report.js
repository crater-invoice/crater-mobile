
import { ROUTES } from "../routes";
import { generateStackNavigation } from "../actions";
import ReportsContainer from "../../features/reports/containers/Reports";
import ReportContainer from "../../features/reports/containers/Report";

export const ReportNavigator = {
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
}
