import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './styles';
import { ListView, InputModal, InfiniteScroll } from '@/components';
import Lng from '@/lang/i18n';
import { formatListByName } from '@/utils';
import { alertMe, isIPhoneX } from '@/constants';

export class PaymentModes extends Component {
    constructor(props) {
        super(props);
        this.scrollViewReference = React.createRef();
        this.modalReference = React.createRef();

        this.state = {
            isCreateMethod: true
        };
    }

    onToggle = () => this?.modalReference?.onToggle?.();

    onSaveMethod = () => {
        const { isCreateMethod } = this.state;
        const {
            props: {
                formValues: { methodName = '', methodId = null },
                createPaymentMode,
                editPaymentMode
            }
        } = this.props;

        const params = {
            params: {
                id: methodId,
                name: methodName
            },
            onSuccess: () => this.onToggle()
        };

        if (methodName) {
            isCreateMethod
                ? createPaymentMode(params)
                : editPaymentMode(params);
        }
    };

    onRemoveMethod = () => {
        const {
            props: {
                locale,
                removePaymentMode,
                formValues: { methodId = null }
            }
        } = this.props;

        alertMe({
            title: Lng.t('alert.title', { locale }),
            desc: Lng.t('payments.alertMode', { locale }),
            showCancel: true,
            okPress: () => {
                removePaymentMode({
                    id: methodId,
                    onSuccess: () => this.onToggle()
                });
            }
        });
    };

    INPUT_MODAL = () => {
        const { isCreateMethod } = this.state;
        const {
            props: { locale, paymentModeLoading = false }
        } = this.props;

        return (
            <InputModal
                reference={ref => (this.modalReference = ref)}
                locale={locale}
                headerTitle={
                    isCreateMethod
                        ? Lng.t('payments.addMode', { locale })
                        : Lng.t('payments.editMode', { locale })
                }
                hint={Lng.t('payments.modeHint', { locale })}
                fieldName="methodName"
                onSubmit={() => this.onSaveMethod()}
                onRemove={() => this.onRemoveMethod()}
                showRemoveButton={!isCreateMethod}
                onSubmitLoading={paymentModeLoading}
                onRemoveLoading={paymentModeLoading}
            />
        );
    };

    onSelectPaymentMethod = ({ name, id }) => {
        this.props.setFormField('methodId', id);
        this.openModal(name);
    };

    openModal = (name = '') => {
        this.setState({ isCreateMethod: name ? false : true });
        this.props.setFormField('methodName', name);
        this.onToggle();
    };

    render() {
        const {
            props: { paymentMethods, locale, getPaymentModes }
        } = this.props;

        return (
            <View style={styles.bodyContainer}>
                {this.INPUT_MODAL()}
                <InfiniteScroll
                    getItems={getPaymentModes}
                    reference={ref => (this.scrollViewReference = ref)}
                    paginationLimit={isIPhoneX ? 20 : 15}
                >
                    <ListView
                        items={formatListByName(paymentMethods)}
                        getFreshItems={onHide => {
                            onHide && onHide();
                        }}
                        onPress={this.onSelectPaymentMethod}
                        isEmpty={
                            paymentMethods ? paymentMethods.length <= 0 : true
                        }
                        bottomDivider
                        contentContainerStyle={{ flex: 3 }}
                        emptyContentProps={{
                            title: Lng.t('payments.empty.modeTitle', { locale })
                        }}
                        isAnimated
                    />
                </InfiniteScroll>
            </View>
        );
    }
}
