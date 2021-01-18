import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const realWidth = height > width ? width : height;

export const normalize = size => Math.round((size * realWidth) / 375);

export const fontSizes = {
    h6: {
        fontSize: normalize(12)
    },
    h5: {
        fontSize: normalize(14)
    },
    h4: {
        fontSize: normalize(16)
    },
    mediumSize: {
        fontSize: normalize(18)
    },
    h3: {
        fontSize: normalize(22)
    },
    bigMediumSize: {
        fontSize: normalize(24)
    },
    h2: {
        fontSize: normalize(32)
    },
    h1: {
        fontSize: normalize(36)
    },
    biggestSize: {
        fontSize: normalize(48)
    }
};
