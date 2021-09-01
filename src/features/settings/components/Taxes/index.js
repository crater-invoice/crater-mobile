// @flow

import React from 'react';
import { InfiniteScroll, ListView, MainLayout } from '@/components';
import t from 'locales/use-translation';
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
        navigation.navigate(ROUTES.TAX, { tax, type: 'UPDATE' });
    };

    render() {
        const { taxTypes, navigation, getTaxes } = this.props;
        const { search } = this.state;

        const isEmpty = taxTypes && taxTypes.length <= 0;
        const emptyTitle = search ? 'search.noResult' : 'taxes.empty.title';
        const emptyContentProps = {
            title: t(emptyTitle, { search }),
            ...(!search && {
                description: t('taxes.empty.description'),
                buttonTitle: t('taxes.empty.buttonTitle'),
                buttonPress: () => {
                    navigation.navigate(ROUTES.TAX, { type: 'ADD' });
                }
            })
        };

        const headerProps = {
            leftIcon: ARROW_ICON,
            leftIconPress: () => navigation.navigate(ROUTES.SETTING_LIST),
            title: t('header.taxes'),
            placement: 'center',
            navigation,
            rightIcon: 'plus',
            rightIconPress: () =>
                navigation.navigate(ROUTES.TAX, { type: 'ADD' })
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
