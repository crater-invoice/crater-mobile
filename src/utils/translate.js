
// Get Value with translated

import Lng from "@/lang/i18n";
import { store } from "@/store";

// -----------------------------------------
export const getTitleByLanguage = (label, field = null) => {
    const reduxStore = store.getState();
    const { locale = 'en' } = reduxStore.global

    if (field) {
        return Lng.t(label, { locale, field })
    }
    return Lng.t(label, { locale, })
}
