import ApplicationNavigator from "../navigators";
import { ROUTES } from "../routes";

const navigationData = (state, action) => {
    const nextState = ApplicationNavigator.router.getStateForAction(
        action,
        state
    );

    return nextState || state;
};

export default navigationData;


