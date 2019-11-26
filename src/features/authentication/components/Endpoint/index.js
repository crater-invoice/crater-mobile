// @flow

import React, { Component } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Text,
    StatusBar,
    ScrollView
} from 'react-native';
import styles from './styles';
import { Field } from 'redux-form';
import { InputField, CtButton, AssetImage, CtGradientButton, CtHeader } from '../../../../components';
import Lng from '../../../../api/lang/i18n';
import { ROUTES } from '../../../../navigation/routes';
import { IMAGES } from '../../../../config';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';
import { alertMe } from '../../../../api/global';

type IProps = {
    label: String,
    icon: String,
    placeholder: String,
    containerStyle: Object,
    rightIcon: String,
    leftIcon: String,
    color: String,
    value: String,
    items: Object,
    rightIcon: String,
    loading: Boolean,
    checkEndpointApi: Function
};

export class Endpoint extends Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
            isFocus: false
        };
    }


    componentDidMount() {

        const { navigation, skipEndpoint } = this.props

        skipEndpoint && goBack(MOUNT, navigation, ROUTES.SETTING_LIST)
    }

    componentWillUnmount() {
        const { skipEndpoint } = this.props
        skipEndpoint && goBack(UNMOUNT)
    }


    onSetEndpointApi = ({ endpointURL }) => {

        this.setState({ isFocus: false })

        const { checkEndpointApi, navigation, language } = this.props
        let URL = endpointURL

        checkEndpointApi({
            endpointURL: !(URL.charAt(URL.length - 1) === '/') ? URL
                : URL.slice(0, -1),
            onResult: (val) => {
                !val ? alertMe({ title: Lng.t("endpoint.alertInvalidUrl", { locale: language }) }) :
                    navigation.navigate(ROUTES.LOGIN)

            }
        })
    }

    onBack = () => {
        this.props.navigation.navigate(ROUTES.SETTING_LIST)
    }

    toggleFocus = () => {
        this.setState((prevState) => {
            return { isFocus: !prevState.isFocus }
        });
    }

    render() {
        const {
            handleSubmit,
            language,
            navigation,
            skipEndpoint = false,
            loading
        } = this.props;


        return (
            <View style={styles.container}>

                {skipEndpoint ? (
                    <CtHeader
                        leftIcon="angle-left"
                        leftIconPress={() => this.onBack()}
                        title={Lng.t("header.back", { locale: language })}
                        titleOnPress={() => this.onBack()}
                        titleStyle={{ marginLeft: -10, marginTop: -1 }}
                        placement="left"
                        noBorder
                        transparent
                    />
                ) : (
                        <StatusBar
                            barStyle="dark-content"
                            hidden={false}
                            translucent={true}
                        />
                    )}

                <ScrollView
                    style={{ marginTop: skipEndpoint ? '18%' : '32%' }}
                    bounces={false}
                >
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        contentContainerStyle={{ flex: 1 }}
                        keyboardVerticalOffset={0}
                        behavior="height"
                    >
                        <View style={styles.main}>

                            <View style={styles.logoContainer}>
                                <AssetImage
                                    imageSource={IMAGES.LOGO_DARK}
                                    imageStyle={styles.imgLogo}
                                />
                            </View>
                            <View>
                                <Field
                                    name="endpointURL"
                                    component={InputField}
                                    hint={Lng.t("endpoint.endpointURL", { locale: language })}
                                    inputProps={{
                                        autoCapitalize: 'none',
                                        placeholder: Lng.t("endpoint.urlPlaceHolder", { locale: language }),
                                        autoCorrect: true,
                                        keyboardType: "url",
                                        onSubmitEditing: () => this.toggleFocus()
                                    }}
                                    onFocus={() => this.toggleFocus()}
                                    inputContainerStyle={styles.inputField}
                                />
                                <Text style={styles.endpointTextTitle}>
                                    {Lng.t("endpoint.endpointDesc", { locale: language })}
                                </Text>
                            </View>

                            <CtGradientButton
                                onPress={handleSubmit(this.onSetEndpointApi)}
                                btnTitle={Lng.t("button.save", { locale: language })}
                                loading={this.state.isFocus ? false : loading}
                                style={styles.buttonStyle}
                                buttonContainerStyle={styles.buttonContainer}
                            />

                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        );
    }
}

