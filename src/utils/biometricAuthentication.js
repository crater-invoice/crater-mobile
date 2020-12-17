import * as LocalAuthentication from 'expo-local-authentication';
import Lng from '@/lang/i18n';
import { alertMe, hasValue } from '@/constants';

const authenticationFail = locale => {
    alertMe({
        title: 'Oops!',
        desc: Lng.t('validation.wrong', { locale })
    });
};

interface IProps {
    locale: String;
    onSuccess?: Function;
    onCancel?: Function;
    onFail?: Function;
}
export const biometricAuthentication = async ({
    locale,
    onSuccess,
    onCancel,
    onFail
}: IProps) => {
    try {
        const result: any = await LocalAuthentication.authenticateAsync({});

        if (result?.success) {
            onSuccess?.();
            return;
        }

        if (hasValue(result?.error) && result?.error.includes('user_cancel')) {
            onCancel?.();
            return;
        }

        onFail?.();
    } catch (e) {
        authenticationFail(locale);
        onFail?.();
    }
};
