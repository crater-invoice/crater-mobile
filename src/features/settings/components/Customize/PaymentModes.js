import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import styles from './styles';
import { ListView, InputModal } from '../../../../components';
import { formatListByName, alertMe } from '../../../../api/global';
import Lng from '../../../../api/lang/i18n';

export class PaymentModes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isCreateMethod: true,
        };
    }

    onToggle = () => {
        this.setState(({ visible }) => {
            return { visible: !visible }
        });
    }

    onSaveMethod = () => {
        const { isCreateMethod } = this.state
        const {
            props: {
                formValues: { methodName = "", methodId = null },
                createPaymentMode,
                editPaymentMode
            }
        } = this.props

        const params = {
            id: methodId,
            name: methodName
        }

        if (methodName) {
            this.onToggle()

            isCreateMethod ? createPaymentMode({ params }) :
                editPaymentMode({ params, id: methodId })
        }
    }

    onRemoveMethod = () => {
        const {
            props: {
                language,
                removePaymentMode,
                formValues: { methodId = null },
            }
        } = this.props

        alertMe({
            title: Lng.t("alert.title", { locale: language }),
            desc: Lng.t("payments.alertMode", { locale: language }),
            showCancel: true,
            okPress: () => {
                this.onToggle()
                removePaymentMode({ id: methodId })
            }
        })
    }

    IMPORT_INPUT_MODAL = () => {
        const { visible, isCreateMethod } = this.state
        const { props: { navigation, language, paymentModeLoading = false } } = this.props

        return (
            <InputModal
                visible={visible}
                onToggle={() => this.onToggle()}
                navigation={navigation}
                language={language}
                headerTitle={isCreateMethod ?
                    Lng.t("payments.addMode", { locale: language }) :
                    Lng.t("payments.editMode", { locale: language })
                }
                hint={Lng.t("payments.modeHint", { locale: language })}
                fieldName="methodName"
                onSubmit={() => this.onSaveMethod()}
                onRemove={() => this.onRemoveMethod()}
                showRemoveButton={!isCreateMethod}
                onSubmitLoading={paymentModeLoading}
                onRemoveLoading={paymentModeLoading}
            />
        )
    }

    onSelectPaymentMethod = ({ name, id }) => {
        this.props.setFormField("methodId", id)
        this.openModal(name)
    }

    openModal = (name = "") => {
        this.setState({ isCreateMethod: name ? false : true })
        this.props.setFormField("methodName", name)
        this.onToggle()
    }

    render() {
        const { props: { paymentMethods, language } } = this.props

        return (
            <View style={styles.bodyContainer}>
                {this.IMPORT_INPUT_MODAL()}

                <View>
                    <ListView
                        items={formatListByName(paymentMethods)}
                        getFreshItems={(onHide) => {
                            onHide && onHide()
                        }}
                        onPress={this.onSelectPaymentMethod}
                        isEmpty={paymentMethods ? paymentMethods.length <= 0 : true}
                        bottomDivider
                        contentContainerStyle={{ flex: 3 }}
                        emptyContentProps={{
                            title: Lng.t("payments.empty.modeTitle", { locale: language }),
                        }}
                    />
                </View>
            </View>
        );
    }
}
