import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {defineLargeSizeParam, SCREEN_WIDTH} from '@/helpers/size';
import {colors, fonts} from '@/styles';

const customStyleSheet = StyleSheet.create({
  toggleBiometryContainer: theme => ({
    backgroundColor: theme.secondaryBgColor,
    width: SCREEN_WIDTH,
    paddingVertical: 10,
    paddingHorizontal: 20
  }),
  toggleBiometryDescription: {
    paddingHorizontal: 20,
    fontSize: 13
  }
});

const Styles = {
  ScanContainer: styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding-horizontal: 10;
    margin-top: ${defineLargeSizeParam(-70, 0)};
  `,

  Center: styled(View)`
    justify-content: center;
    align-items: center;
  `,

  HeadingView: styled(View)`
    margin-bottom: 20;
  `,

  Title: styled(Text)`
    font-size: 22;
    font-family: ${fonts.medium};
    text-align: center;
    color: ${props => props.theme.viewLabel.fifthColor};
  `,

  SubTitle: styled(Text)`
    font-size: 17;
    font-family: ${fonts.regular};
    text-align: center;
    margin-top: 15;
    text-align: center;
    color: ${props => props.theme.viewLabel.fifthColor};
  `,

  SubTitle2: styled(Text)`
    font-size: 17;
    font-family: ${fonts.regular};
    text-align: center;
    color: ${props => props.theme.viewLabel.fifthColor};
  `,

  ScanIconView: styled(View)`
    margin-top: 10;
    margin-bottom: 70;
  `,

  AnimatedCircle: styled(View)`
    position: absolute;
    top: 1;
  `,

  ScanNowButton: styled(TouchableOpacity)`
    border-width: 1;
    border-radius: 100;
    padding-horizontal: 11;
    padding-vertical: 11;
    border-color: ${colors.gray};
  `,

  Circle: styled(View)`
    border-width: 1;
    border-radius: 100;
    padding-horizontal: 15;
    padding-vertical: 15;
    border-color: ${colors.gray};
  `,

  BounceCircle: styled(View)`
    width: 135;
    height: 135;
    overflow: hidden;
    ${props => props.style};
  `,

  ButtonView: styled(View)`
    justify-content: center;
    align-items: center;
    width: 100%;
    ${props => props.style};
  `,

  GobBackButton: styled(TouchableOpacity)`
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 7;
    padding-vertical: ${defineLargeSizeParam(20, 10)};
  `,

  GobBackButtonText: styled(Text)`
    font-size: 17;
    font-family: ${fonts.regular};
    color: ${colors.primary};
    text-align: center;
  `,

  EnrolledView: styled(View)`
    flex: 1;
    align-items: center;
    padding-horizontal: 10;
    margin-vertical: ${defineLargeSizeParam(70, 50)};
    ${props => props.style};
  `,

  EnrolledIconView: styled(View)`
    border-width: 11;
    border-radius: 100;
    padding-horizontal: ${defineLargeSizeParam(20, 15)};
    padding-vertical: ${defineLargeSizeParam(20, 15)};
    border-color: ${props => props.theme.icons.circle.borderColor};
  `,

  CheckIconView: styled(View)`
    position: absolute;
    top: -5;
    right: ${defineLargeSizeParam(-5, -10)};
    opacity: 0.9;
    ${props => props.style};
  `,

  EnrolledBody: styled(View)`
    justify-content: center;
    align-items: center;
    margin-top: 10;
  `,

  EnrolledTitle: styled(Text)`
    font-size: 22;
    font-family: ${fonts.medium};
    text-align: center;
    margin-top: ${defineLargeSizeParam(50, 40)};
    color: ${props => props.theme.text.secondaryColor};
  `,

  ToggleBiometryView: styled(View)`
    margin-top: ${defineLargeSizeParam(40, 30)};
  `,

  NotSupportedView: styled(View)`
    flex: 1;
    align-items: center;
    padding-horizontal: 10;
    justify-content: center;
  `,

  NotSupportedIconView: styled(View)`
    border-width: 1px;
    border-radius: 100;
    border-color: ${colors.gray};
    margin-top: ${defineLargeSizeParam(-120, -65)};
    padding: 20px;
  `,

  NotSupportedTextView: styled(View)`
    justify-content: center;
    align-items: center;
    margin-top: 30;
  `,

  NotSupportedTitle: styled(Text)`
    font-size: 20;
    font-family: ${fonts.medium};
    text-align: center;
    color: ${props => props.theme.viewLabel.fifthColor};
  `,

  NotSupportedSubTitle: styled(Text)`
    font-size: 15;
    font-family: ${fonts.regular};
    text-align: center;
    margin-top: 3;
    color: ${props => props.theme.viewLabel.fifthColor};
  `,

  CancelIconView: styled(View)`
    position: absolute;
    bottom: 10;
    right: ${defineLargeSizeParam(-17, -15)};
  `,

  ...customStyleSheet
};

export default Styles;
