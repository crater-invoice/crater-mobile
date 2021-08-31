// @flow

import React from 'react';
import t from 'locales/use-translation';
import { InfiniteScroll, ListView, MainLayout } from '@/components';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';
import { ARROW_ICON } from '@/assets';
import { fetchCompanies } from '../../actions';
import { isEmpty } from '@/constants';

export default class Companies extends React.Component {
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
        const { navigation, dispatch } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.scrollViewReference?.getItems?.();
        });
    };

    onSearch = search => {
        const { companies } = this.props;

        this.setState({ search });
        this.scrollViewReference?.getItems?.({
            queryString: { search, companies },
            showLoader: true
        });
    };

    onSelect = company => {
        const { navigation } = this.props;
        navigation.navigate(ROUTES.COMPANY, {
            company,
            type: 'UPDATE'
        });
    };

    render() {
        const { navigation, dispatch, companies } = this.props;
        const { search } = this.state;

        const emptyTitle = search ? 'search.noResult' : 'company.empty.title';
        const emptyContentProps = {
            title: t(emptyTitle, { search }),
            ...(!search && {
                description: t('company.empty.description'),
                buttonTitle: t('company.text_add_new_company'),
                buttonPress: () => {
                    navigation.navigate(ROUTES.COMPANY, {
                        type: 'ADD'
                    });
                }
            })
        };

        const headerProps = {
            leftIcon: ARROW_ICON,
            leftIconPress: () => navigation.goBack(null),
            title: t('header.companies'),
            placement: 'center',
            navigation,
            rightIcon: 'plus',
            rightIconPress: () =>
                navigation.navigate(ROUTES.COMPANY, { type: 'ADD' })
        };

        return (
            <MainLayout
                headerProps={headerProps}
                onSearch={this.onSearch}
                bottomDivider
            >
                <InfiniteScroll
                    getItems={q => dispatch(fetchCompanies(q))}
                    reference={ref => (this.scrollViewReference = ref)}
                    getItemsInMount={false}
                >
                    <ListView
                        items={companies}
                        onPress={this.onSelect}
                        isAnimated
                        hasAvatar
                        bottomDivider
                        isEmpty={isEmpty(companies)}
                        emptyContentProps={emptyContentProps}
                    />
                </InfiniteScroll>
            </MainLayout>
        );
    }
}
