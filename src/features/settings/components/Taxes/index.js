// @flow

import React from 'react';
import { InfiniteScroll, ListView, MainLayout } from '@/components';
import Lng from '@/lang/i18n';
import { EDIT_TAX, ADD_TAX } from '../../constants';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';
import { itemsDescriptionStyle } from '@/styles';
import { ARROW_ICON } from '@/assets';

export class Taxes extends React.Component {
    constructor(props) {
        super(props);
        this.scrollViewReference = React.createRef();
        this.state = { search: '' };
    }

    componentDidMount() {
        const { navigation } = this.props;
        goBack(MOUNT, navigation);
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

    onSearch = search => {
        this.setState({ search });
        this.scrollViewReference?.getItems?.({
            queryString: { search },
            showLoader: true
        });
    };

    onSelect = tax => {
        const { navigation } = this.props;
        navigation.navigate(ROUTES.TAX, { tax, type: EDIT_TAX });
    };

    render() {
        const { taxTypes, navigation, locale, getTaxes } = this.props;
        const { search } = this.state;

        const isEmpty = taxTypes && taxTypes.length <= 0;
        const emptyTitle = search ? 'search.noResult' : 'taxes.empty.title';
        const emptyContentProps = {
            title: Lng.t(emptyTitle, { locale, search }),
            ...(!search && {
                description: Lng.t('taxes.empty.description', { locale }),
                buttonTitle: Lng.t('taxes.empty.buttonTitle', { locale }),
                buttonPress: () => {
                    navigation.navigate(ROUTES.TAX, { type: ADD_TAX });
                }
            })
        };

        const headerProps = {
            leftIcon: ARROW_ICON,
            leftIconPress: () => navigation.navigate(ROUTES.SETTING_LIST),
            title: Lng.t('header.taxes', { locale }),
            placement: 'center',
            navigation,
            rightIcon: 'plus',
            rightIconPress: () =>
                navigation.navigate(ROUTES.TAX, { type: ADD_TAX })
        };

        return (
            <MainLayout
                headerProps={headerProps}
                onSearch={this.onSearch}
                bottomDivider
            >
                <InfiniteScroll
                    getItems={getTaxes}
                    reference={ref => (this.scrollViewReference = ref)}
                    getItemsInMount={false}
                >
                    <ListView
                        items={taxTypes}
                        onPress={this.onSelect}
                        isEmpty={isEmpty}
                        bottomDivider
                        contentContainerStyle={{ flex: 3 }}
                        leftSubTitleStyle={itemsDescriptionStyle(45)}
                        emptyContentProps={emptyContentProps}
                        isAnimated
                    />
                </InfiniteScroll>
            </MainLayout>
        );
    }
}
