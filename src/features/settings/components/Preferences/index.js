// @flow

import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import {
    DefaultLayout,
    CtButton,
    SelectField,
    ToggleSwitch,
    CtDivider
} from '@/components';
import { Field, change } from 'redux-form';
import Lng from '@/lang/i18n';
import { EDIT_PREFERENCES } from '../../constants';
import { goBack, MOUNT, UNMOUNT } from '@/navigation';
import { headerTitle } from '@/styles';
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

    componentDidMount() {
        this.fetchPreferencesValues()
        goBack(MOUNT, this.props.navigation)
    }

    componentWillUnmount() {
        goBack(UNMOUNT)
    }

    fetchPreferencesValues = () => {
        const { getPreferences, getGeneralSetting } = this.props

        getPreferences({
            onResult: ({ settings }) => this.setFormValues(settings)
        })

        getGeneralSetting({
            url: 'timezones',
            responseUrl: 'time_zones',
            onSuccess:(timezones)=>{
            this.setState({
                timezoneList: this.getTimeZoneList(timezones)
            })
        }})

        getGeneralSetting({
            url: 'date/formats',
            responseUrl: 'date_formats',
            onSuccess:(dateFormat)=>{
                this.setState({
                    dateFormatList: this.getDateFormatList(dateFormat)
                })
            }
        })

        getGeneralSetting({
            url: 'fiscal/years',
            responseUrl: 'fiscal_years',
            onSuccess:(financialYear)=>{
                this.setState({
                    fiscalYearLst: this.getFiscalYearList(financialYear)
                })
            }
        })
    }

    setFormValues = (settings = {}) => {
        const {
            carbon_date_format,
            moment_date_format,
            time_zone,
            fiscal_year,
            discount_per_item,
            tax_per_item
        } = settings

        this.setFormField('carbon_date_format', carbon_date_format);
        this.setFormField('moment_date_format', moment_date_format);
        this.setFormField('date_format', moment_date_format.trim());
        this.setFormField('time_zone', time_zone);
        this.setFormField('fiscal_year', fiscal_year);
        this.setFormField('discount_per_item', discount_per_item === 'YES' || discount_per_item === 1);
        this.setFormField('tax_per_item', tax_per_item === 'YES' || tax_per_item === 1);
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
        const { editPreferencesLoading, locale } = this.props
        return (
            <View style={styles.submitButton}>
                <CtButton
                    onPress={handleSubmit(this.onSubmitPreferences)}
                    btnTitle={Lng.t("button.save", { locale })}
                    loading={editPreferencesLoading}
                />
            </View>
        )
    }

    getTimeZoneList = (timezones) => {

        if(!isArray(timezones)){
            return []
        }

        return timezones.map((timezone) => {
            return { title: timezone.key, fullItem: timezone }
        })
    }

    getFiscalYearList = (fiscalYears) => {

        if(!isArray(fiscalYears)){
            return []
        }

        return  fiscalYears.map((year) => {
            return { title: year.key, fullItem: year }
        })
    }

    getDateFormatList = (dateFormats) => {

        if(!isArray(dateFormats)){
            return []
        }

        return dateFormats.map((dateformat) => {
            let trimDates = {}
            for (const key in dateformat) {
                trimDates = {
                    ...trimDates,
                    [key]: dateformat[key].trim()
                }
            }

            return {
                title: dateformat.display_date,
                fullItem: dateformat
            }
        })
    }

    setDiscountPerItem = (val) => {
        const { editSettingItem } = this.props
        const settings = {
            discount_per_item: val === true ? 'YES' : 'NO'
        }

        editSettingItem({
            params: {
                settings
            },
            onResult: () => { this.toggleToast() }
        })
    }

    setTaxPerItem = (val) => {
        const { editSettingItem } = this.props

        const settings = {
            tax_per_item: val === true ? 'YES' : 'NO'
        }

        editSettingItem({
            params: {
                settings
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
            locale,
            formValues: {
                time_zone,
            },
            formValues,
        } = this.props;

        const {
            timezoneList,
            dateFormatList,
            fiscalYearLst,
            visibleToast
        } = this.state

        return (
            <DefaultLayout
                headerProps={{
                    leftIconPress: () => navigation.goBack(null),
                    title: Lng.t("header.setting.preferences", { locale }),
                    placement: "center",
                    rightIcon: "save",
                    rightIconProps: {
                        solid: true,
                    },
                    rightIconPress: handleSubmit(this.onSubmitPreferences),
                }}
                bottomAction={this.BOTTOM_ACTION(handleSubmit)}
                loadingProps={{
                    is: !isArray(timezoneList) || !isArray(dateFormatList) || !isArray(fiscalYearLst) || !hasObjectLength(formValues)
                }}
                toastProps={{
                    message: Lng.t("settings.preferences.settingUpdate", { locale }),
                    visible: visibleToast
                }}
            >

                <View style={styles.mainContainer}>

                  <Field
                        name="time_zone"
                        items={timezoneList}
                        displayName="key"
                        component={SelectField}
                        label={Lng.t("settings.preferences.timeZone", { locale })}
                        icon='clock'
                        rightIcon='angle-right'
                        placeholder={time_zone ?
                            time_zone :
                            Lng.t("settings.preferences.timeZonePlaceholder", { locale })
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
                            title: Lng.t("timeZones.title", { locale }),
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
                        label={Lng.t("settings.preferences.dateFormat", { locale })}
                        icon='calendar-alt'
                        rightIcon='angle-right'
                        placeholder={Lng.t("settings.preferences.dateFormatPlaceholder", { locale })}
                        fakeInputProps={{
                            valueStyle: styles.selectedField,
                            placeholderStyle: styles.selectedField,
                        }}
                        navigation={navigation}
                        searchFields={['display_date']}
                        compareField="moment_format_value"
                        onSelect={(val) => {
                            this.setFormField('carbon_date_format', val.carbon_format_value)
                            this.setFormField('moment_date_format', val.moment_format_value)
                            this.setFormField('date_format', val.moment_format_value)
                        }}
                        headerProps={{
                            title: Lng.t("dateFormats.title", { locale }),
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
                        label={Lng.t("settings.preferences.fiscalYear", { locale })}
                        icon='calendar-alt'
                        rightIcon='angle-right'
                        placeholder={Lng.t("settings.preferences.fiscalYearPlaceholder", { locale })}
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
                            title: Lng.t("fiscalYears.title", { locale }),
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
                        hint={Lng.t("settings.preferences.discountPerItem", { locale })}
                        description={Lng.t("settings.preferences.discountPerItemPlaceholder", { locale })}
                        onChangeCallback={(val) => this.setDiscountPerItem(val)
                        }
                    />

                    <Field
                        name="tax_per_item"
                        component={ToggleSwitch}
                        hint={Lng.t("settings.preferences.taxPerItem", { locale })}
                        description={Lng.t("settings.preferences.taxPerItemPlaceholder", { locale })}
                        onChangeCallback={(val) => this.setTaxPerItem(val)
                        }
                        mainContainerStyle={{ marginVertical: 12 }}
                    />

                </View>
            </DefaultLayout>
        );
    }
}
