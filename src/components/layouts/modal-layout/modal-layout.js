import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  Keyboard
} from 'react-native';
import {connect} from 'react-redux';
import {Container} from './styles';
import {AssetSvg, Content, Text} from '../..';
import {BaseButtonView, BaseView} from '../../base';
import {STATUS_BAR_CONTENT} from '@/utils';
import {commonSelector} from 'stores/common/selectors';
import {IProps} from './type.d';
import {navigation} from '@/navigation';
import {SCREEN_HEIGHT} from '@/helpers/size';

const Layout = (props: IProps) => {
  const {children, theme, bottomAction, loadingProps} = props;

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {};
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle={STATUS_BAR_CONTENT[(theme?.mode)]}
        hidden={false}
        translucent={true}
        backgroundColor={theme?.secondaryBgColor}
      />
      <BaseView class="z-200">
        <BaseButtonView
          class="absolute top-20 lg:top-32 xl:top-35 right-0 py-22 pl-30 pr-20"
          with-hitSlop
          scale={1}
          onPress={() => navigation.goBack()}
        >
          <AssetSvg
            name={AssetSvg.icons.close2(theme.icons.eye.color)}
            width={23}
            height={23}
          />
        </BaseButtonView>
      </BaseView>

      <KeyboardAvoidingView
        style={{flex: 1, paddingTop: 30}}
        contentContainerStyle={{flex: 1}}
        behavior="height"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <BaseView class="mt-33 lg:mt-40 xl:mt-48 px-22">
            <Text class="h3 left" color={theme?.viewLabel?.primaryColor}>
              {props.title}
            </Text>
            <Text
              class="h4 left mt-5 px-1"
              color={theme?.viewLabel?.primaryColor}
            >
              {props['sub-title']}
            </Text>
            <Content
              loadingProps={{
                ...loadingProps,
                style: {height: SCREEN_HEIGHT / 2}
              }}
              theme={theme}
            >
              <BaseView class="mt-15 pb-20">{children}</BaseView>
            </Content>
          </BaseView>
        </ScrollView>
      </KeyboardAvoidingView>
      {!isKeyboardVisible && bottomAction}
    </Container>
  );
};

const mapStateToProps = state => commonSelector(state);

export const ModalLayout = connect(mapStateToProps)(Layout);
