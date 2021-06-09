// @flow

import React from 'react';
import { View } from 'react-native';
import { find } from 'lodash';
import styles from './styles';
import { DefaultLayout, CtButton, SelectField } from '@/components';
import { Field, change } from 'redux-form';
import Lng from '@/lang/i18n';
import { EDIT_LANGUAGE_AND_CURRENCY } from '../../constants';
import { goBack, MOUNT, UNMOUNT } from '@/navigation';
import { headerTitle } from '@/styles';
import { SymbolStyle } from '@/components/CurrencyFormat/styles';
import { hasObjectLength, isArray } from '@/constants';

type IProps = {
    navigation: Object,
    locale: String,
    handleSubmit: Function,
    handleSubmit: Function,
    formValues: Object,
    languages: Object,
    timezones: Object,
    dateFormats: Object,
    currencies: Object,
    getPreferencesLoading: Boolean,
    getSettingItemLoading: Boolean
};

export class LanguageAndCurrency extends React.Component<IProps> {
    constructor(props) {
        super(props);

        this.state = {
            currencyList: [],
            languagesList: []
        };
    }

    componentWillMount() {
        const { getPreferences, getGeneralSetting } = this.props;

        getPreferences({
            onResult: val => {
                const { language, currency, currencies } = val;
                this.setFormField('language', language);
                this.setFormField('currency', currency);
                this.setState({
                    currencyList: this.getCurrenciesList(currencies)
                });

                getGeneralSetting({
                    url: 'languages',
                    onSuccess: language => {
                        this.setState({
                            languagesList: this.getLanguagesList(language)
                        });
                    }
                });
            }
        });
    }

    componentDidMount() {
        const { navigation } = this.props;
        goBack(MOUNT, navigation);
    }

    componentWillUnmount() {
        goBack(UNMOUNT);
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(EDIT_LANGUAGE_AND_CURRENCY, field, value));
    };

    onSubmit = values => {
        if (this.isLoading()) {
            return;
        }

        const {
            navigation,
            editPreferences,
            clearPreferences,
            locale
        } = this.props;
        const { currencyList } = this.state;

        clearPreferences();
        editPreferences({
            params: values,
            navigation,
            currencies: currencyList,
            locale
        });
    };

    BOTTOM_ACTION = handleSubmit => {
        const { editPreferencesLoading, locale } = this.props;
        return (
            <View style={styles.submitButton}>
                <CtButton
                    onPress={handleSubmit(this.onSubmit)}
                    btnTitle={Lng.t('button.save', { locale })}
                    loading={editPreferencesLoading}
                />
            </View>
        );
    };

    getCurrenciesList = currencies => {
        let currencyList = [];
        if (typeof currencies !== 'undefined' && currencies.length != 0) {
            currencies.map(currency => {
                const { name, code, symbol } = currency;

                currencyList.push({
                    title: name,
                    subtitle: {
                        title: code
                    },
                    rightTitle: symbol || '-',
                    fullItem: currency
                });
            });
        }
        return currencyList;
    };

    getLanguagesList = languages => {
        const languageList = [];
        if (typeof languages !== 'undefined' && languages) {
            languages.map(language => {
                const { name } = language;
                languageList.push({
                    title: name,
                    leftAvatar: name.toUpperCase().charAt(0),
                    fullItem: language
                });
            });
        }
        return languageList;
    };

    getSelectedField = (items, find, field) => {
        let newData = [];
        if (isArray(items)) {
            newData = items.filter(item => {
                let filterData = false;
                let itemField = item.fullItem
                    ? item.fullItem[field].toString()
                    : item[field].toString();

                if (itemField === find) filterData = true;

                return filterData;
            });
        }

        if (newData.length !== 0) {
            let { name } = newData[0].fullItem;
            return name;
        }
        return '  ';
    };

    isLoading = () => {
        const { formValues } = this.props;
        const { currencyList, languagesList } = this.state;

        return (
            !isArray(languagesList) ||
            !isArray(currencyList) ||
            !hasObjectLength(formValues)
        );
    };

    getSelectedCurrencySymbol = () => {
        const { currencyList } = this.state;
        const { formValues } = this.props;

        if (!isArray(currencyList) || !formValues?.currency) {
            return null;
        }

        const currency = find(currencyList, {
            fullItem: { id: Number(formValues.currency) }
        });

        return currency?.fullItem?.symbol;
    };

    render() {
        const {
            navigation,
            handleSubmit,
            locale,
            formValues: { currency },
            formValues
        } = this.props;

        const { currencyList, languagesList } = this.state;

        return (
            <DefaultLayout
                headerProps={{
                    leftIconPress: () => navigation.goBack(null),
                    title: Lng.t('header.setting.LanguageAndCurrency', {
                        locale
                    }),
                    placement: 'center',
                    rightIcon: 'save',
                    rightIconProps: {
                        solid: true
                    },
                    rightIconPress: handleSubmit(this.onSubmit),
                    titleStyle: styles.titleStyle
                }}
                bottomAction={this.BOTTOM_ACTION(handleSubmit)}
                loadingProps={{
                    is: this.isLoading()
                }}
            >
                <View style={styles.mainContainer}>
                    <Field
                        name="language"
                        items={languagesList}
                        component={SelectField}
                        label={Lng.t('settings.preferences.language', {
                            locale
                        })}
                        icon="language"
                        rightIcon="angle-right"
                        displayName="name"
                        placeholder={
                            formValues?.language
                                ? this.getSelectedField(
                                      languagesList,
                                      formValues.language,
                                      'code'
                                  )
                                : Lng.t(
                                      'settings.preferences.languagePlaceholder',
                                      { locale }
                                  )
                        }
                        navigation={navigation}
                        fakeInputProps={{
                            valueStyle: styles.selectedField,
                            placeholderStyle: styles.selectedField
                        }}
                        searchFields={['name']}
                        compareField="code"
                        onSelect={val => {
                            this.setFormField('language', val.code);
                        }}
                        headerProps={{
                            title: Lng.t('languages.title', { locale }),
                            rightIconPress: null
                        }}
                        listViewProps={{
                            hasAvatar: true
                        }}
                        emptyContentProps={{
                            contentType: 'languages'
                        }}
                        isRequired
                        isInternalSearch
                    />

                    <Field
                        name="currency"
                        items={currencyList}
                        displayName="name"
                        component={SelectField}
                        label={Lng.t('settings.preferences.currency', {
                            locale
                        })}
                        rightIcon="angle-right"
                        placeholder={
                            currency
                                ? this.getSelectedField(
                                      currencyList,
                                      currency,
                                      'id'
                                  )
                                : Lng.t(
                                      'settings.preferences.currencyPlaceholder',
                                      { locale }
                                  )
                        }
                        navigation={navigation}
                        searchFields={['name']}
                        compareField="id"
                        fakeInputProps={{
                            valueStyle: styles.selectedField,
                            placeholderStyle: styles.selectedField,
                            leftSymbol: this.getSelectedCurrencySymbol()
                        }}
                        onSelect={val => {
                            this.setFormField('currency', val.id);
                        }}
                        headerProps={{
                            title: Lng.t('currencies.title', { locale }),
                            titleStyle: headerTitle({
                                marginLeft: -20,
                                marginRight: -52
                            }),
                            rightIconPress: null
                        }}
                        emptyContentProps={{
                            contentType: 'currencies'
                        }}
                        isRequired
                        listViewProps={{
                            contentContainerStyle: { flex: 5 },
                            rightTitleStyle: SymbolStyle
                        }}
                        isInternalSearch
                    />
                </View>
            </DefaultLayout>
        );
    }
}
