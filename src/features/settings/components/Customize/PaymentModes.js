import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './styles';
import { ListView, InputModal, InfiniteScroll } from '@/components';
import t from 'locales/use-translation';
import { formatListByName } from '@/utils';
import { alertMe, isIPhoneX } from '@/constants';
import { PermissionService } from '@/services';
import { CUSTOMIZE_TYPE } from '../../constants';

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
                removePaymentMode,
                formValues: { methodId = null }
            }
        } = this.props;

        alertMe({
            title: t('alert.title'),
            desc: t('payments.alertMode'),
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
            props: { paymentModeLoading = false }
        } = this.props;

        const isAllowToEdit = isCreateMethod
            ? true
            : PermissionService.isAllowToEdit(CUSTOMIZE_TYPE.PAYMENTS);
        const disabled = !isAllowToEdit;

        const getTitle = () => {
            let title = 'payments.addMode';
            if (!isCreateMethod && !isAllowToEdit)
                title = 'header.viewPaymentMode';
            if (!isCreateMethod && isAllowToEdit) title = 'payments.editMode';

            return t(title);
        };

        return (
            <InputModal
                reference={ref => (this.modalReference = ref)}
                headerTitle={getTitle()}
                hint={t('payments.modeHint')}
                fieldName="methodName"
                onSubmit={() => this.onSaveMethod()}
                onRemove={() => this.onRemoveMethod()}
                showRemoveButton={
                    !isCreateMethod &&
                    PermissionService.isAllowToDelete(CUSTOMIZE_TYPE.PAYMENTS)
                }
                showSaveButton={isAllowToEdit}
                onSubmitLoading={paymentModeLoading}
                onRemoveLoading={paymentModeLoading}
                disabled={disabled}
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
            props: { paymentMethods, getPaymentModes }
        } = this.props;

        return (
            <View style={styles.childContainer}>
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
                            title: t('payments.empty.modeTitle')
                        }}
                        itemContainer={{
                            paddingHorizontal: 35
                        }}
                        isAnimated
                    />
                </InfiniteScroll>
            </View>
        );
    }
}
