
import { ROUTES } from "../routes";
import { generateStackNavigation } from "../actions";
import CategoriesContainer from "../../features/categories/containers/Categories";
import CategoryContainer from "../../features/categories/containers/Category";

export const CategoryNavigator = {
    // Categories
    // -----------------------------------------
    [ROUTES.CATEGORIES]: generateStackNavigation(
        ROUTES.CATEGORIES,
        CategoriesContainer,
    ),
    [ROUTES.CATEGORY]: generateStackNavigation(
        ROUTES.CATEGORY,
        CategoryContainer,
    ),
}
