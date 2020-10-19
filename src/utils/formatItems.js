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
