// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import Lng from '@/lang/i18n';
import { IProps, IStates } from './type';
import { headerTitle } from '@/styles';
import styles from './styles';
import { SlideModal } from '../SlideModal';
import { FakeInput } from '../FakeInput';
import { CtButton } from '../Button';
import { hasValue, isArray } from '@/constants';
import { internalSearch as searchItem } from '@/utils';

export class SelectFieldComponent extends Component<IProps, IStates> {
    scrollViewReference: any;

    constructor(props) {
        super(props);
        this.scrollViewReference = React.createRef();
        this.state = this.initialState();
    }

    componentDidMount() {
        if (!isArray(this.props.items)) {
            return;
        }
        this.setInitialState();
    }

    componentWillUpdate(nextProps, nextState) {
        this.updateInitialState(nextProps, nextState);
    }

    initialState = () => {
        return {
            search: '',
            visible: false,
            values: '',
            selectedItems: [],
            oldItems: [],
            defaultItem: [],
            searchItems: [],
            oldValue: ''
        };
    };

    setInitialState = () => {
        const {
            input: { value },
            compareField,
            items,
            displayName,
            concurrentMultiSelect
        } = this.props;

        let newValue = '';
        for (const key in items) {
            if (
                hasValue(key) &&
                items[key]['fullItem'][compareField] === value
            ) {
                newValue = items[key]['fullItem'][displayName];
                break;
            }
        }

        concurrentMultiSelect &&
            this.setState({
                selectedItems: value,
                oldItems: value
            });

        this.setState({
            values: compareField ? newValue : value[displayName],
            defaultItem: items || [],
            searchItems: items || [],
            oldValue: compareField ? value : value[displayName]
        });
    };

    updateInitialState = (nextProps, nextState) => {
        const {
            concurrentMultiSelect,
            input: { value },
            items,
            compareField,
            displayName
        } = nextProps;
        const { search, oldItems, oldValue } = nextState;

        if (
            concurrentMultiSelect &&
            !search &&
            oldItems.length < value.length
        ) {
            this.setState({
                selectedItems: value,
                oldItems: value
            });
        }

        if (!isArray(items) && !search) {
            return;
        }

        let newValue = '';

        for (const key in items) {
            if (
                key !== 'undefined' &&
                items[key]['fullItem'][compareField] === value
            ) {
                newValue = items[key]['fullItem'][displayName];
                break;
            }
        }

        if (value && oldValue !== value) {
            this.setState({
                oldValue: compareField ? value : value[displayName],
                values: compareField ? newValue : value[displayName]
            });
        }
    };

    onToggle = () => {
        const {
            meta,
            isEditable = true,
            input,
            hasPagination,
            apiSearch
        } = this.props;
        const { visible, defaultItem } = this.state;

        if (isEditable) {
            if (visible) this.setState({ searchItems: defaultItem });

            this.setState(prevState => {
                return { visible: !prevState.visible };
            });

            if (!hasPagination || !apiSearch) {
                meta.dispatch(change(meta.form, `search-${input?.name}`, ''));
            }
        }
    };

    onItemSelect = item => {
        const { concurrentMultiSelect } = this.props;
        concurrentMultiSelect ? this.toggleItem(item) : this.getAlert(item);
    };

    toggleItem = item => {
        const { compareField, valueCompareField } = this.props;

        const { selectedItems } = this.state;

        const newItem = [{ ...item, [valueCompareField]: item[compareField] }];

        if (selectedItems) {
            let hasSameItem = selectedItems.filter(
                val =>
                    JSON.parse(val[valueCompareField]) ===
                    JSON.parse(item[compareField])
            );

            if (hasSameItem.length > 0) {
                const removedItems = selectedItems.filter(
                    val =>
                        JSON.parse(val[valueCompareField]) !==
                        JSON.parse(item[compareField])
                );

                this.setState({ selectedItems: removedItems });
            } else {
                this.setState({
                    selectedItems: [...selectedItems, ...newItem]
                });
            }
        } else {
            this.setState({ selectedItems: newItem });
        }
    };

    getAlert = item => {
        const {
            displayName,
            input: { onChange, value },
            isMultiSelect,
            onlyPlaceholder,
            onSelect,
            compareField,
            valueCompareField,
            isCompareField = true
        } = this.props;

        if (!isMultiSelect && value) {
            const hasCompare = compareField
                ? value === item[compareField]
                : JSON.parse(value.id) === JSON.parse(item.id);

            if (hasCompare) {
                this.onToggle();
                return;
            }
        }

        if (isMultiSelect && value) {
            let hasSameItem = value.filter(
                val =>
                    JSON.parse(val[valueCompareField]) ===
                    JSON.parse(item[compareField])
            );

            if (hasSameItem.length > 0) {
                this.onToggle();
                return;
            }
        }

        !onlyPlaceholder &&
            this.setState({
                values: item[displayName]
            });

        if (!onSelect) {
            isMultiSelect
                ? onChange([
                      ...value,
                      ...[{ ...item, [valueCompareField]: item[compareField] }]
                  ])
                : onChange(item);
        } else {
            onSelect(item);
        }

        !onlyPlaceholder &&
            this.setState({
                oldValue: item[compareField]
            });

        this.onToggle();
    };

    onSearch = search => {
        this.setState({ search });
        const { apiSearch, isInternalSearch } = this.props;

        apiSearch && !isInternalSearch
            ? this.searchPaginateItems(search)
            : this.internalSearch(search);
    };

    searchPaginateItems = search => {
        this.scrollViewReference?.getItems?.({
            queryString: { search },
            showLoader: true
        });
    };

    internalSearch = search => {
        const { items, searchFields, isInternalSearch } = this.props;
        const { defaultItem } = this.state;

        const searchItems = isInternalSearch ? items : defaultItem;

        const newData = searchItem({
            items: searchItems,
            search,
            searchFields
        });

        this.setState({ searchItems: newData });
    };

    onSubmit = () => {
        const {
            input: { onChange, value }
        } = this.props;

        const { selectedItems } = this.state;

        onChange(selectedItems);

        this.setState({
            oldItems: selectedItems
        });

        this.onToggle();
    };

    onRightIconPress = () => {
        const { rightIconPress } = this.props;
        this.onToggle();
        rightIconPress && rightIconPress();
    };

    getEmptyTitle = () => {
        const { locale, emptyContentProps } = this.props;
        const { search } = this.state;
        const emptyContentType = emptyContentProps?.contentType;
        let emptyTitle = '';

        if (emptyContentType) {
            emptyTitle = Lng.t(`${emptyContentType}.empty.title`, { locale });
        }

        let noSearchResult = Lng.t('search.noSearchResult', { locale });

        return {
            title: search ? `${noSearchResult} "${search}"` : emptyTitle,
            description: Lng.t(`${emptyContentType}.empty.description`, {
                locale
            })
        };
    };

    setInitialPaginationItem = res => {
        const { compareField, hasFirstItem = true, displayName } = this.props;

        let firstItem = '';
        const items = res?.data ?? [];

        if (
            typeof items !== 'undefined' &&
            items.length !== 0 &&
            hasFirstItem
        ) {
            firstItem = items[0]['fullItem'];

            this.setState({
                values: compareField && firstItem[displayName],
                oldValue: compareField
                    ? firstItem[compareField]
                    : firstItem[displayName]
            });
        }
    };

    getPaginationItems = () => {
        const { search } = this.state;

        this.scrollViewReference?.getItems?.({
            queryString: { search },
            onSuccess: res => this.setInitialPaginationItem(res)
        });
    };

    BOTTOM_ACTION = locale => (
        <View style={styles.submitButton}>
            <View style={{ flex: 1 }}>
                <CtButton
                    onPress={this.onSubmit}
                    btnTitle={Lng.t('button.done', { locale })}
                    containerStyle={styles.handleBtn}
                />
            </View>
        </View>
    );

    render() {
        const {
            containerStyle,
            items,
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
            input,
            input: { value },
            isRequired,
            isInternalSearch,
            getItems,
            locale
        } = this.props;

        const {
            visible,
            search,
            values,
            selectedItems,
            searchItems
        } = this.state;

        let multiSelectProps = {};
        let bottomActionProps = {};

        if (concurrentMultiSelect) {
            multiSelectProps = {
                hasCheckbox: true,
                compareField,
                valueCompareField,
                checkedItems: selectedItems
            };
            bottomActionProps = {
                bottomAction: this.BOTTOM_ACTION(locale)
            };
        }

        let internalSearchItem =
            isInternalSearch && !search ? items : searchItems;

        let infiniteScrollProps = {};
        if (apiSearch || hasPagination) {
            infiniteScrollProps = {
                getItems,
                reference: ref => (this.scrollViewReference = ref),
                getItemsInMount: false,
                onMount: this.getPaginationItems,
                hideLoader: isArray(items)
            };
        }

        const layoutHeaderProps = {
            leftIcon: 'long-arrow-alt-left',
            leftIconPress: () => this.onToggle(),
            titleStyle: headerTitle({}),
            placement: 'center',
            rightIcon: 'plus',
            hasCircle: false,
            noBorder: false,
            transparent: false,
            rightIconPress: () => this.onRightIconPress(),
            ...headerProps
        };

        const listProps = {
            items: apiSearch ? items : internalSearchItem,
            onPress: this.onItemSelect,
            isEmpty:
                typeof items == 'undefined' ||
                (apiSearch
                    ? items.length <= 0
                    : internalSearchItem.length <= 0),
            bottomDivider: true,
            emptyContentProps: {
                ...this.getEmptyTitle(),
                ...emptyContentProps
            },
            itemContainer: { paddingVertical: 16 },
            ...listViewProps,
            ...multiSelectProps
        };

        const internalListScrollProps = {
            scrollViewProps: {
                contentContainerStyle: {
                    flex: !isArray(internalSearchItem) ? 1 : 0
                }
            }
        };

        return (
            <View style={styles.container}>
                <FakeInput
                    label={label}
                    icon={icon}
                    isRequired={isRequired}
                    values={value && (values || placeholder)}
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
                    headerProps={layoutHeaderProps}
                    searchInputProps={searchInputProps && searchInputProps}
                    searchFieldProps={{ name: `search-${input?.name}` }}
                    onSearch={this.onSearch}
                    bottomDivider
                    {...bottomActionProps}
                    listViewProps={listProps}
                    infiniteScrollProps={infiniteScrollProps}
                    isPagination={apiSearch || hasPagination}
                    {...internalListScrollProps}
                />
            </View>
        );
    }
}

const mapStateToProps = ({ global }) => ({
    locale: global?.locale
});

export const SelectField = connect(
    mapStateToProps,
    {}
)(SelectFieldComponent);
