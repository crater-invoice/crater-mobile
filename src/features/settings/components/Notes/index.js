import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './styles';
import { MainLayout, ListView, InfiniteScroll } from '@/components';
import Lng from '@/lang/i18n';
import { NOTES_ADD, NOTES_EDIT } from '../../constants';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';
import { formatNotes } from '@/utils';

type IProps = {
    navigation: Object,
    expenses: Object,
    locale: String,
    getNotes: Function,
    notes: any
};

export class Notes extends Component<IProps> {
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

        navigation.navigate(ROUTES.NOTE, {
            type: NOTES_EDIT,
            notesId: note.id,
            note
        });
        // this.onResetFilter();
    };

    onSearch = search => {
        this.setState({ search });

        this.scrollViewReference?.getItems?.({
            queryString: { search },
            showLoader: true
        });
    };

    render() {
        const { navigation, locale, notes, getNotes } = this.props;

        const { search } = this.state;
        const isEmpty = notes && notes.length <= 0;

        const emptyTitle = search ? 'search.noResult' : 'notes.empty.title';
        const emptyContentProps = {
            title: Lng.t(emptyTitle, { locale, search }),
            ...(!search && {
                description: Lng.t('notes.empty.description', { locale }),
                buttonTitle: Lng.t('notes.empty.buttonTitle', { locale }),
                buttonPress: () => {
                    navigation.navigate(ROUTES.NOTE, {
                        type: NOTES_ADD
                    });
                }
            })
        };

        const headerProps = {
            leftIcon: 'long-arrow-alt-left',
            leftIconPress: () => navigation.navigate(ROUTES.SETTING_LIST),
            title: Lng.t('header.notes', { locale }),
            titleStyle: styles.titleStyle,
            placement: 'center',
            rightIcon: 'plus',
            rightIconPress: () =>
                navigation.navigate(ROUTES.NOTE, {
                    type: NOTES_ADD
                })
        };

        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={headerProps}
                    onSearch={this.onSearch}
                    bottomDivider
                >
                    <View style={styles.listViewContainer}>
                        <InfiniteScroll
                            getItems={getNotes}
                            reference={ref => (this.scrollViewReference = ref)}
                            getItemsInMount={false}
                            paginationLimit={13}
                        >
                            <ListView
                                items={formatNotes(notes)}
                                onPress={this.onSelect}
                                isEmpty={isEmpty}
                                contentContainerStyle={{ flex: 1 }}
                                bottomDivider
                                emptyContentProps={emptyContentProps}
                                leftSubTitleStyle={{ textAlign: 'justify' }}
                            />
                        </InfiniteScroll>
                    </View>
                </MainLayout>
            </View>
        );
    }
}

export default Notes;
