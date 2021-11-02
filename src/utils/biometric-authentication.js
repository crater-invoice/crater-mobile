import * as LocalAuthentication from 'expo-local-authentication';
import t from 'locales/use-translation';
import {alertMe, hasValue} from '@/constants';

const authenticationFail = () => {
  alertMe({
    title: 'Oops!',
    desc: t('validation.wrong')
  });
};

interface IProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  onFail?: () => void;
}
export const biometricAuthentication = async ({
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
    authenticationFail();
    onFail?.();
  }
};
