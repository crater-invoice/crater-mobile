// @flow

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import {
    DefaultLayout,
    CtButton,
    InputField,
    ToggleSwitch,
    CtDivider
} from '../../../../components';
import { Field, change } from 'redux-form';
import Lng from '../../../../api/lang/i18n';
import { NOTIFICATION } from '../../constants';
import { colors } from '../../../../styles/colors';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';


type IProps = {
    navigation: Object,
    handleSubmit: Function,
    language: String,
    getAccountLoading: Boolean,
}
export class Notification extends React.Component<IProps> {
    constructor(props) {
        super(props);

        this.state = {
            invoiceStatus: null,
            estimateStatus: null,
            email: '',
        }
    }

    componentWillMount() {
        const { getSettingItem } = this.props

        getSettingItem({
            key: 'notify_invoice_viewed',
            onResult: (val) => {
                this.setState({ invoiceStatus: val !== null ? val : 'NO' })
            }
        })

        getSettingItem({
            key: 'notify_estimate_viewed',
            onResult: (val) => {
                this.setState({ estimateStatus: val !== null ? val : 'NO' })
            }
        })

        getSettingItem({
            key: 'notification_email',
            onResult: (val) => {
                this.setFormField('notification_email', val)
            }
        })
    }

    componentDidMount() {
        const { navigation } = this.props
        goBack(MOUNT, navigation)
    }

    componentWillUpdate(nextProps, nextState) {

        const { navigation } = nextProps
        const toastMsg = navigation.getParam('toastMsg', null)

        toastMsg &&
            setTimeout(() => {
                navigation.setParams({ 'toastMsg': null })
            }, 2500);
    }

    componentWillUnmount() {
        goBack(UNMOUNT)
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(NOTIFICATION, field, value));
    };

    onNotificationSubmit = ({ notification_email }) => {
        const { editSettingItem, navigation } = this.props

        editSettingItem({
            params: {
                key: 'notification_email',
                value: notification_email
            },
            navigation
        })

    }

    invoiceStatus = (status) => {
        const { editSettingItem } = this.props

        editSettingItem({
            params: {
                key: 'notify_invoice_viewed',
                value: status === true ? 'YES' : 'NO'
            },
            onResult: () => { this.toggleToast('settings.notifications.invoiceViewedUpdated') }
        })
    }

    estimateStatus = (status) => {
        const { editSettingItem } = this.props

        editSettingItem({
            params: {
                key: 'notify_estimate_viewed',
                value: status === true ? 'YES' : 'NO'
            },
            onResult: () => { this.toggleToast('settings.notifications.estimateViewedUpdated') }
        })
    }

    toggleToast = (msg) => {
        this.props.navigation.setParams({
            "toastMsg": msg
        })
    }

    render() {
        const {
            navigation,
            handleSubmit,
            language,
            getSettingItemLoading,
        } = this.props;

        const { invoiceStatus, estimateStatus } = this.state
        let toastMessage = navigation.getParam('toastMsg', '')

        return (
            <DefaultLayout
                headerProps={{
                    leftIconPress: () => navigation.goBack(null),
                    title: Lng.t("header.notifications", { locale: language }),
                    placement: "center",
                    rightIcon: "save",
                    rightIconProps: {
                        solid: true,
                    },
                    leftIconStyle: { color: colors.dark2 },
                    rightIconPress: handleSubmit(this.onNotificationSubmit),
                }}
                loadingProps={{
                    is: getSettingItemLoading || invoiceStatus === null ||
                        estimateStatus === null
                }}
                toastProps={{
                    message: Lng.t(toastMessage, { locale: language }),
                    visible: toastMessage,
                    containerStyle: styles.toastContainer
                }}
            >
                <View style={styles.mainContainer}>

                    <Field
                        name={"notification_email"}
                        component={InputField}
                        hint={Lng.t("settings.notifications.send", { locale: language })}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCapitalize: 'none',
                            autoCorrect: true,
                            keyboardType: 'email-address',
                        }}
                        leftIcon={'envelope'}
                        leftIconSolid={true}
                    />

                    <CtDivider
                        dividerStyle={styles.dividerLine}
                    />

                    <Field
                        name="notify_invoice_viewed"
                        component={ToggleSwitch}
                        status={invoiceStatus === 'YES' ? true : false}
                        hint={Lng.t("settings.notifications.invoiceViewed", { locale: language })}
                        description={Lng.t("settings.notifications.invoiceViewedDescription", { locale: language })}
                        onChangeCallback={(val) =>
                            this.invoiceStatus(val)
                        }
                    />

                    <Field
                        name="notify_estimate_viewed"
                        component={ToggleSwitch}
                        status={estimateStatus === 'YES' ? true : false}
                        hint={Lng.t("settings.notifications.estimateViewed", { locale: language })}
                        description={Lng.t("settings.notifications.estimateViewedDescription", { locale: language })}
                        onChangeCallback={(val) =>
                            this.estimateStatus(val)
                        }
                        mainContainerStyle={{ marginTop: 12 }}
                    />

                </View>
            </DefaultLayout>
        );
    }
}
