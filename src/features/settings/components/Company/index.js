// @flow

import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import {
    DefaultLayout,
    CtButton,
    InputField,
    FilePicker,
    AssetImage,
    SelectField
} from '@/components';
import { Field, change } from 'redux-form';
import Lng from '@/lang/i18n';
import { EDIT_COMPANY } from '../../constants';
import { formatCountries } from '@/utils';
import { MAX_LENGTH } from '@/constants';
import { goBack, MOUNT, UNMOUNT } from '@/navigation';

type IProps = {
    navigation: Object,
    getCompanyInformation: Function,
    getCountries: Function,
    editCompanyInformation: Function,
    handleSubmit: Function,
    locale: String,
    editCompanyLoading: Boolean,
    getCompanyInfoLoading: Boolean,
    countriesLoading: Boolean
};

let companyField = [
    'country_id',
    'state',
    'city',
    'zip',
    'address_street_1',
    'address_street_2',
    'phone'
];
export class Company extends React.Component<IProps> {
    constructor(props) {
        super(props);

        this.state = {
            image: null,
            logo: null,
            fileLoading: false
        };
    }

    componentDidMount() {
        const {
            getCompanyInformation,
            getCountries,
            navigation,
            countries
        } = this.props;

        let hasCountryApiCalled = countries
            ? typeof countries === 'undefined' || countries.length === 0
            : true;

        hasCountryApiCalled && getCountries();

        getCompanyInformation({
            onResult: user => {
                this.setFormField(
                    'name',
                    user.company_id ? user.company.name : ''
                );

                if (user.company.address) {
                    companyField.map(field => {
                        this.setFormField(field, user.company.address[field]);
                    });
                }
                if (user.company.logo) {
                    this.setState({ image: user.company.logo });
                }
            }
        });
        goBack(MOUNT, navigation);
    }

    componentWillUnmount() {
        goBack(UNMOUNT);
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(EDIT_COMPANY, field, value));
    };

    onCompanyUpdate = value => {
        const {
            navigation,
            editCompanyInformation,
            editCompanyLoading
        } = this.props;
        const { logo, fileLoading } = this.state;

        if (!fileLoading && !editCompanyLoading) {
            editCompanyInformation({
                params: value,
                logo,
                navigation
            });
        }
    };

    BOTTOM_ACTION = handleSubmit => {
        const { locale, editCompanyLoading } = this.props;
        const { fileLoading } = this.state;

        return (
            <View style={styles.submitButton}>
                <CtButton
                    onPress={handleSubmit(this.onCompanyUpdate)}
                    btnTitle={Lng.t('button.save', { locale })}
                    loading={editCompanyLoading || fileLoading}
                />
            </View>
        );
    };

    render() {
        const {
            navigation,
            handleSubmit,
            locale,
            getCompanyInfoLoading,
            countriesLoading,
            countries
        } = this.props;

        let companyRefs = {};

        return (
            <DefaultLayout
                headerProps={{
                    leftIconPress: () => navigation.goBack(null),
                    title: Lng.t('header.setting.company', { locale }),
                    titleStyle: styles.titleStyle,
                    placement: 'center',
                    rightIcon: 'save',
                    rightIconProps: {
                        solid: true
                    },
                    rightIconPress: handleSubmit(this.onCompanyUpdate)
                }}
                bottomAction={this.BOTTOM_ACTION(handleSubmit)}
                loadingProps={{
                    is: getCompanyInfoLoading || countriesLoading
                }}
            >
                <View style={styles.mainContainer}>
                    <Field
                        name={'logo'}
                        component={FilePicker}
                        label={Lng.t('settings.company.logo', { locale })}
                        navigation={navigation}
                        onChangeCallback={val => this.setState({ logo: val })}
                        imageUrl={this.state.image}
                        containerStyle={{
                            marginTop: 15
                        }}
                        fileLoading={val => {
                            this.setState({ fileLoading: val });
                        }}
                    />

                    <Field
                        name={'name'}
                        component={InputField}
                        isRequired
                        hint={Lng.t('settings.company.name', { locale })}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCorrect: true,
                            onFocus: true,
                            autoFocus: true,
                            onSubmitEditing: () => {
                                companyRefs.phone.focus();
                            }
                        }}
                    />

                    <Field
                        name={'phone'}
                        component={InputField}
                        hint={Lng.t('settings.company.phone', { locale })}
                        inputProps={{
                            returnKeyType: 'next',
                            keyboardType: 'phone-pad'
                        }}
                        refLinkFn={ref => {
                            companyRefs.phone = ref;
                        }}
                    />

                    <Field
                        name={'country_id'}
                        items={formatCountries(countries)}
                        displayName="name"
                        component={SelectField}
                        label={Lng.t('customers.address.country', { locale })}
                        placeholder={' '}
                        rightIcon="angle-right"
                        navigation={navigation}
                        searchFields={['name']}
                        isInternalSearch
                        compareField="id"
                        onSelect={({ id }) => {
                            this.setFormField('country_id', id);
                        }}
                        headerProps={{
                            title: Lng.t('header.country', { locale }),
                            rightIconPress: null
                        }}
                        listViewProps={{
                            contentContainerStyle: { flex: 7 }
                        }}
                        emptyContentProps={{
                            contentType: 'countries'
                        }}
                        isRequired
                    />

                    <Field
                        name={'state'}
                        component={InputField}
                        hint={Lng.t('customers.address.state', { locale })}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCapitalize: 'none',
                            autoCorrect: true,
                            onSubmitEditing: () => {
                                companyRefs.city.focus();
                            }
                        }}
                    />

                    <Field
                        name={'city'}
                        component={InputField}
                        hint={Lng.t('customers.address.city', { locale })}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCapitalize: 'none',
                            autoCorrect: true,
                            onSubmitEditing: () => {
                                companyRefs.street1.focus();
                            }
                        }}
                        refLinkFn={ref => {
                            companyRefs.city = ref;
                        }}
                    />

                    <Field
                        name={'address_street_1'}
                        component={InputField}
                        hint={Lng.t('settings.company.address', { locale })}
                        inputProps={{
                            returnKeyType: 'next',
                            placeholder: Lng.t('settings.company.street1', {
                                locale
                            }),
                            autoCorrect: true,
                            multiline: true,
                            maxLength: MAX_LENGTH
                        }}
                        height={60}
                        autoCorrect={true}
                        refLinkFn={ref => {
                            companyRefs.street1 = ref;
                        }}
                    />

                    <Field
                        name={'address_street_2'}
                        component={InputField}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCapitalize: 'none',
                            placeholder: Lng.t('settings.company.street2', {
                                locale
                            }),
                            autoCorrect: true,
                            multiline: true,
                            maxLength: MAX_LENGTH
                        }}
                        height={60}
                        autoCorrect={true}
                        containerStyle={styles.addressStreetField}
                    />

                    <Field
                        name={'zip'}
                        component={InputField}
                        hint={Lng.t('settings.company.zipcode', { locale })}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCapitalize: 'none',
                            onSubmitEditing: handleSubmit(this.onCompanyUpdate)
                        }}
                    />
                </View>
            </DefaultLayout>
        );
    }
}
