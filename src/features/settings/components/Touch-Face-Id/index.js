import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import { Field } from 'redux-form';
import * as LocalAuthentication from 'expo-local-authentication';
import Lng from '@/lang/i18n';
import {
    DefaultLayout,
    AssetSvg,
    CtGradientButton,
    ToggleSwitch,
    AnimatedCircularProgress
} from '@/components';
import {
    FingerprintIcon,
    FaceIcon,
    FingerPressIcon,
    CheckIcon,
    CancelIcon
} from '@/icons';
import {
    BIOMETRY_AUTH_TYPES,
    defineLargeSizeParam,
    hasValue,
    isArray
} from '@/constants';
import { colors } from '@/styles';
import Styles from './styles';
import { goBack, MOUNT, UNMOUNT } from '@/navigation';
import { biometricAuthentication } from '@/utils';

interface IProps {
    locale: string;
    loading: boolean;
    setBiometryAuthType: Function;
    biometryAuthType: string;
    navigation: any;
}

interface IStates {
    isCompatible: boolean;
    isEnrolled: boolean;
    supportBiometryType: string;
    isAllowToScan: boolean;
    stopScanAnimation: boolean;
    loading: boolean;
}

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
        this.animatedHandTranslateXY = new Animated.ValueXY({ x: 10, y: 10 });
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
        const { biometryAuthType, navigation } = this.props;

        goBack(MOUNT, navigation);

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

    componentWillUnmount() {
        goBack(UNMOUNT);
    }

    startScanAnimation = () => {
        Animated.timing(this.animatedFingerFadeIn, {
            useNativeDriver: true,
            toValue: 1,
            duration: 700
        }).start(() => {});

        Animated.timing(this.animatedHandTranslateXY, {
            useNativeDriver: true,
            toValue: { x: -20, y: -20 },
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
            this.animatedHandTranslateXY.setValue({ x: 10, y: 10 });
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
                this.setState({ isCompatible: false, loading: false });
                return;
            }

            const supportedTypes: Array<Number> = await LocalAuthentication.supportedAuthenticationTypesAsync();

            // supportedTypes
            // 1 = FINGERPRINT,
            // 2 = FACIAL_RECOGNITION,
            // 3 = IRIS

            if (!isArray(supportedTypes)) {
                this.setState({ isCompatible: false, loading: false });
                return;
            }

            if (supportedTypes.length === 2 || supportedTypes[0] === 2) {
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
            this.setState({ isCompatible: false, loading: false });
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
        this.props.setBiometryAuthType(this.state.supportBiometryType);
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
        const { locale } = this.props;

        try {
            biometricAuthentication({
                locale,
                onSuccess: () => this.setBiometryAuthType(),
                onCancel: () => this.refreshScanAnimation(),
                onFail: () => this.refreshScanAnimation()
            });
        } catch (e) {}
    };

    setUpNow = () => {
        this.setState({ isAllowToScan: true, stopScanAnimation: false });

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
        await this.setState({ loading: true, isEnrolled: false });

        this.navigateToSpecificBiometricType();

        this.props.setBiometryAuthType(null);
    };

    render() {
        const { locale, navigation } = this.props;
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
            ? 'touchFaceId.finger'
            : 'touchFaceId.face';

        const layoutProps = {
            hideScrollView: true,
            headerProps: {
                leftIconPress: () => {
                    navigation.goBack(null);
                },
                title: Lng.t('settings.touchOrFaceId', { locale }),
                placement: 'center'
            },
            loadingProps: { is: loading }
        };

        const TYPES_TITLES = {
            [BIOMETRY_AUTH_TYPES.FINGERPRINT]: Lng.t('touchFaceId.touchId', {
                locale
            }),
            [BIOMETRY_AUTH_TYPES.FACE]: Lng.t('touchFaceId.faceId', {
                locale
            })
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

            const AnimatedBounce = Animated.createAnimatedComponent(
                BounceCircle
            );

            const AnimatedButton = Animated.createAnimatedComponent(ButtonView);

            const bounceScale = {
                transform: [{ scale: this.animatedBounceScanIcon }]
            };

            return (
                <ScanContainer>
                    <Center>
                        <HeadingView>
                            <Title>{type}</Title>
                            <SubTitle>
                                {Lng.t('touchFaceId.subTitle1', { locale })}
                            </SubTitle>
                            <SubTitle2>
                                {Lng.t('touchFaceId.subTitle2', {
                                    locale,
                                    type
                                })}
                            </SubTitle2>
                        </HeadingView>

                        <ScanIconView>
                            <AnimatedCircle>
                                <AnimatedCircularProgress
                                    backgroundColor={colors.veryLightGray}
                                    innerBackgroundColor={colors.veryLightGray}
                                    color={colors.primary}
                                    startDeg={0}
                                    endDeg={360}
                                    radius={95}
                                    innerRadius={83}
                                    duration={700}
                                    reference={ref =>
                                        (this.circleFillReference = ref)
                                    }
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
                                                name={FingerprintIcon()}
                                                width={135}
                                                height={135}
                                                fill="transparent"
                                                style={{ opacity: 0.8 }}
                                            />
                                        ) : (
                                            <AssetSvg
                                                name={FaceIcon()}
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
                                    name={FingerPressIcon}
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
                        <CtGradientButton
                            onPress={() => !isAllowToScan && this.setUpNow()}
                            btnTitle={Lng.t('button.setUpNow', { locale })}
                            loading={false}
                            buttonContainerStyle={{ width: '75%' }}
                        />

                        <GobBackButton onPress={() => navigation.goBack(null)}>
                            <GobBackButtonText>
                                {Lng.t('button.later', { locale })}
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
                <AnimatedView style={{ opacity: this.fadeIn }}>
                    <EnrolledIconView>
                        {isFingerprintType ? (
                            <AssetSvg
                                name={FingerprintIcon({
                                    stroke: colors.primary
                                })}
                                width={defineLargeSizeParam(130, 120)}
                                height={defineLargeSizeParam(130, 120)}
                                fill="transparent"
                                style={{ opacity: 0.9 }}
                            />
                        ) : (
                            <AssetSvg
                                name={FaceIcon(colors.primary)}
                                width={defineLargeSizeParam(125, 120)}
                                height={defineLargeSizeParam(125, 120)}
                            />
                        )}

                        <AnimatedCheckIconView
                            style={{
                                transform: [
                                    { scale: this.animatedBounceCheckIcon }
                                ]
                            }}
                        >
                            <AssetSvg
                                name={CheckIcon}
                                width={defineLargeSizeParam(45, 40)}
                                height={defineLargeSizeParam(45, 40)}
                            />
                        </AnimatedCheckIconView>
                    </EnrolledIconView>
                    <EnrolledBody>
                        <EnrolledTitle>
                            {Lng.t('touchFaceId.activated', { locale, type })}
                        </EnrolledTitle>

                        <ToggleBiometryView>
                            <Field
                                name="biometry"
                                component={ToggleSwitch}
                                status={true}
                                hint={Lng.t('touchFaceId.enableLogin', {
                                    locale,
                                    type
                                })}
                                description={Lng.t(
                                    'touchFaceId.enableLoginHint',
                                    {
                                        locale,
                                        type
                                    }
                                )}
                                onChangeCallback={status => {
                                    this.disableBiometryAuthLogin();
                                }}
                                containerStyle={Styles.toggleBiometryContainer}
                                descriptionStyle={
                                    Styles.toggleBiometryDescription
                                }
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
                                name={FingerprintIcon({
                                    stroke: colors.danger
                                })}
                                width={defineLargeSizeParam(150, 130)}
                                height={defineLargeSizeParam(150, 130)}
                                fill="transparent"
                                style={{ opacity: 0.9 }}
                            />
                        ) : (
                            <AssetSvg
                                name={FaceIcon(colors.danger)}
                                width={defineLargeSizeParam(130, 120)}
                                height={defineLargeSizeParam(130, 120)}
                            />
                        )}

                        <CancelIconView>
                            <AssetSvg
                                name={CancelIcon}
                                width={defineLargeSizeParam(50, 45)}
                                height={defineLargeSizeParam(50, 45)}
                            />
                        </CancelIconView>
                    </NotSupportedIconView>
                    <NotSupportedTextView>
                        <NotSupportedTitle>
                            {Lng.t('touchFaceId.notCompatible', { locale })}
                        </NotSupportedTitle>
                        <NotSupportedSubTitle>
                            {Lng.t('touchFaceId.hardwareNotAvailable', {
                                locale,
                                type: Lng.t(typeIdText, { locale })
                            })}
                        </NotSupportedSubTitle>
                    </NotSupportedTextView>
                </NotSupportedView>
            );
        };

        if (isEnrolled) {
            return (
                <DefaultLayout {...layoutProps}>
                    {AlreadyEnrolledView()}
                </DefaultLayout>
            );
        }

        if (isCompatible) {
            return (
                <DefaultLayout {...layoutProps}>{ScanNowView()}</DefaultLayout>
            );
        }

        return (
            <DefaultLayout {...layoutProps}>{NotSupportedView()}</DefaultLayout>
        );
    }
}
