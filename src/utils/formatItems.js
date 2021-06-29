import { isArray } from '@/constants';

// Format Currencies
// -----------------------------------------
export const formatCurrencies = currencies => {
    if (!isArray(currencies)) {
        return [];
    }

    return currencies.map(currency => {
        const { name, code, symbol } = currency;
        return {
            title: name,
            subtitle: { title: code },
            rightTitle: symbol || '-',
            fullItem: currency
        };
    });
};

// Format Countries
// -----------------------------------------
export const formatCountries = countries => {
    if (!isArray(countries)) {
        return [];
    }

    return countries.map(country => {
        const { name, code } = country;
        return {
            title: name,
            rightTitle: code,
            fullItem: country
        };
    });
};

// Format Select Picker Name Value
// -----------------------------------------
export const formatSelectPickerName = items => {
    if (!isArray(items)) {
        return [];
    }

    return items.map(item => {
        return {
            label: item?.name,
            value: item?.id
        };
    });
};

// Format List By Name Only
// -----------------------------------------
export const formatListByName = items => {
    if (!isArray(items)) {
        return [];
    }

    return items.map(item => {
        return {
            title: item?.name,
            fullItem: item
        };
    });
};

// Format TaxTypes
// -----------------------------------------
export const formatTaxTypes = taxes => {
    if (!isArray(taxes)) {
        return [];
    }

    return taxes.map(tax => {
        const { name, percent, description } = tax;

        return {
            title: name,
            subtitle: {
                title: description
            },
            rightTitle: `${percent} %`,
            fullItem: tax
        };
    });
};

// Format Categories
// -----------------------------------------
export const formatCategories = categories => {
    if (!isArray(categories)) {
        return [];
    }

    return categories.map(category => {
        const { name, description } = category;
        return {
            title: name || '',
            subtitle: {
                title: description
            },
            fullItem: category
        };
    });
};

// Format Notes
// -----------------------------------------
export const formatNotes = notes => {
    if (!isArray(notes)) {
        return [];
    }

    return notes.map(note => {
        const { name, type } = note;
        return {
            title: name,
            rightTitle: type,
            fullItem: note
        };
    });
};

// Format Notes Type
// -----------------------------------------
export const formatNotesType = notes => {
    if (!isArray(notes)) {
        return [];
    }

    return notes.map(note => {
        const { name } = note;
        return {
            title: name,
            fullItem: note
        };
    });
};

// Format Items
// -----------------------------------------
export const formatItems = (items, currency) => {
    if (!isArray(items)) {
        return [];
    }

    return items.map(item => {
        const { name, description, price, title } = item;
        return {
            title: title ?? name ?? '',
            subtitle: { title: description },
            amount: price,
            currency,
            fullItem: item
        };
    });
};

// Format Payment Methods
// -----------------------------------------
export const formatPaymentMethods = methods => {
    if (!isArray(methods)) {
        return [];
    }

    return methods.map(method => {
        return {
            title: method?.name || '',
            fullItem: method
        };
    });
};

// Format Item Units
// -----------------------------------------
export const formatItemUnits = units => {
    if (!isArray(units)) {
        return [];
    }

    return units.map(unit => {
        return {
            title: unit?.name || '',
            fullItem: unit
        };
    });
};
