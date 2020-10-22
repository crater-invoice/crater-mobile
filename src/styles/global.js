import { isIPhoneX, SCREEN_WIDTH } from '@/constants';
import { fonts } from './fonts';

export const headerTitle = ({ marginLeft = -7, marginRight = -12 }) => {
    return {
        marginLeft: isIPhoneX() ? 0 : marginLeft,
        marginRight: isIPhoneX() ? 0 : marginRight,
        textAlign: 'center',
        fontFamily: fonts.poppins
    };
};

export const itemsDescriptionStyle = (widthMinus = 43) => {
    return {
        width: SCREEN_WIDTH - widthMinus,
        textAlign: 'justify'
    };
};
