import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {Divider} from 'react-native-elements';
import {Text} from '../text';
import {colors} from '@/styles';
import {ITheme} from '@/interfaces';

export const BaseDivider = (props: IProps) => {
  const {title, dividerStyle, titleStyle, theme} = props;
  return title ? (
    <View style={styles.dividerContainer}>
      <Divider style={[styles.divider, dividerStyle]} />

      <View style={styles.titleContainer}>
        <Text darkGray style={titleStyle}>
          {title}
        </Text>
      </View>
    </View>
  ) : (
    <Divider style={[styles.withoutTitle(theme), dividerStyle]} />
  );
};

const styles = StyleSheet.create({
  dividerContainer: {
    marginVertical: 20,
    marginHorizontal: 12,
    position: 'relative'
  },
  divider: {
    backgroundColor: colors.darkGray,
    marginVertical: 15,
    height: 1
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    borderRadius: 10,
    height: 30,
    width: 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    left: '45%'
  },
  withoutTitle: theme => ({
    backgroundColor: theme?.divider?.primaryBgColor,
    borderColor: theme?.divider?.primaryBgColor,
    borderWidth: 0.7,
    marginBottom: 2
  })
});

interface IProps {
  /**
   * Title of divider view.
   */
  title?: string;

  /**
   * Styling for divider container.
   */
  dividerStyle?: StyleProp<ViewStyle> | any;

  /**
   * Styles for the container surrounding the title.
   */
  titleStyle?: StyleProp<TextStyle> | any;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme?: ITheme;
}
