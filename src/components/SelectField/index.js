// @flow

import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import styles from './styles';
import { SlideModal, FakeInput } from '..';
import { change } from 'redux-form';
import { CtButton } from '../Button';
import Lng from '../../api/lang/i18n';
import { connect } from 'react-redux';
import { IProps } from './type';
import { headerTitle } from '../../api/helper';

export class SelectFieldComponent extends Component<IProps> {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            refreshing: false,
            pagination: {
                page: 1,
                limit: 10,
                lastPage: 1
            },
            search: '',
            visible: false,
            values: '',
            selectedItems: [],
            oldItems: [],
            defaultItem: [],
            searchItems: [],
            oldValue: '',
        };
    }

    componentDidMount() {
        const {
            input: { value },
            pagination,
            compareField,
            items,
            apiSearch,
            displayName,
            concurrentMultiSelect
        } = this.props

        if (typeof items !== 'undefined') {
            let newValue = ''

            for (const key in items) {
                if (key !== 'undefined' && items[key]['fullItem'][compareField] === value) {
                    newValue = items[key]['fullItem'][displayName]
                }
            }
            concurrentMultiSelect && this.setState({
                selectedItems: value,
                oldItems: value,
            })

            this.setState({
                values: compareField ? newValue : value[displayName],
                defaultItem: items || [],
                searchItems: items || [],
                oldValue: compareField ? value : value[displayName],
            })

        }

        apiSearch && this.onGetItems({
            fresh: true,
            onResult: () => {
                const {
                    items,
                    onSelect,
                    isMultiSelect,
                    valueCompareField,
                    compareField,
                    input: { onChange, value },
                    hasFirstItem = true
                } = this.props

                if (typeof items !== 'undefined' && items.length !== 0 && hasFirstItem) {

                    firstItem = items[0]['fullItem']

                    this.setState({
                        values: compareField && firstItem[displayName],
                        oldValue: compareField ? firstItem[compareField] : firstItem[displayName]
                    })

                    /*  if (!value) {
                         if (!onSelect) {
                             isMultiSelect ?
                                 onChange([
                                     ...[{ ...firstItem, [valueCompareField]: firstItem[compareField] }]
                                 ]) : onChange(firstItem)
                         } else {
                             onSelect(firstItem)
                         }
                     } */
                }
            }
        })

        pagination && this.setState({
            pagination
        })
    }

    componentWillUpdate(nextProps, nextState) {
        const {
            concurrentMultiSelect,
            input: { value },
            items,
            compareField,
            displayName,
        } = nextProps
        const { search, oldItems, oldValue } = nextState

        if (concurrentMultiSelect && !search && oldItems.length < value.length) {
            this.setState({
                selectedItems: value,
                oldItems: value
            })
        }

        if (typeof items !== 'undefined' && !search) {

            let newValue = ''

            for (const key in items) {
                if (key !== 'undefined' && items[key]['fullItem'][compareField] === value) {
                    newValue = items[key]['fullItem'][displayName]
                }
            }

            if (value && (oldValue !== value)) {
                this.setState({
                    oldValue: compareField ? value : value[displayName],
                    values: compareField ? newValue : value[displayName],
                })
            }

        }

    }

    onGetItems = ({
        fresh = false,
        onResult,
        q = '',
    } = {}) => {

        const { getItems } = this.props

        const {
            refreshing,
            pagination
        } = this.state;

        if (refreshing) {
            return;
        }

        const paginationParams = fresh ? { ...pagination, page: 1 } : pagination

        if (!fresh && paginationParams.lastPage < paginationParams.page) {
            return
        }

        this.setState({
            refreshing: true,
        })

        getItems && getItems({
            fresh,
            pagination: paginationParams,
            params: { search: q },
            q,
            onMeta: ({ last_page, current_page }) => {
                this.setState({
                    pagination: {
                        ...paginationParams,

                        lastPage: last_page,
                        page: current_page + 1
                    }
                })
            },
            onResult: () => {
                this.setState({
                    refreshing: false,
                })
                onResult && onResult();
            },
        });

    }

    onToggle = () => {
        const { meta, isEditable = true } = this.props
        const { visible, defaultItem } = this.state


        if (isEditable) {
            if (visible)
                this.setState({ searchItems: defaultItem })

            this.setState((prevState) => {
                return { visible: !prevState.visible }
            });

            meta.dispatch(change(meta.form, 'search', ''));
        }
    }

    onItemSelect = (item) => {
        const {
            concurrentMultiSelect
        } = this.props
        concurrentMultiSelect ? this.toggleItem(item) : this.getAlert(item)

    }

    toggleItem = (item) => {
        const {
            compareField,
            valueCompareField,
        } = this.props

        const { selectedItems } = this.state

        const newItem = [{ ...item, [valueCompareField]: item[compareField] }]

        if (selectedItems) {
            let hasSameItem = selectedItems.filter(val =>
                JSON.parse(val[valueCompareField]) === JSON.parse(item[compareField])
            )

            if (hasSameItem.length > 0) {
                const removedItems = selectedItems.filter(val =>
                    JSON.parse(val[valueCompareField]) !== JSON.parse(item[compareField])
                )

                this.setState({ selectedItems: removedItems })
            } else {
                this.setState({
                    selectedItems: [...selectedItems, ...newItem],
                })
            }
        } else {
            this.setState({ selectedItems: newItem })
        }
    }

    getAlert = (item) => {
        const {
            displayName,
            input: { onChange, value },
            isMultiSelect,
            onlyPlaceholder,
            onSelect,
            compareField,
            valueCompareField,
            isCompareField = true
        } = this.props

        if (!isMultiSelect && value) {
            const hasCompare = compareField ? value === item[compareField] :
                JSON.parse(value.id) === JSON.parse(item.id)

            if (hasCompare) {
                // alert(`The ${item[displayName]} already added`)
                this.onToggle()
                return
            }
        }

        if (isMultiSelect && value) {
            let hasSameItem = value.filter(val => JSON.parse(val[valueCompareField]) === JSON.parse(item[compareField]))

            if (hasSameItem.length > 0) {
                // alert(`The ${item[displayName]} already added`)
                this.onToggle()
                return
            }
        }

        !onlyPlaceholder && this.setState({
            values: item[displayName]
        })

        if (!onSelect) {
            isMultiSelect ?
                onChange([
                    ...value,
                    ...[{ ...item, [valueCompareField]: item[compareField] }]
                ]) : onChange(item)
        } else {
            onSelect(item)
        }

        !onlyPlaceholder && this.setState({
            oldValue: item[compareField]
        })

        this.onToggle()
    }

    onSearch = (search) => {
        this.setState({ search })
        const { apiSearch, isInternalSearch } = this.props;

        apiSearch && !isInternalSearch ? this.onGetItems({ fresh: true, q: search }) : this.internalSearch(search)
    }

    internalSearch = (search) => {

        const { items, searchFields, onSearch, isInternalSearch } = this.props;
        let newData = [];
        const { defaultItem } = this.state

        let searchItems = isInternalSearch ? items : defaultItem

        if (typeof searchItems !== 'undefined' && searchItems.length != 0) {
            newData = searchItems.filter((item) => {
                let filterData = false

                searchFields.filter((field) => {
                    let itemField = item.fullItem[field]

                    if (typeof itemField === 'number') {
                        itemField = itemField.toString()
                    }

                    if (itemField !== null && typeof itemField !== 'undefined') {
                        itemField = itemField.toLowerCase()

                        let searchData = search.toString().toLowerCase()

                        if (itemField.indexOf(searchData) > -1) {
                            filterData = true
                        }
                    }
                })
                return filterData
            });
        }

        this.setState({ searchItems: newData })
    }

    onSubmit = () => {
        const { input: { onChange, value } } = this.props

        const { selectedItems } = this.state

        onChange(selectedItems)

        this.setState({
            oldItems: selectedItems
        })

        this.onToggle()
    }

    onRightIconPress = () => {
        const { rightIconPress } = this.props
        this.onToggle()
        rightIconPress && rightIconPress()
    }

    BOTTOM_ACTION = () => {
        const { language } = this.props

        return (
            <View style={styles.submitButton}>
                <View style={{ flex: 1 }}>
                    <CtButton
                        onPress={this.onSubmit}
                        btnTitle={Lng.t("button.done", { locale: language })}
                        containerStyle={styles.handleBtn}
                    />
                </View>
            </View>
        )
    }

    getEmptyTitle = () => {
        const { language, emptyContentProps: { contentType } } = this.props
        const { search } = this.state

        let emptyTitle = ''

        if (contentType) {
            emptyTitle = Lng.t(`${contentType}.empty.title`, { locale: language })
        }

        let noSearchResult = Lng.t("search.noSearchResult", { locale: language })

        return search ? `${noSearchResult} "${search}"` : emptyTitle
    }

    render() {
        const {
            containerStyle,
            items,
            loading,
            label,
            icon,
            placeholder,
            meta,
            headerProps,
            hasPagination,
            fakeInputProps,
            listViewProps,
            valueCompareField,
            compareField,
            concurrentMultiSelect,
            emptyContentProps,
            apiSearch,
            searchInputProps,
            input: { value },
            isRequired,
            isInternalSearch
        } = this.props;

        const {
            refreshing,
            visible,
            search,
            pagination: { lastPage, page },
            values,
            selectedItems,
            searchItems,
        } = this.state

        const canLoadMore = (lastPage >= page)

        let paginationContent = {}
        let multiSelectProps = {}
        let bottomActionProps = {}

        if (concurrentMultiSelect) {
            multiSelectProps = {
                hasCheckbox: true,
                compareField,
                valueCompareField,
                checkedItems: selectedItems,
            }
            bottomActionProps = {
                bottomAction: this.BOTTOM_ACTION()
            }
        }

        if (hasPagination) {
            paginationContent = {
                canLoadMore,
                getFreshItems: (onHide) => {
                    this.onGetItems({
                        fresh: true,
                        onResult: onHide,
                        q: search,
                    })
                },
                getItems: () => {
                    this.onGetItems({
                        q: search,
                    });
                },
            }
        }

        let internalSearchItem = (isInternalSearch && !search) ? items : searchItems

        return (
            <View style={styles.container}>

                <FakeInput
                    label={label}
                    icon={icon}
                    isRequired={isRequired}
                    values={value && (values || placeholder)}
                    // values={value && values}
                    placeholder={placeholder}
                    onChangeCallback={this.onToggle}
                    containerStyle={containerStyle}
                    meta={meta}
                    rightIcon={'angle-down'}
                    {...fakeInputProps}
                />

                <SlideModal
                    visible={visible}
                    onToggle={this.onToggle}
                    headerProps={{
                        leftIcon: "long-arrow-alt-left",
                        leftIconPress: () => this.onToggle(),
                        titleStyle: headerTitle({}),
                        placement: "center",
                        rightIcon: "plus",
                        hasCircle: false,
                        noBorder: false,
                        transparent: false,
                        rightIconPress: () => this.onRightIconPress(),
                        ...headerProps
                    }}
                    searchInputProps={searchInputProps && searchInputProps}
                    onSearch={this.onSearch}
                    bottomDivider
                    {...paginationContent}
                    {...bottomActionProps}
                    listViewProps={{
                        items: apiSearch ? items : internalSearchItem,
                        onPress: this.onItemSelect,
                        refreshing: refreshing,
                        loading: loading,
                        isEmpty: typeof items == 'undefined' || (apiSearch ?
                            items.length <= 0 : internalSearchItem.length <= 0),
                        bottomDivider: true,
                        emptyContentProps: {
                            title: this.getEmptyTitle(),
                            ...emptyContentProps
                        },
                        itemContainer: {
                            paddingVertical: 16
                        },
                        ...listViewProps,
                        ...multiSelectProps,
                        ...paginationContent
                    }}
                />
            </View>
        );
    }
}

const mapStateToProps = ({ global }) => ({
    language: global.language,
});

const mapDispatchToProps = {};

export const SelectField = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SelectFieldComponent);
