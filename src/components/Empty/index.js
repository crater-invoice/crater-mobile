import React from 'react';
import {View} from 'react-native';
import {AssetImage} from '../AssetImage';
import {styles} from './styles';
import {CtButton} from '../Button';
import {BUTTON_TYPE, hasTextLength} from '@/constants';
import {Text} from '../Text';
import {PermissionService} from '@/services';

type IProps = {
  title: String,
  description: String,
  image: String,
  buttonTitle: String,
  buttonPress: Function,
  theme: any
};
export const Empty = ({
  title,
  description,
  image,
  buttonTitle,
  buttonPress,
  route,
  theme
}: IProps) => {
  let showButton = hasTextLength(buttonTitle);

  if (route && hasTextLength(buttonTitle)) {
    showButton = PermissionService.isAllowToCreate(route?.name);
  }

  return (
    <View style={styles.emptyContainer}>
      {image && (
        <AssetImage imageSource={image} imageStyle={styles.emptyImage} />
      )}

      <Text
        mediumSize
        bold2
        center
        font-weight-600
        numberOfLines={2}
        color={theme?.listItem?.fifth?.color}
        style={styles.emptyTitle}
      >
        {title && title}
      </Text>

      <Text
        center
        numberOfLines={2}
        color={theme?.text?.thirdColor}
        style={styles.emptyDescription}
        medium={theme?.mode === 'dark'}
      >
        {description && description}
      </Text>

      {showButton && (
        <CtButton
          onPress={buttonPress && buttonPress}
          btnTitle={buttonTitle}
          type={BUTTON_TYPE.OUTLINE}
          hasFocus={false}
          buttonContainerStyle={styles.emptyButton}
        />
      )}
    </View>
  );
};

export default Empty;
