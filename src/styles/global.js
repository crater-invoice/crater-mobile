import { isIPhoneX } from '@/constants';
import { fonts } from './fonts';

export const headerTitle = ({ marginLeft = -7, marginRight = -12 }) => {
    return {
        marginLeft: isIPhoneX() ? 0 : marginLeft,
        marginRight: isIPhoneX() ? 0 : marginRight,
        textAlign: "center",
        fontFamily: fonts.poppins,
    }
}
