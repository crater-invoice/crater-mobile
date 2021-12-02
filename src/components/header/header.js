import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Header} from 'react-native-elements';
import {AssetIcon} from '../asset-icon';
import styles from './styles';
import {colors} from '@/styles';
import {Filter} from '../filter';
import {Text} from '../text';
import {PermissionService} from '@/services';
import {dismissKeyboard} from '@/helpers/keyboard';
import {IProps} from './type.d';

export const CtHeader = ({
  leftIcon,
  leftIconPress,
  title,
  rightIcon,
  rightIconPress,
  placement,
  transparent,
  rightIconHint,
  titleStyle,
  leftIconStyle,
  hasCircle,
  noBorder,
  rightIconProps,
  rightComponent,
  rightIconHintStyle,
  filterProps,
  titleOnPress,
  containerStyle,
  leftArrow,
  theme,
  route
}: IProps) => {
  const leftIconColor =
    leftArrow === 'secondary'
      ? theme?.icons?.primaryBgColor
      : leftArrow === 'primary' || transparent
      ? theme?.icons?.thirdColor
      : theme?.icons?.primaryBgColor;

  const hederTitle = {
    text: title,
    onPress: () => dismissKeyboard(),
    allowFontScaling: false,
    style: [
      {
        color: transparent ? colors.dark2 : colors.white
      },
      styles.title(theme),
      titleStyle
    ]
  };

  const displayTitle = () => {
    if (!titleOnPress) {
      return leftIcon && hederTitle;
    }

    return (
      <TouchableOpacity onPress={() => titleOnPress?.()}>
        <Text
          dark
          medium
          style={[
            {
              color: transparent ? theme?.icons?.thirdColor : colors.white
            },
            styles.title,
            titleStyle && titleStyle
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  const rightElement = () => {
    if (rightComponent) {
      return rightComponent;
    }

    let showHeaderRightElement = true;

    if (route && rightIcon && rightIcon === 'plus') {
      showHeaderRightElement = PermissionService.isAllowToCreate(route?.name);
    }

    const hitSlop = {
      top: 13,
      left: 13,
      bottom: 13,
      right: 13
    };

    const icon = rightIconPress && !rightIconHint && (
      <AssetIcon
        name={rightIcon}
        size={18}
        style={{
          color:
            transparent && hasCircle
              ? theme?.icons?.plus?.backgroundColor
              : theme?.icons?.primaryBgColor
        }}
        {...rightIconProps}
      />
    );

    const hint = rightIconHint && (
      <Text
        primary
        style={[styles.rightBtnTitle, rightIconHintStyle && rightIconHintStyle]}
      >
        {rightIconHint}
      </Text>
    );

    const button = (
      <TouchableOpacity
        onPress={rightIconPress && rightIconPress}
        hitSlop={hitSlop}
      >
        <View style={[styles.rightBtn, hasCircle && styles.hasCircle(theme)]}>
          {hint}
          {icon}
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={styles.rightContainer}>
        {filterProps && (
          <View style={styles.filterColumn}>
            <Filter {...filterProps} theme={theme} />
          </View>
        )}

        {showHeaderRightElement ? button : null}
      </View>
    );
  };

  return (
    <Header
      placement={placement}
      leftComponent={
        leftIcon ? (
          <TouchableOpacity
            onPress={leftIconPress}
            hitSlop={{
              top: 13,
              left: 13,
              bottom: 13,
              right: 13
            }}
          >
            <AssetIcon
              name={leftIcon}
              size={25}
              style={[
                {
                  paddingLeft: 10,
                  padding: 4,
                  color: leftIconColor
                },
                leftIconStyle && leftIconStyle
              ]}
            />
          </TouchableOpacity>
        ) : (
          hederTitle
        )
      }
      centerComponent={displayTitle()}
      rightComponent={rightElement()}
      containerStyle={[
        styles.containerStyle(theme),
        transparent && styles.transparent,
        noBorder && styles.borderBottom,
        containerStyle
      ]}
    />
  );
};
