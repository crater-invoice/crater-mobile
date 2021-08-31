import React, { Component } from 'react';
import { MainLayout, ListView, InfiniteScroll } from '@/components';
import t from 'locales/use-translation';
import { NOTES_ADD, NOTES_EDIT } from '../../constants';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';
import { formatNotes } from '@/utils';
import { ARROW_ICON } from '@/assets';
import { isIPhoneX } from '@/constants';
import { fonts } from '@/styles';

type IProps = {
    navigation: Object,
    expenses: Object,
    getNotes: Function,
    notes: any
};

export default class Notes extends Component<IProps> {
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

    onSelect = note => {
        const { navigation } = this.props;

        navigation.navigate(ROUTES.NOTE, { type: NOTES_EDIT, note });
    };

    onSearch = search => {
        this.setState({ search });

        this.scrollViewReference?.getItems?.({
            queryString: { search },
            showLoader: true
        });
    };

    render() {
        const { navigation, notes, getNotes } = this.props;

        const { search } = this.state;
        const isEmpty = notes && notes.length <= 0;

        const emptyTitle = search ? 'search.noResult' : 'notes.empty.title';
        const emptyContentProps = {
            title: t(emptyTitle, { search }),
            ...(!search && {
                description: t('notes.empty.description'),
                buttonTitle: t('notes.empty.buttonTitle'),
                buttonPress: () => {
                    navigation.navigate(ROUTES.NOTE, {
                        type: NOTES_ADD
                    });
                }
            })
        };

        const headerProps = {
            title: t('header.notes'),
            navigation,
            leftIcon: ARROW_ICON,
            leftIconPress: () => navigation.navigate(ROUTES.SETTING_LIST),
            placement: 'center',
            rightIcon: 'plus',
            rightIconPress: () =>
                navigation.navigate(ROUTES.NOTE, {
                    type: NOTES_ADD
                })
        };

        return (
            <MainLayout
                headerProps={headerProps}
                onSearch={this.onSearch}
                bottomDivider
                bodyStyle="is-full-listView"
            >
                <InfiniteScroll
                    getItems={getNotes}
                    reference={ref => (this.scrollViewReference = ref)}
                    getItemsInMount={false}
                    paginationLimit={isIPhoneX() ? 20 : 15}
                >
                    <ListView
                        items={formatNotes(notes)}
                        onPress={this.onSelect}
                        isEmpty={isEmpty}
                        contentContainerStyle={{ flex: 1 }}
                        bottomDivider
                        emptyContentProps={emptyContentProps}
                        leftSubTitleStyle={{ textAlign: 'justify' }}
                        rightTitleStyle={{ fontFamily: fonts.poppins }}
                        isAnimated
                    />
                </InfiniteScroll>
            </MainLayout>
        );
    }
}
