// @flow

import React from 'react';
import { View } from 'react-native';
import { change } from 'redux-form';
import styles from './styles';
import { MainLayout, ListView, InfiniteScroll } from '@/components';
import { ROUTES } from '@/navigation';
import { IMAGES } from '@/assets';
import Lng from '@/lang/i18n';
import { ADD_ITEM, EDIT_ITEM, ITEM_SEARCH } from '../../constants';
import { goBack, MOUNT, UNMOUNT } from '@/navigation';
import { formatItems, isFilterApply } from '@/utils';
import { hasTextLength } from '@/constants';
import filterFields from './filterFields';
import { itemsDescriptionStyle } from '@/styles';

type IProps = {
    navigation: Object,
    getItems: Function,
    items: Object,
    locale: String
};

export class Items extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.scrollViewReference = React.createRef();
        this.state = { search: '' };
    }

    componentDidMount() {
        const { navigation } = this.props;
        goBack(MOUNT, navigation, { route: ROUTES.MAIN_MORE });
        this.onFocus();
    }

    componentWillUnmount() {
        goBack(UNMOUNT);
        this.focusListener?.remove?.();
    }

    onFocus = () => {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.scrollViewReference?.getItems?.();
        });
    };

    onSelect = ({ id }) => {
        const { navigation } = this.props;
        navigation.navigate(ROUTES.GLOBAL_ITEM, { type: EDIT_ITEM, id });
    };

    onResetFilter = () => {
        const { search } = this.state;

        this.scrollViewReference?.getItems?.({
            queryString: { search },
            resetQueryString: true,
            showLoader: true
        });
    };

    onSubmitFilter = ({ unit_id = '', name = '', price = '' }) => {
        const { search } = this.state;

        this.scrollViewReference?.getItems?.({
            queryString: {
                unit_id,
                price,
                search: hasTextLength(name) ? name : search
            },
            showLoader: true
        });
    };

    setFormField = (field, value) => {
        this.props.dispatch(change(ITEM_SEARCH, field, value));
    };

    onSearch = search => {
        this.setState({ search });
        this.scrollViewReference?.getItems?.({
            queryString: { search },
            showLoader: true
        });
    };

    render() {
        const {
            navigation,
            items,
            locale,
            handleSubmit,
            formValues,
            getItems,
            currency
        } = this.props;

        const { search } = this.state;

        const headerProps = {
            title: Lng.t('header.items', { locale }),
            leftIcon: 'long-arrow-alt-left',
            leftIconPress: () => navigation.navigate(ROUTES.MAIN_MORE),
            title: Lng.t('header.items', { locale }),
            titleStyle: styles.headerTitle,
            rightIcon: 'plus',
            placement: 'center',
            rightIcon: 'plus',
            rightIconPress: () => {
                navigation.navigate(ROUTES.GLOBAL_ITEM, {
                    type: ADD_ITEM
                });
            }
        };

        const filterProps = {
            onSubmitFilter: handleSubmit(this.onSubmitFilter),
            ...filterFields(this),
            clearFilter: this.props,
            onResetFilter: () => this.onResetFilter()
        };

        const isEmpty = items && items.length <= 0;
        const isFilter = isFilterApply(formValues);

        const emptyTitle = search
            ? 'search.noResult'
            : isFilter
            ? 'filter.empty.filterTitle'
            : 'items.empty.title';

        const emptyContentProps = {
            title: Lng.t(emptyTitle, { locale, search }),
            image: IMAGES.EMPTY_ITEMS,
            ...(!search && {
                description: Lng.t('items.empty.description', { locale })
            }),
            ...(!search &&
                !isFilter && {
                    buttonTitle: Lng.t('items.empty.buttonTitle', { locale }),
                    buttonPress: () => {
                        navigation.navigate(ROUTES.GLOBAL_ITEM, {
                            type: ADD_ITEM
                        });
                    }
                })
        };

        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={headerProps}
                    onSearch={this.onSearch}
                    bottomDivider
                    onFocus={() => {}}
                    filterProps={filterProps}
                >
                    <View style={styles.listViewContainer}>
                        <InfiniteScroll
                            getItems={getItems}
                            reference={ref => (this.scrollViewReference = ref)}
                            getItemsInMount={false}
                        >
                            <ListView
                                items={formatItems(items, currency)}
                                onPress={this.onSelect}
                                isEmpty={isEmpty}
                                bottomDivider
                                leftSubTitleStyle={itemsDescriptionStyle()}
                                emptyContentProps={emptyContentProps}
                            />
                        </InfiniteScroll>
                    </View>
                </MainLayout>
            </View>
        );
    }
}
