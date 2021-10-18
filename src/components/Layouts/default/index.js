import React from 'react';
import {KeyboardAvoidingView, ScrollView, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {styles, Container} from './styles';
import {CtHeader, View} from '../..';
import {Content} from '../../Content';
import Dropdown from '../../Dropdown';
import {ARROW_ICON} from '@/assets';
import {definePlatformParam} from '@/constants';
import {STATUS_BAR_CONTENT} from '@/utils';
import {commonSelector} from 'stores/common/selectors';

type IProps = {
  children?: Object,
  headerProps?: Object,
  hasRightButton?: Boolean,
  rightIcon?: String,
  bottomAction?: any,
  loadingProps?: Object,
  dropdownProps?: Object,
  contentProps?: any,
  hideScrollView?: boolean,
  keyboardProps?: any
};

const Layout = (props: IProps) => {
  const {
    children,
    headerProps,
    rightIcon,
    bottomAction,
    loadingProps,
    dropdownProps,
    hideScrollView = false,
    contentProps,
    keyboardProps,
    theme
  } = props;
  const keyboardVerticalOffset = definePlatformParam(60, 0);
  let bodyStyle = {};

  if (props?.bodyStyle) {
    for (const property of props?.bodyStyle.split(' ')) {
      bodyStyle = {...bodyStyle, [property]: true};
    }
  } else {
    bodyStyle = {'px-22': true, 'pt-10': true, 'pb-15': true};
  }

  return (
    <Container>
      <StatusBar
        barStyle={STATUS_BAR_CONTENT[(theme?.mode)]}
        hidden={false}
        translucent={true}
        backgroundColor={theme?.secondaryBgColor}
      />

      <CtHeader
        titleStyle={{
          ...styles.headerTitleStyle(theme),
          ...headerProps?.withTitleStyle
        }}
        placement="center"
        leftIcon={ARROW_ICON}
        rightIcon={rightIcon}
        theme={theme}
        containerStyle={styles.header}
        {...headerProps}
        rightComponent={
          dropdownProps && <Dropdown {...dropdownProps} theme={theme} />
        }
      />

      <Content {...contentProps} loadingProps={loadingProps} theme={theme}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          contentContainerStyle={{flex: 1}}
          keyboardVerticalOffset={keyboardVerticalOffset}
          behavior="height"
          {...keyboardProps}
        >
          {hideScrollView ? (
            children
          ) : (
            <ScrollView keyboardShouldPersistTaps="handled">
              <View {...bodyStyle}>{children}</View>
            </ScrollView>
          )}
        </KeyboardAvoidingView>
      </Content>

      {bottomAction}
    </Container>
  );
};

const mapStateToProps = state => ({
  ...commonSelector(state)
});

export const DefaultLayout = connect(mapStateToProps)(Layout);
