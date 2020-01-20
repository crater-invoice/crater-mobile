import * as Font from 'expo-font';
import { Alert } from 'react-native';
import Poppins from '../assets/fonts/Poppins-Regular.ttf';
import PoppinsLight from '../assets/fonts/Poppins-Light.ttf';
import PoppinsMedium from '../assets/fonts/Poppins-Medium.ttf';
import PoppinsSemiBold from '../assets/fonts/Poppins-SemiBold.ttf';
import PoppinsBold from '../assets/fonts/Poppins-Bold.ttf';

export const loadFonts = async ({ afterLoad }) => {
    await Font.loadAsync({
        Poppins: Poppins,
        'Poppins-light': PoppinsLight,
        'Poppins-medium': PoppinsMedium,
        'Poppins-semi-bold': PoppinsSemiBold,
        'Poppins-bold': PoppinsBold,
    });

    afterLoad && afterLoad();
};


// Format TaxTypes 
// -----------------------------------------
export const formatTaxTypes = (taxes) => {
    let taxTypeList = []

    if (typeof taxes !== 'undefined' && taxes.length != 0) {
        taxTypeList = taxes.map((tax) => {

            const { name, percent, description } = tax

            return {
                title: name,
                subtitle: {
                    title: description,
                },
                rightTitle: `${percent} %`,
                fullItem: tax
            }

        })
    }
    return taxTypeList
}

// Format Countries 
// -----------------------------------------
export const formatCountries = (countries) => {

    let countriesList = []
    if (typeof countries !== 'undefined') {
        countriesList = countries.map((country) => {
            const { name, code } = country
            return {
                title: name,
                rightTitle: code,
                fullItem: country
            }
        })
    }
    return countriesList
}

// Format Select Picker Name Value 
// -----------------------------------------
export const formatSelectPickerName = (items) => {
    let itemList = []
    items && hasValue(items) && hasLength(items) && (
        itemList = items.map((item) => {
            return {
                label: item.name,
                value: item.id
            }
        }))

    return itemList
}

// Format List By Name Only
// -----------------------------------------
export const formatListByName = (items) => {
    let itemList = []
    if (items && typeof items !== 'undefined' && items.length != 0) {
        itemList = items.map((item) => {
            return {
                title: item.name,
                fullItem: item
            }
        })
    }
    return itemList
}

// Format Currencies
// -----------------------------------------
export const formatCurrencies = (currencies) => {
    let currencyList = []
    if (typeof currencies !== 'undefined' && currencies.length != 0) {
        currencyList = currencies.map((currency) => {

            const { name, code, symbol } = currency
            return {
                title: name,
                subtitle: {
                    title: code,
                },
                rightTitle: symbol || '-',
                fullItem: currency
            }
        })
    }
    return currencyList
}

export const MAX_LENGTH = 255

// Alert 
// -----------------------------------------
export const alertMe = ({
    title = '',
    desc = '',
    okText = 'OK',
    okPress = null,
    showCancel = false,
    cancelText = 'Cancel',
    cancelPress = null,
}) => {

    const cancel = showCancel ? {
        text: cancelText,
        onPress: cancelPress ? cancelPress : () => { },
        style: 'cancel',
    } : {}

    Alert.alert(
        title,
        desc,
        [
            {
                text: okText,
                onPress: okPress ? okPress : () => { },
                style: 'cancel',
            },
            cancel
        ],
        { cancelable: true },
    );
}

// Keyboard Type
// -----------------------------------------
export const KEYBOARD_TYPE = {
    DEFAULT: "default",
    NUMERIC: "numeric",
    EMAIL: "email-address",
    PHONE: "phone-pad",
    URL: "url",
}

// Field Is Fillable ?
// -----------------------------------------
export const hasValue = (field) => {
    return field !== null && typeof field !== "undefined"
}

export const hasLength = (field) => {
    return field && field.length !== 0
}

export const hasObjectLength = (field) => {
    return field && Object.keys(field).length !== 0
}

export const isBooleanTrue = (field) => {
    return Boolean(field)
}