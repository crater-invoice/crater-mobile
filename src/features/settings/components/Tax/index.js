// @flow

import React from 'react';
import { Field } from 'redux-form';
import Lng from '@/lang/i18n';
import { ADD_TAX } from '../../constants';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';
import { alertMe, MAX_LENGTH } from '@/constants';
import {
    DefaultLayout,
    InputField,
    ToggleSwitch,
    ActionButton
} from '@/components';

export class Tax extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            endpointVisible: false
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        goBack(MOUNT, navigation);
    }

    componentWillUnmount() {
        goBack(UNMOUNT);
    }

    onSave = tax => {
        const { addTax, navigation, type, editTax, loading } = this.props;
        const isCreate = type === ADD_TAX;

        if (loading) {
            return;
        }

        const onResult = res => {
            const onSelect = navigation.getParam('onSelect', null);
            onSelect?.([{ ...res, tax_type_id: res?.id }]);
            navigation.goBack(null);
        };

        isCreate ? addTax({ tax, onResult }) : editTax({ tax, onResult });
    };

    removeTax = () => {
        const {
            removeTax,
            taxId,
            navigation,
            locale,
            initialValues: { name }
        } = this.props;

        const remove = () => {
            removeTax({
                id: taxId,
                onResult: val => {
                    val
                        ? navigation.navigate(ROUTES.TAXES)
                        : alertMe({
                              title: `${name} ${Lng.t('taxes.alreadyUsed', {
                                  locale
                              })}`
                          });
                }
            });
        };

        alertMe({
            title: Lng.t('alert.title', { locale }),
            desc: Lng.t('taxes.alertDescription', { locale }),
            showCancel: true,
            okPress: remove
        });
    };

    render() {
        const {
            navigation,
            handleSubmit,
            locale,
            loading,
            isEditScreen,
            isAllowToEdit,
            isAllowToDelete
        } = this.props;

        let taxRefs = {};
        const disabled = !isAllowToEdit;

        const getTitle = () => {
            let title = 'header.addTaxes';
            if (isEditScreen && !isAllowToEdit) title = 'header.viewTax';
            if (isEditScreen && isAllowToEdit) title = 'header.editTaxes';

            return Lng.t(title, { locale });
        };

        const bottomAction = [
            {
                label: 'button.save',
                onPress: handleSubmit(this.onSave),
                show: isAllowToEdit,
                loading
            },
            {
                label: 'button.remove',
                onPress: this.removeTax,
                bgColor: 'btn-danger',
                show: isEditScreen && isAllowToDelete,
                loading
            }
        ];

        return (
            <DefaultLayout
                headerProps={{
                    leftIconPress: () => navigation.goBack(null),
                    title: getTitle(),
                    placement: 'center',
                    ...(isAllowToEdit && {
                        rightIcon: 'save',
                        rightIconProps: { solid: true },
                        rightIconPress: handleSubmit(this.onSave)
                    })
                }}
                bottomAction={
                    <ActionButton locale={locale} buttons={bottomAction} />
                }
            >
                <Field
                    name="name"
                    component={InputField}
                    isRequired
                    hint={Lng.t('taxes.type', { locale })}
                    disabled={disabled}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCapitalize: 'none',
                        autoCorrect: true,
                        onSubmitEditing: () => {
                            taxRefs.percent.focus();
                        }
                    }}
                />

                <Field
                    name="percent"
                    isRequired
                    component={InputField}
                    hint={Lng.t('taxes.percentage', { locale }) + ' (%)'}
                    maxNumber={100}
                    refLinkFn={ref => (taxRefs.percent = ref)}
                    disabled={disabled}
                    inputProps={{
                        returnKeyType: 'next',
                        keyboardType: 'decimal-pad',
                        onSubmitEditing: () => {
                            taxRefs.description.focus();
                        }
                    }}
                />

                <Field
                    name="description"
                    component={InputField}
                    hint={Lng.t('taxes.description', { locale })}
                    refLinkFn={ref => (taxRefs.description = ref)}
                    height={80}
                    disabled={disabled}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCapitalize: 'none',
                        autoCorrect: true,
                        multiline: true,
                        maxLength: MAX_LENGTH
                    }}
                />

                <Field
                    name="compound_tax"
                    component={ToggleSwitch}
                    hint={Lng.t('taxes.compoundTax', { locale })}
                    title-text-default
                    disabled={disabled}
                />
            </DefaultLayout>
        );
    }
}
