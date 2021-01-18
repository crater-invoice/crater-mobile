import { fonts } from '~/styles';
import { fontSizes } from '../utils/sizes';

export function getLineHeight(size) {
    return Number(size) * 1.2 + 2;
}

export const headers = {
    h1: {
        fontSize: fontSizes.h1.fontSize,
        lineHeight: getLineHeight(fontSizes.h1.fontSize),
        fontFamily: fonts.catamaranBold,
    },
    h2: {
        fontSize: fontSizes.h2.fontSize,
        lineHeight: getLineHeight(fontSizes.h2.fontSize),
        fontFamily: fonts.catamaranBold,
    },
    h3: {
        fontSize: fontSizes.h3.fontSize,
        lineHeight: getLineHeight(fontSizes.h3.fontSize),
        fontFamily: fonts.catamaranBold,
    },
    h4: {
        fontSize: fontSizes.h4.fontSize,
        lineHeight: getLineHeight(fontSizes.h4.fontSize),
        fontFamily: fonts.catamaranBold,
    },
    h5: {
        fontSize: fontSizes.h5.fontSize,
        lineHeight: getLineHeight(fontSizes.h5.fontSize),
        fontFamily: fonts.catamaranBold,
    },
    h6: {
        fontSize: fontSizes.h6.fontSize,
        lineHeight: getLineHeight(fontSizes.h6.fontSize),
        fontFamily: fonts.catamaranBold,
    },
};
