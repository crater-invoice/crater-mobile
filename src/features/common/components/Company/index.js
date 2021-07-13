// @flow

import React from 'react';
import { Field } from 'redux-form';
import Lng from '@/lang/i18n';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';
import { alertMe } from '@/constants';
import { addCompany, updateCompany, removeCompany } from '../../actions';
import {
    DefaultLayout,
    InputField,
    ActionButton,
    FilePicker
} from '@/components';

export default class Company extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logo: null,
            fileLoading: false
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        goBack(MOUNT, navigation);
    }

    componentWillUnmount() {
        goBack(UNMOUNT);
    }

    onSave = params => {
        const { isCreateScreen, dispatch, navigation, loading } = this.props;
        const { logo, fileLoading } = this.state;

        if (loading || fileLoading) {
            return;
        }

        const onSuccess = res => {
            const onSelect = navigation.getParam('onSelect', null);
            onSelect?.(res);
            navigation.goBack(null);
        };

        isCreateScreen
            ? dispatch(addCompany({ params, logo, onSuccess }))
            : dispatch(updateCompany({ params, logo, onSuccess }));
    };

    removeCompany = () => {
        const {
            companyId,
            navigation,
            locale,
            initialValues: { name },
            dispatch
        } = this.props;

        const alreadyUsedAlert = () =>
            alertMe({
                title: `${name} ${Lng.t('company.text_already_used', {
                    locale
                })}`
            });

        alertMe({
            title: Lng.t('alert.title', { locale }),
            desc: Lng.t('company.text_alert_description', { locale }),
            showCancel: true,
            okPress: () =>
                dispatch(
                    removeCompany({
                        id: companyId,
                        onSuccess: val =>
                            val
                                ? navigation.navigate(ROUTES.COMPANIES)
                                : alreadyUsedAlert()
                    })
                )
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
            isAllowToDelete,
            initialValues
        } = this.props;

        const disabled = !isAllowToEdit;

        const getTitle = () => {
            let title = 'header.addCompany';
            if (isEditScreen && !isAllowToEdit) title = 'header.viewCompany';
            if (isEditScreen && isAllowToEdit) title = 'header.editCompany';

            return Lng.t(title, { locale });
        };

        const bottomAction = [
            {
                label: 'button.save',
                onPress: handleSubmit(this.onSave),
                show: isAllowToEdit,
                loading: loading || this.state.fileLoading
            },
            {
                label: 'button.remove',
                onPress: this.removeCompany,
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
                    hint={Lng.t('settings.company.name', { locale })}
                    disabled={disabled}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCapitalize: 'none',
                        autoCorrect: true
                    }}
                />

                <Field
                    name={'logo'}
                    component={FilePicker}
                    locale={locale}
                    label={Lng.t('settings.company.logo', { locale })}
                    onChangeCallback={logo => this.setState({ logo })}
                    uploadedFileUrl={initialValues?.logo}
                    disabled={disabled}
                    fileLoading={fileLoading => this.setState({ fileLoading })}
                />
            </DefaultLayout>
        );
    }
}
