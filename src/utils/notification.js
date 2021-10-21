import {StyleSheet} from 'react-native';
import {showMessage} from '@/components';
import {colors} from '@/styles';
import {fontSizes, fonts} from '@/styles/fonts';
import {isAndroidPlatform, isIosPlatform} from '@/constants';

type MessageType =
  | 'none'
  | 'default'
  | 'info'
  | 'success'
  | 'danger'
  | 'warning'
  | 'error';

interface IProps {
  title?: string;
  message: string;
  type?: MessageType;
  duration?: number;
  icon?: MessageType;
}

export const showNotification = ({
  title = null,
  message = null,
  type: _type = 'success',
  duration = 2.5 * 1000,
  ...rest
}: IProps) => {
  if (!message) return;

  const getTitle = () => {
    if (title) return title;
    if (_type === 'success') return 'Success!';
    if (_type === 'error') return 'Error!';
  };

  const type = _type === 'error' ? 'danger' : _type;
  const icon = {icon: type, style: styles.icon};
  let additionalParams: any = {...styles.bgColor(_type)};

  showMessage({
    type,
    duration,
    icon,
    message: getTitle(),
    description: message,
    titleStyle: styles.title(_type),
    descriptionStyle: styles.message(_type),
    floating: true,
    style: styles.notification,
    ...additionalParams,
    ...rest
  });
};

const bgColor = {
  success: colors.success,
  error: colors.danger
};

const styles = StyleSheet.create({
  bgColor: type => ({
    backgroundColor: bgColor[type]
  }),
  notification: {
    ...(isAndroidPlatform && {
      marginTop: 30
    })
  },
  title: type => ({
    fontFamily: fonts.medium,
    fontSize: fontSizes.h5,
    textAlign: 'left',
    ...(isIosPlatform &&
      type === 'success' && {
        textShadowColor: colors.white,
        textShadowOffset: {width: 0.2, height: 0.2},
        textShadowRadius: 0.4
      })
  }),
  message: type => ({
    fontFamily: fonts.regular,
    fontSize: fontSizes.h5,
    textAlign: 'left',
    ...(isIosPlatform &&
      type === 'success' && {
        textShadowColor: colors.white,
        textShadowOffset: {width: 0.2, height: 0.2},
        textShadowRadius: 0.1
      })
  }),
  icon: {
    marginLeft: 0,
    marginRight: 12
  }
});
