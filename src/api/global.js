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

export const MAX_LENGTH = 255

// Alert 
// -----------------------------------------
export const alertMe = ({
    title = '',
    desc = '',
    okPress = null,
    showCancel = false
}) => {

    const cancel = showCancel ? {
        text: 'Cancel',
        onPress: () => { },
        style: 'cancel',
    } : {}

    Alert.alert(
        title,
        desc,
        [
            {
                text: 'OK',
                onPress: okPress ? okPress : () => { },
                style: 'cancel',
            },
            cancel
        ],
        { cancelable: false }
    );
}
