
import { ROUTES } from "../routes";
import { generateStackNavigation } from "../actions";
import ItemsContainer from "../../features/items/containers/Items";
import ItemContainer from "../../features/items/containers/Item";

export const ItemNavigator = {

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
}
