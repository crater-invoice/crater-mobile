
import { ROUTES } from "../routes";
import { generateStackNavigation } from "../actions";
import LostConnectionContainer from "../../components/LostConnection";

export const MoreNavigator = {
    // Lost Connection
    // -----------------------------------------
    [ROUTES.LOST_CONNECTION]: generateStackNavigation(
        ROUTES.LOST_CONNECTION,
        LostConnectionContainer,
    ),
}
