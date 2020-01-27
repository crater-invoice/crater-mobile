// @flow

import React from 'react';
import { View } from 'react-native';
import { change } from 'redux-form';
import styles from './styles';
import {
    MainLayout,
    ListView
} from '../../../../components';
import { ROUTES } from '../../../../navigation/routes';
import { IMAGES } from '../../../../config';
import Lng from '../../../../api/lang/i18n';
import { ADD_ITEM, EDIT_ITEM, ITEM_SEARCH } from '../../constants';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';
import { itemsDescriptionStyle } from '../../../invoices/components/Invoice/styles';
import { formatSelectPickerName } from '../../../../api/global';

type IProps = {
    navigation: Object,
    getItems: Function,
    items: Object,
    loading: Boolean,
    language: String,
}


let params = {
    search: '',
    unit_id: '',
    price: '',
}

export class Items extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            fresh: true,
            pagination: {
                page: 1,
                limit: 10,
                lastPage: 1,
            },
            search: '',
            selectedUnit: '',
            filter: false
        };
    }

    componentDidMount() {
        const { navigation, getItemUnits } = this.props
        this.getItems({ fresh: true });
        getItemUnits()

        goBack(MOUNT, navigation, { route: ROUTES.MAIN_MORE })
    }

    componentWillUnmount() {
        goBack(UNMOUNT)
    }

    onItemSelect = ({ id }) => {
        const { navigation } = this.props
        navigation.navigate(ROUTES.GLOBAL_ITEM, { type: EDIT_ITEM, id })
        this.onResetFilter()
    }

    getItems = ({
        fresh = false,
        onResult,
        params,
        filter = false
    } = {}) => {
        const { getItems } = this.props;
        const { refreshing, pagination } = this.state;

        if (refreshing) {
            return;
        }

        this.setState({
            refreshing: true,
            fresh,
        });

        const paginationParams = fresh ? { ...pagination, page: 1 } : pagination;

        if (!fresh && paginationParams.lastPage < paginationParams.page) {
            return;
        }

        getItems({
            fresh,
            pagination: paginationParams,
            params,
            filter,
            onMeta: ({ last_page, current_page }) => {
                this.setState({
                    pagination: {
                        ...paginationParams,
                        lastPage: last_page,
                        page: current_page + 1,
                    },
                });
            },
            onResult: (val) => {
                this.setState({
                    refreshing: false,
                    fresh: !val,
                });
                onResult && onResult();
            },
        });
    };


    onResetFilter = () => {
        this.setState({ filter: false })
    }

    onSubmitFilter = ({ unit_id = '', name = '', price = '' }) => {

        if (unit_id || name || price) {
            this.setState({ filter: true })

            this.getItems({
                fresh: true,
                params: {
                    ...params,
                    search: name,
                    unit_id,
                    price,
                },
                filter: true
            })
        }
        else
            this.onResetFilter()
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(ITEM_SEARCH, field, value));

        if (field === 'unit_id')
            this.setState({ selectedUnit: value })
    };

    onSearch = (search) => {
        this.onResetFilter()
        this.setState({ search })
        this.getItems({ fresh: true, params: { ...params, search } })
    };

    getItemList = (items) => {
        const { currency } = this.props
        let itemList = []

        if (typeof items !== 'undefined' && items.length != 0) {

            itemList = items.map((item) => {

                let { name, description, price, title } = item

                return {
                    title: title || name,
                    subtitle: {
                        title: description,
                    },
                    amount: price,
                    currency,
                    fullItem: item,
                };
            });
        }

        return itemList
    }

    loadMoreItems = () => {
        const { search, filter } = this.state

        const {
            formValues: {
                unit_id = '',
                name = '',
                price = ''
            }
        } = this.props

        if (filter) {
            this.getItems({
                params: {
                    ...params,
                    search: name,
                    unit_id,
                    price,
                },
                filter: true
            })
        }
        else
            this.getItems({ params: { ...params, search } });
    }


    render() {

        const {
            navigation,
            items,
            filterItems,
            units,
            loading,
            itemUnitsLoading = false,
            language,
            handleSubmit
        } = this.props;

        const {
            refreshing,
            pagination: { lastPage, page },
            fresh,
            search,
            selectedUnit,
            filter
        } = this.state;

        const canLoadMore = lastPage >= page;

        let filterRefs = {}

        let inputFields = [
            {
                name: 'name',
                hint: Lng.t("items.name", { locale: language }),
                inputProps: {
                    returnKeyType: 'next',
                    autoCorrect: true,
                    autoFocus: true,
                    onSubmitEditing: () => {
                        filterRefs.price.focus();
                    }
                },
                refLinkFn: (ref) => {
                    filterRefs.name = ref;
                }
            },
            {
                name: 'price',
                hint: Lng.t("items.price", { locale: language }),
                inputProps: {
                    returnKeyType: 'next',
                    keyboardType: 'numeric'
                },
                isCurrencyInput: true,
                refLinkFn: (ref) => {
                    filterRefs.price = ref;
                }
            }
        ]

        let dropdownFields = [{
            name: "unit_id",
            label: Lng.t("items.unit", { locale: language }),
            fieldIcon: 'align-center',
            items: formatSelectPickerName(units),
            onChangeCallback: (val) => {
                this.setFormField('unit_id', val)
            },
            defaultPickerOptions: {
                label: Lng.t("items.unitPlaceholder", { locale: language }),
                value: '',

            },
            selectedItem: selectedUnit,
            onDonePress: () => filterRefs.name.focus(),
            containerStyle: styles.selectPicker
        }]

        let empty = (!filter && !search) ? {
            description: Lng.t("items.empty.description", { locale: language }),
            buttonTitle: Lng.t("items.empty.buttonTitle", { locale: language }),
            buttonPress: () => {
                navigation.navigate(ROUTES.GLOBAL_ITEM, { type: ADD_ITEM })
                this.onResetFilter()
            }
        } : {}

        let emptyTitle = search ? Lng.t("search.noResult", { locale: language, search })
            : (!filter) ? Lng.t("items.empty.title", { locale: language }) :
                Lng.t("filter.empty.filterTitle", { locale: language })


        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={{
                        title: Lng.t("header.items", { locale: language }),
                        leftIcon: "long-arrow-alt-left",
                        leftIconPress: () => navigation.navigate(ROUTES.MAIN_MORE),
                        title: Lng.t("header.items", { locale: language }),
                        titleStyle: styles.headerTitle,
                        rightIcon: "plus",
                        placement: "center",
                        rightIcon: "plus",
                        rightIconPress: () => {
                            navigation.navigate(ROUTES.GLOBAL_ITEM, { type: ADD_ITEM })
                            this.onResetFilter()
                        },
                    }}
                    onSearch={this.onSearch}
                    bottomDivider
                    onFocus={() => { }}
                    filterProps={{
                        onSubmitFilter: handleSubmit(this.onSubmitFilter),
                        inputFields: inputFields,
                        dropdownFields: dropdownFields,
                        clearFilter: this.props,
                        onResetFilter: () => this.onResetFilter()
                    }}
                    loadingProps={{ is: loading || itemUnitsLoading }}
                >
                    <View style={styles.listViewContainer} >
                        <ListView
                            items={!filter ? this.getItemList(items) :
                                this.getItemList(filterItems)
                            }
                            onPress={this.onItemSelect}
                            refreshing={refreshing}
                            loading={loading}
                            isEmpty={!filter ? items && items.length <= 0 : filterItems.length <= 0}
                            canLoadMore={canLoadMore}
                            getFreshItems={(onHide) => {
                                this.onResetFilter()
                                this.getItems({
                                    fresh: true,
                                    onResult: onHide,
                                    params: { ...params, search }
                                });
                            }}
                            getItems={() => {
                                this.loadMoreItems()
                            }}
                            bottomDivider
                            leftSubTitleStyle={itemsDescriptionStyle()}
                            emptyContentProps={{
                                title: emptyTitle,
                                image: IMAGES.EMPTY_ITEMS,
                                ...empty
                            }}
                        />
                    </View>

                </MainLayout>
            </View>
        );
    }
}

