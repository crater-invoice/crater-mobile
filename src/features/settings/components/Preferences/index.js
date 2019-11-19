// @flow

import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import {
    DefaultLayout,
    CtButton,
    SelectField,
    ToggleSwitch,
    CtDivider
} from '../../../../components';
import { Field, change } from 'redux-form';
import Lng from '../../../../api/lang/i18n';
import { EDIT_PREFERENCES } from '../../constants';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';
import { headerTitle } from '../../../../api/helper';

type IProps = {
    navigation: Object,
    language: String,
    handleSubmit: Function,
    handleSubmit: Function,
    formValues: Object,
    languages: Object,
    timezones: Object,
    dateFormats: Object,
    currencies: Object,
}

export class Preferences extends React.Component<IProps> {
    constructor(props) {
        super(props);

        this.state = {
            timezoneList: [],
            dateFormatList: [],
            fiscalYearLst: [],
            discountPerItem: null,
            taxPerItem: null,
            visibleToast: false
        }
    }

    componentWillMount() {
        const {
            getPreferences,
            getSettingItem
        } = this.props

        getPreferences({
            onResult: (val) => {
                const { time_zones, date_formats, fiscal_years } = val
                const dateFormatList = this.getDateFormatList(date_formats)
                const timezoneList = this.getTimeZoneList(time_zones)
                const fiscalYearLst = this.getFiscalYearList(fiscal_years)
                this.setState({ timezoneList, dateFormatList, fiscalYearLst })
            }
        })
        getSettingItem({
            key: 'discount_per_item',
            onResult: (val) => {
                this.setState({ discountPerItem: val !== null ? val : 'NO' })
            }
        })

        getSettingItem({
            key: 'tax_per_item',
            onResult: (val) => {
                this.setState({ taxPerItem: val !== null ? val : 'NO' })
            }
        })
    }

    componentDidMount() {
        const { navigation } = this.props
        goBack(MOUNT, navigation)
    }

    componentWillUnmount() {
        goBack(UNMOUNT)
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(EDIT_PREFERENCES, field, value));
    };

    onSubmitPreferences = (values) => {
        const {
            navigation,
            editPreferences,
            clearPreferences,
            currencies,
            editPreferencesLoading, editSettingItemLoading
        } = this.props

        if (!(editPreferencesLoading || editSettingItemLoading)) {
            clearPreferences()
            editPreferences({ params: values, navigation, currencies })
        }

    }

    BOTTOM_ACTION = (handleSubmit) => {
        const { editPreferencesLoading, language } = this.props
        return (
            <View style={styles.submitButton}>
                <CtButton
                    onPress={handleSubmit(this.onSubmitPreferences)}
                    btnTitle={Lng.t("button.save", { locale: language })}
                    loading={editPreferencesLoading}
                />
            </View>
        )
    }

    getTimeZoneList = (timezones) => {

        let timeZoneList = []
        if (typeof timezones !== 'undefined') {

            timeZoneList = timezones.map((timezone) => {

                return {
                    title: timezone.key,
                    fullItem: timezone
                }
            })
        }

        return timeZoneList

    }

    getFiscalYearList = (fiscalYears) => {

        let years = []
        if (typeof fiscalYears !== 'undefined') {
            years = fiscalYears.map((year) => {

                const { key } = year
                return {
                    title: key,
                    fullItem: year
                }
            })
        }
        return years
    }

    getDateFormatList = (dateFormats) => {

        let dateFormatList = []
        if (typeof dateFormats !== 'undefined') {
            dateFormatList = dateFormats.map((dateformat) => {

                const { display_date } = dateformat
                return {
                    title: display_date,
                    fullItem: dateformat
                }
            })
        }
        return dateFormatList
    }

    setDiscountPerItem = (val) => {
        const { editSettingItem } = this.props

        editSettingItem({
            params: {
                key: 'discount_per_item',
                value: val === true ? 'YES' : 'NO'
            },
            onResult: () => { this.toggleToast() }
        })
    }

    setTaxPerItem = (val) => {
        const { editSettingItem } = this.props

        editSettingItem({
            params: {
                key: 'tax_per_item',
                value: val === true ? 'YES' : 'NO'
            },
            onResult: () => { this.toggleToast() }
        })
    }

    toggleToast = () => {
        this.setState({ visibleToast: true })
    }

    render() {

        const {
            navigation,
            handleSubmit,
            language,
            formValues: {
                time_zone,
            },
            dateFormats,
            isLoading,
        } = this.props;

        const {
            timezoneList,
            dateFormatList,
            fiscalYearLst,
            discountPerItem,
            taxPerItem,
            visibleToast
        } = this.state

        return (
            <DefaultLayout
                headerProps={{
                    leftIconPress: () => navigation.goBack(null),
                    title: Lng.t("header.setting.preferences", { locale: language }),
                    placement: "center",
                    rightIcon: "save",
                    rightIconProps: {
                        solid: true,
                    },
                    rightIconPress: handleSubmit(this.onSubmitPreferences),
                }}
                bottomAction={this.BOTTOM_ACTION(handleSubmit)}
                loadingProps={{
                    is: isLoading || timezoneList.length === 0 || dateFormatList.length === 0 || discountPerItem === null || taxPerItem === null
                }}
                toastProps={{
                    message: Lng.t("settings.preferences.settingUpdate", { locale: language }),
                    visible: visibleToast
                }}
            >

                <View style={styles.mainContainer}>

                    <Field
                        name="time_zone"
                        items={timezoneList}
                        displayName="key"
                        component={SelectField}
                        label={Lng.t("settings.preferences.timeZone", { locale: language })}
                        icon='clock'
                        rightIcon='angle-right'
                        placeholder={time_zone ?
                            time_zone :
                            Lng.t("settings.preferences.timeZonePlaceholder", { locale: language })
                        }
                        fakeInputProps={{
                            valueStyle: styles.selectedField,
                            placeholderStyle: styles.selectedField,
                        }}
                        navigation={navigation}
                        searchFields={['key']}
                        compareField="value"
                        onSelect={(val) => {
                            this.setFormField('time_zone', val.value)
                        }}
                        headerProps={{
                            title: Lng.t("timeZones.title", { locale: language }),
                            titleStyle: headerTitle({ marginLeft: -23, marginRight: -40 }),
                            rightIconPress: null
                        }}
                        emptyContentProps={{
                            contentType: "timeZones",
                        }}
                        isRequired
                    />

                    <Field
                        name="date_format"
                        items={dateFormatList}
                        displayName="display_date"
                        component={SelectField}
                        label={Lng.t("settings.preferences.dateFormat", { locale: language })}
                        icon='calendar-alt'
                        rightIcon='angle-right'
                        placeholder={Lng.t("settings.preferences.dateFormatPlaceholder", { locale: language })}
                        fakeInputProps={{
                            valueStyle: styles.selectedField,
                            placeholderStyle: styles.selectedField,
                        }}
                        navigation={navigation}
                        searchFields={['display_date']}
                        compareField="carbon_format_value"
                        onSelect={(val) => {
                            this.setFormField('carbon_date_format', val.carbon_format_value)
                            this.setFormField('moment_date_format', val.moment_format_value)
                            this.setFormField('date_format', val.carbon_format_value)
                        }}
                        headerProps={{
                            title: Lng.t("dateFormats.title", { locale: language }),
                            titleStyle: headerTitle({ marginLeft: -20, marginRight: -55 }),
                            rightIconPress: null
                        }}
                        emptyContentProps={{
                            contentType: "dateFormats",
                        }}
                        isRequired
                    />

                    <Field
                        name="fiscal_year"
                        items={fiscalYearLst}
                        displayName="key"
                        component={SelectField}
                        label={Lng.t("settings.preferences.fiscalYear", { locale: language })}
                        icon='calendar-alt'
                        rightIcon='angle-right'
                        placeholder={Lng.t("settings.preferences.fiscalYearPlaceholder", { locale: language })}
                        fakeInputProps={{
                            valueStyle: styles.selectedField,
                            placeholderStyle: styles.selectedField,
                        }}
                        navigation={navigation}
                        searchFields={['key']}
                        compareField="value"
                        onSelect={(val) => {
                            this.setFormField('fiscal_year', val.value)
                        }}
                        headerProps={{
                            title: Lng.t("fiscalYears.title", { locale: language }),
                            titleStyle: headerTitle({ marginLeft: -15, marginRight: -35 }),
                            rightIconPress: null
                        }}
                        emptyContentProps={{
                            contentType: "fiscalYears",
                        }}
                        isRequired
                    />
                    <CtDivider
                        dividerStyle={styles.dividerLine}
                    />

                    <Field
                        name="discount_per_item"
                        component={ToggleSwitch}
                        status={discountPerItem === 'YES' ? true : false}
                        hint={Lng.t("settings.preferences.discountPerItem", { locale: language })}
                        description={Lng.t("settings.preferences.discountPerItemPlaceholder", { locale: language })}
                        onChangeCallback={(val) => this.setDiscountPerItem(val)
                        }
                    />

                    <Field
                        name="tax_per_item"
                        component={ToggleSwitch}
                        status={taxPerItem === 'YES' ? true : false}
                        hint={Lng.t("settings.preferences.taxPerItem", { locale: language })}
                        description={Lng.t("settings.preferences.taxPerItemPlaceholder", { locale: language })}
                        onChangeCallback={(val) => this.setTaxPerItem(val)
                        }
                        mainContainerStyle={{ marginVertical: 12 }}
                    />

                </View>
            </DefaultLayout>
        );
    }
}
