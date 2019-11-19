// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { change } from 'redux-form';
import styles from './styles';
import { SlideModal, FakeInput } from '../../../../components';
import Lng from '../../../../api/lang/i18n';
import { colors } from '../../../../styles/colors';

type IProps = {
    label: String,
    icon: String,
    onChangeCallback: Function,
    placeholder: String,
    containerStyle: Object,
    leftIcon: String,
    color: String,
    value: String,
    items: Object,
    type: String,
    isRequired: Boolean,
};

let COUNTRY = 'country'
let STATE = 'state'
let CITY = 'city'


export class AddressField extends Component<IProps> {
    constructor(props) {
        super(props);

        this.state = {
            newAddressValue: [],
            found: true,
            visible: false,
            values: '',
            search: '',
        };

    }

    onToggle = () => {

        const { search } = this.state

        this.setState((prevState) => {
            return {
                visible: !prevState.visible,
                newAddressValue: [],
                search: ''
            }
        });

        if (search)
            this.props.meta.dispatch(change(this.props.meta.form, 'search', ''));

    }

    onSelect = (item) => {

        const {
            onChangeCallback,
            type,
            getStates,
            getCities
        } = this.props

        let { id, name } = item

        if (type === COUNTRY) {
            this.setState({
                values: `${name}   (${item.code})`
            })

            this.onToggle()
            onChangeCallback(id)
            getStates({ countryId: id })
        }
        else if (type === STATE) {
            this.setState({ values: `${name}` })

            this.onToggle()
            onChangeCallback(id)
            getCities({ stateID: id })
        }
        else if (type === CITY) {
            this.setState({ values: `${name}` })

            this.onToggle()
            onChangeCallback(id)
        }

    }

    onSearch = (search) => {

        const {
            type,
            countries,
            states,
            cities,
        } = this.props

        let items = []

        if (type === COUNTRY)
            items = countries
        else if (type === STATE)
            items = states
        else if (type === CITY)
            items = cities

        if (typeof items !== 'undefined' && items.length != 0) {
            let newData = items.filter((item) => {
                const items = item.name.toUpperCase()
                const searchName = search.toUpperCase()
                return items.indexOf(searchName) > -1
            });

            let newAddressValue = this.itemList(newData)

            this.setState({
                newAddressValue,
                found: newAddressValue.length != 0 ? true : false,
                search
            })
        }

    }

    selectedField = (id) => {
        const { countries, states, cities, type } = this.props
        let items = []
        let value = ''
        if (id && id !== null && typeof id !== 'undefined') {
            if (type === COUNTRY)
                items = countries
            else if (type === STATE)
                items = states
            else if (type === CITY)
                items = cities

            if (typeof items !== 'undefined' && items.length != 0) {
                const newData = items.filter((item) => {
                    const items = item.id
                    return items === id
                });

                if (newData.length !== 0) {
                    let { name } = newData[0]
                    if (type === COUNTRY) {
                        let { code } = newData[0]
                        value = `${name}   (${code})`
                    }
                    else
                        value = name
                }
            }
        }

        return value
    }

    itemList = (items) => {
        const { type } = this.props
        let itemList = []

        if (typeof items !== 'undefined' && items.length != 0) {
            if (type === COUNTRY) {
                itemList = items.map((item) => {
                    const { name, code } = item
                    return {
                        title: name,
                        rightTitle: code,
                        fullItem: item
                    }
                })
            }
            else if (type === STATE || type === CITY) {
                itemList = items.map((item) => {
                    const { name } = item
                    return {
                        title: name,
                        fullItem: item
                    }
                })
            }

        }
        return itemList
    }


    render() {
        const {
            containerStyle,
            loading,
            label,
            icon,
            placeholder,
            meta,
            type,
            countries,
            states,
            cities,
            selectedCountry,
            selectedState,
            selectedCity,
            countriesLoading,
            statesLoading,
            citiesLoading,
            language,
            placeholderStyle,
            isRequired,
        } = this.props;

        const {
            visible,
            values,
            search,
            newAddressValue,
            found,
        } = this.state

        let itemList = []
        let selectedValue = ''
        let title = ''
        let empty = ''
        let fakeInputLoading = false


        if (type === COUNTRY) {
            itemList = this.itemList(countries)
            selectedValue = this.selectedField(selectedCountry)
            title = Lng.t("header.country", { locale: language })
            empty = Lng.t("customers.empty.country.title", { locale: language })
            fakeInputLoading = countriesLoading
        }
        else if (type === STATE) {
            itemList = this.itemList(states)
            selectedValue = this.selectedField(selectedState)
            title = Lng.t("header.state", { locale: language })
            empty = Lng.t("customers.empty.state.title", { locale: language })
            fakeInputLoading = statesLoading
        }
        else if (type === CITY) {
            itemList = this.itemList(cities)
            selectedValue = this.selectedField(selectedCity)
            title = Lng.t("header.city", { locale: language })
            empty = Lng.t("customers.empty.city.title", { locale: language })
            fakeInputLoading = citiesLoading
        }

        return (
            <View style={styles.container}>
                <FakeInput
                    label={label}
                    icon={icon}
                    rightIcon='angle-right'
                    isRequired={isRequired}
                    values={values ? values : selectedValue}
                    valueStyle={styles.addressValueStyle}
                    placeholder={placeholder}
                    placeholderStyle={
                        [placeholderStyle && placeholderStyle,
                        { color: colors.secondary }]
                    }
                    onChangeCallback={this.onToggle}
                    containerStyle={containerStyle}
                    meta={meta}
                    loading={fakeInputLoading}
                />

                <SlideModal
                    visible={visible}
                    onToggle={this.onToggle}
                    headerProps={{
                        leftIcon: "long-arrow-alt-left",
                        leftIconPress: () => this.onToggle(),
                        title: title,
                        titleStyle: styles.headerTitle,
                        placement: "center",
                        hasCircle: false,
                        noBorder: false,
                        transparent: false,
                    }}
                    onSearch={this.onSearch}
                    searchInputProps={{
                        autoFocus: true
                    }}
                    bottomDivider
                    listViewProps={{
                        items: newAddressValue.length != 0 ? newAddressValue
                            : found ? itemList : [],
                        onPress: this.onSelect,
                        loading: loading,
                        isEmpty: found ? itemList.length <= 0 : true,
                        bottomDivider: true,
                        emptyContentProps: {
                            title: found ? empty :
                                Lng.t("search.noResult", { locale: language, search }),
                        },
                        contentContainerStyle: { flex: 7 }
                    }}
                />
            </View>
        );
    }
}
