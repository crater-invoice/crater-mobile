import React, {Component} from 'react';
import {Animated, Easing} from 'react-native';
import {Field} from 'redux-form';
import * as LocalAuthentication from 'expo-local-authentication';
import t from 'locales/use-translation';
import {colors} from '@/styles';
import Styles from './touch-face-id-styles';
import {biometricAuthentication} from '@/utils';
import {isIosPlatform} from '@/helpers/platform';
import {defineLargeSizeParam} from '@/helpers/size';
import {BIOMETRY_AUTH_TYPES, hasValue, isEmpty} from '@/constants';
import {setBiometryAuthType} from 'stores/setting/actions';
import {IProps, IStates} from './touch-face-id-type.d';
import {
  DefaultLayout,
  AssetSvg,
  BaseSwitch,
  AnimatedCircularProgress,
  BaseButton
} from '@/components';

export default class TouchOrFaceId extends Component<IProps, IStates> {
  circleFillReference: any;
  animatedHandTranslateXY: any;
  animatedBounceScanIcon: any;
  animatedFingerFadeIn: any;
  animatedButtonSetUpNowFadeOut: any;
  animatedBounceCheckIcon: any;
  fadeIn: any;
  timer: any;

  constructor(props) {
    super(props);
    this.circleFillReference = React.createRef();
    this.animatedHandTranslateXY = new Animated.ValueXY({x: 10, y: 10});
    this.animatedBounceScanIcon = new Animated.Value(1);
    this.animatedBounceCheckIcon = new Animated.Value(1);
    this.animatedButtonSetUpNowFadeOut = new Animated.Value(1);
    this.animatedFingerFadeIn = new Animated.Value(0);
    this.fadeIn = new Animated.Value(0);

    this.state = {
      isCompatible: true,
      isEnrolled: false,
      supportBiometryType: BIOMETRY_AUTH_TYPES.FINGERPRINT,
      isAllowToScan: false,
      stopScanAnimation: false,
      loading: true
    };
  }

  async componentDidMount() {
    const {biometryAuthType} = this.props;

    if (hasValue(biometryAuthType)) {
      await this.setState({
        isEnrolled: true,
        supportBiometryType: biometryAuthType,
        loading: false
      });

      this.fadeInView();
      return;
    }

    this.navigateToSpecificBiometricType();
  }

  startScanAnimation = () => {
    Animated.timing(this.animatedFingerFadeIn, {
      useNativeDriver: true,
      toValue: 1,
      duration: 700
    }).start(() => {});

    Animated.timing(this.animatedHandTranslateXY, {
      useNativeDriver: true,
      toValue: {x: -20, y: -20},
      duration: 500
    }).start(() => {
      Animated.timing(this.animatedBounceScanIcon, {
        useNativeDriver: true,
        toValue: 0.9,
        duration: 500,
        easing: Easing.bounce
      }).start(() => this.resetScanAnimation());
    });
  };

  resetScanAnimation = () => {
    Animated.timing(this.animatedFingerFadeIn, {
      useNativeDriver: true,
      toValue: 0,
      duration: 400
    }).start(() => {
      this.animatedHandTranslateXY.setValue({x: 10, y: 10});
    });

    Animated.timing(this.animatedBounceScanIcon, {
      useNativeDriver: true,
      toValue: 1,
      duration: 500,
      easing: Easing.bounce
    }).start(() => {});

    if (!this.state.stopScanAnimation) {
      this.timer = setTimeout(() => {
        this.startScanAnimation();
      }, 1000);
    }
  };

  fadeInView = () => {
    Animated.timing(this.fadeIn, {
      useNativeDriver: true,
      toValue: 1,
      duration: 400
    }).start(() => {});
  };

  bounceCheckIcon = () => {
    Animated.timing(this.animatedBounceCheckIcon, {
      useNativeDriver: true,
      toValue: 1.3,
      duration: 300
    }).start(() => {
      Animated.timing(this.animatedBounceCheckIcon, {
        useNativeDriver: true,
        toValue: 1,
        duration: 200
      }).start(() => {});
    });
  };

  toggleScanNowAnimatedButton = ({
    toValue = 0,
    duration = 400,
    onStart = null
  }) => {
    Animated.timing(this.animatedButtonSetUpNowFadeOut, {
      useNativeDriver: true,
      toValue,
      duration
    }).start(() => onStart?.());
  };

  navigateToSpecificBiometricType = async () => {
    try {
      const isCompatible = await LocalAuthentication.hasHardwareAsync();

      if (!isCompatible) {
        this.setState({isCompatible: false, loading: false});
        return;
      }

      const supportedTypes: Array<Number> = await LocalAuthentication.supportedAuthenticationTypesAsync();

      // supportedTypes
      // 1 = FINGERPRINT,
      // 2 = FACIAL_RECOGNITION,
      // 3 = IRIS

      if (isEmpty(supportedTypes)) {
        this.setState({isCompatible: false, loading: false});
        return;
      }

      if (
        (supportedTypes.length === 2 || supportedTypes[0] === 2) &&
        isIosPlatform
      ) {
        this.setState({
          supportBiometryType: BIOMETRY_AUTH_TYPES.FACE,
          loading: false
        });
        return;
      }

      this.setState({
        supportBiometryType: BIOMETRY_AUTH_TYPES.FINGERPRINT,
        loading: false
      });
    } catch (e) {
      this.setState({isCompatible: false, loading: false});
    }
  };

  setBiometryAuthType = () => {
    this.animatedFingerFadeIn.setValue(0);
    this.animatedBounceScanIcon.setValue(1);

    this.timer && clearTimeout(this.timer);

    this.circleFillReference?.start?.(() => {
      setTimeout(() => {
        this.navigateToEnrolledViewScreen();
      }, 100);
    });
  };

  navigateToEnrolledViewScreen = async () => {
    await this.setState({
      isEnrolled: true,
      stopScanAnimation: true,
      isAllowToScan: false
    });
    this.fadeInView();
    this.bounceCheckIcon();
    this.props.dispatch(setBiometryAuthType(this.state.supportBiometryType));
  };

  refreshScanAnimation = () => {
    this.animatedFingerFadeIn.setValue(0);
    this.animatedBounceScanIcon.setValue(1);

    this.setState({
      stopScanAnimation: true,
      isAllowToScan: false
    });

    this.timer && clearTimeout(this.timer);

    this.toggleScanNowAnimatedButton({
      toValue: 1,
      duration: 100
    });

    this.toggleAnimatedCircleView(false);
  };

  scanId = async () => {
    try {
      biometricAuthentication({
        onSuccess: () => this.setBiometryAuthType(),
        onCancel: () => this.refreshScanAnimation(),
        onFail: () => this.refreshScanAnimation()
      });
    } catch (e) {}
  };

  setUpNow = () => {
    this.setState({isAllowToScan: true, stopScanAnimation: false});

    this.toggleAnimatedCircleView(true);

    this.toggleScanNowAnimatedButton({
      toValue: 0,
      onStart: () => this.startScanAnimation()
    });

    this.scanId();
  };

  toggleAnimatedCircleView = status => {
    this.circleFillReference?.showCircleView?.(status);
  };

  disableBiometryAuthLogin = async () => {
    await this.setState({loading: true, isEnrolled: false});

    this.navigateToSpecificBiometricType();

    this.props.dispatch(setBiometryAuthType(null));
  };

  render() {
    const {navigation, theme} = this.props;
    const {
      isCompatible,
      isEnrolled,
      supportBiometryType,
      isAllowToScan,
      loading
    } = this.state;

    const isFingerprintType =
      supportBiometryType === BIOMETRY_AUTH_TYPES.FINGERPRINT;

    const typeIdText = isFingerprintType
      ? 'touch_face_id.finger'
      : 'touch_face_id.face';

    const layoutProps = {
      hideScrollView: true,
      headerProps: {
        leftIconPress: () => {
          navigation.goBack(null);
        },
        title: t('settings.touch_or_Face_id'),
        placement: 'center',
        leftArrow: 'primary'
      },
      loadingProps: {is: loading}
    };

    const TYPES_TITLES = {
      [BIOMETRY_AUTH_TYPES.FINGERPRINT]: t('touch_face_id.touch_id'),
      [BIOMETRY_AUTH_TYPES.FACE]: t('touch_face_id.face_id')
    };

    const type = TYPES_TITLES[supportBiometryType];

    const ScanNowView = () => {
      const {
        ScanContainer,
        Center,
        HeadingView,
        Title,
        SubTitle,
        SubTitle2,
        ScanIconView,
        AnimatedCircle,
        ScanNowButton,
        Circle,
        BounceCircle,
        ButtonView,
        GobBackButton,
        GobBackButtonText
      } = Styles;

      const AnimatedBounce = Animated.createAnimatedComponent(BounceCircle);

      const AnimatedButton = Animated.createAnimatedComponent(ButtonView);

      const bounceScale = {
        transform: [{scale: this.animatedBounceScanIcon}]
      };

      return (
        <ScanContainer>
          <Center>
            <HeadingView>
              <Title allowFontScaling={false}>{type}</Title>
              <SubTitle allowFontScaling={false}>
                {t('touch_face_id.subtitle_1')}
              </SubTitle>
              <SubTitle2 allowFontScaling={false}>
                {t('touch_face_id.subtitle_2', {
                  type
                })}
              </SubTitle2>
            </HeadingView>

            <ScanIconView>
              <AnimatedCircle>
                <AnimatedCircularProgress
                  backgroundColor={theme.backgroundColor}
                  innerBackgroundColor={theme.backgroundColor}
                  color={colors.primary}
                  startDeg={0}
                  endDeg={360}
                  radius={95}
                  innerRadius={83}
                  duration={700}
                  reference={ref => (this.circleFillReference = ref)}
                />
              </AnimatedCircle>

              <ScanNowButton
                onPress={() => isAllowToScan && this.scanId()}
                activeOpacity={isAllowToScan ? 0.5 : 1}
              >
                <Circle>
                  <AnimatedBounce style={bounceScale}>
                    {isFingerprintType ? (
                      <AssetSvg
                        name={AssetSvg.icons.finger({
                          stroke: theme.icons.biometric.backgroundColor
                        })}
                        width={135}
                        height={135}
                        fill="transparent"
                        style={{
                          opacity: theme?.mode === 'light' ? 0.8 : 0.93
                        }}
                      />
                    ) : (
                      <AssetSvg
                        name={AssetSvg.icons.face(
                          theme.icons.biometric.backgroundColor
                        )}
                        width={135}
                        height={135}
                      />
                    )}
                  </AnimatedBounce>
                </Circle>
              </ScanNowButton>
              <Animated.View
                style={{
                  position: 'absolute',
                  bottom: -50,
                  right: -50,

                  transform: this.animatedHandTranslateXY.getTranslateTransform(),
                  opacity: this.animatedFingerFadeIn
                }}
              >
                <AssetSvg
                  name={AssetSvg.icons.finger_press}
                  width={130}
                  height={130}
                />
              </Animated.View>
            </ScanIconView>
          </Center>

          <AnimatedButton
            style={{
              opacity: this.animatedButtonSetUpNowFadeOut
            }}
          >
            <BaseButton
              type="primary-gradient"
              base-class="width=72%"
              size="lg"
              onPress={() => !isAllowToScan && this.setUpNow()}
            >
              {t('button.set_up_now')}
            </BaseButton>

            <GobBackButton onPress={() => navigation.goBack(null)}>
              <GobBackButtonText allowFontScaling={false}>
                {t('button.later')}
              </GobBackButtonText>
            </GobBackButton>
          </AnimatedButton>
        </ScanContainer>
      );
    };

    const AlreadyEnrolledView = () => {
      const {
        EnrolledView,
        EnrolledIconView,
        CheckIconView,
        EnrolledBody,
        EnrolledTitle,
        ToggleBiometryView
      } = Styles;
      const AnimatedView = Animated.createAnimatedComponent(EnrolledView);
      const AnimatedCheckIconView = Animated.createAnimatedComponent(
        CheckIconView
      );

      return (
        <AnimatedView style={{opacity: this.fadeIn}}>
          <EnrolledIconView theme={theme}>
            {isFingerprintType ? (
              <AssetSvg
                name={AssetSvg.icons.finger({
                  stroke: theme.icons.circle.backgroundColor
                })}
                width={defineLargeSizeParam(130, 120)}
                height={defineLargeSizeParam(130, 120)}
                fill="transparent"
                style={{opacity: 0.9}}
              />
            ) : (
              <AssetSvg
                name={AssetSvg.icons.face(theme.icons.circle.backgroundColor)}
                width={defineLargeSizeParam(125, 120)}
                height={defineLargeSizeParam(125, 120)}
              />
            )}

            <AnimatedCheckIconView
              style={{
                transform: [{scale: this.animatedBounceCheckIcon}]
              }}
            >
              <AssetSvg
                name={AssetSvg.icons.check(theme.icons.circle.backgroundColor)}
                width={defineLargeSizeParam(45, 40)}
                height={defineLargeSizeParam(45, 40)}
              />
            </AnimatedCheckIconView>
          </EnrolledIconView>
          <EnrolledBody>
            <EnrolledTitle theme={theme} allowFontScaling={false}>
              {t('touch_face_id.activated', {type})}
            </EnrolledTitle>

            <ToggleBiometryView>
              <Field
                name="biometry"
                component={BaseSwitch}
                status={true}
                hint={t('touch_face_id.enable_login', {
                  type
                })}
                description={t('touch_face_id.enable_login_hint', {
                  type
                })}
                onChangeCallback={status => {
                  this.disableBiometryAuthLogin();
                }}
                containerStyle={Styles.toggleBiometryContainer(theme)}
                descriptionStyle={Styles.toggleBiometryDescription}
              />
            </ToggleBiometryView>
          </EnrolledBody>
        </AnimatedView>
      );
    };

    const NotSupportedView = () => {
      const {
        NotSupportedView,
        NotSupportedIconView,
        CancelIconView,
        NotSupportedTextView,
        NotSupportedTitle,
        NotSupportedSubTitle
      } = Styles;
      return (
        <NotSupportedView>
          <NotSupportedIconView>
            {isFingerprintType ? (
              <AssetSvg
                name={AssetSvg.icons.finger({
                  stroke: colors.danger
                })}
                width={defineLargeSizeParam(150, 130)}
                height={defineLargeSizeParam(150, 130)}
                fill="transparent"
                style={{opacity: 0.9}}
              />
            ) : (
              <AssetSvg
                name={AssetSvg.icons.face(colors.danger)}
                width={defineLargeSizeParam(130, 120)}
                height={defineLargeSizeParam(130, 120)}
              />
            )}

            <CancelIconView>
              <AssetSvg
                name={AssetSvg.icons.cancel}
                width={defineLargeSizeParam(50, 45)}
                height={defineLargeSizeParam(50, 45)}
              />
            </CancelIconView>
          </NotSupportedIconView>
          <NotSupportedTextView>
            <NotSupportedTitle allowFontScaling={false}>
              {t('touch_face_id.not_compatible')}
            </NotSupportedTitle>
            <NotSupportedSubTitle allowFontScaling={false}>
              {t('touch_face_id.hardware_not_available', {
                type: t(typeIdText)
              })}
            </NotSupportedSubTitle>
          </NotSupportedTextView>
        </NotSupportedView>
      );
    };

    if (isEnrolled) {
      return (
        <DefaultLayout {...layoutProps}>{AlreadyEnrolledView()}</DefaultLayout>
      );
    }

    if (isCompatible) {
      return <DefaultLayout {...layoutProps}>{ScanNowView()}</DefaultLayout>;
    }

    return <DefaultLayout {...layoutProps}>{NotSupportedView()}</DefaultLayout>;
  }
}
