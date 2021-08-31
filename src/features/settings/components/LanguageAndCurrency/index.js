// @flow

import React from 'react';
import { find } from 'lodash';
import styles from './styles';
import { DefaultLayout, SelectField, ActionButton } from '@/components';
import { Field, change } from 'redux-form';
import t from 'locales/use-translation';
import { EDIT_LANGUAGE_AND_CURRENCY } from '../../constants';
import { goBack, MOUNT, UNMOUNT } from '@/navigation';
import { SymbolStyle } from '@/components/CurrencyFormat/styles';
import { hasObjectLength, isArray } from '@/constants';

type IProps = {
    navigation: Object,
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
        const { getPreferences, getGeneralSetting, currencies } = this.props;
        getPreferences({
            onResult: val => {
                const { language, currency } = val;
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
            formValues: { currency },
            editPreferencesLoading,
            formValues,
            theme
        } = this.props;

        const { currencyList, languagesList } = this.state;
        const bottomAction = [
            {
                label: 'button.save',
                onPress: handleSubmit(this.onSubmit),
                loading: editPreferencesLoading || this.isLoading()
            }
        ];

        return (
            <DefaultLayout
                headerProps={{
                    leftIconPress: () => navigation.goBack(null),
                    title: t('header.setting.LanguageAndCurrency'),
                    placement: 'center',
                    rightIcon: 'save',
                    rightIconProps: {
                        solid: true
                    },
                    rightIconPress: handleSubmit(this.onSubmit)
                }}
                bottomAction={<ActionButton buttons={bottomAction} />}
                loadingProps={{
                    is: this.isLoading()
                }}
            >
                <Field
                    name="language"
                    items={languagesList}
                    component={SelectField}
                    label={t('settings.preferences.language')}
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
                            : t('settings.preferences.languagePlaceholder')
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
                        title: t('languages.title'),
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
                    label={t('settings.preferences.currency')}
                    rightIcon="angle-right"
                    placeholder={
                        currency
                            ? this.getSelectedField(
                                  currencyList,
                                  currency,
                                  'id'
                              )
                            : t('settings.preferences.currencyPlaceholder')
                    }
                    navigation={navigation}
                    searchFields={['name']}
                    compareField="id"
                    fakeInputProps={{
                        valueStyle: styles.selectedField,
                        placeholderStyle: styles.selectedField,
                        leftSymbol: this.getSelectedCurrencySymbol(),
                        leftSymbolStyle: {
                            color: theme?.icons?.secondaryColor
                        }
                    }}
                    onSelect={val => {
                        this.setFormField('currency', val.id);
                    }}
                    headerProps={{
                        title: t('currencies.title'),
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
            </DefaultLayout>
        );
    }
}
