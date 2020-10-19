// @flow

import React from 'react';
import { View } from 'react-native';
import { change } from 'redux-form';
import styles from './styles';
import { MainLayout, ListView } from '@/components';
import { ROUTES } from '@/navigation';
import Lng from '@/lang/i18n';
import {
    CUSTOM_FIELDS_FORM,
    CREATE_CUSTOM_FIELD_TYPE,
    EDIT_CUSTOM_FIELD_TYPE
} from '../../constants';
import { goBack, MOUNT, UNMOUNT } from '@/navigation';
import { hasLength, hasFieldValue, hasValue } from '@/constants';

type IProps = {
    navigation: Object,
    getCustomFields: Function,
    resetCustomFields: Function,
    customFields: Object,
    loading: Boolean,
    locale: String
};

export class CustomFields extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            refreshing: false,
            pagination: {
                page: 1,
                limit: 10,
                isLastPage: false
            },
            fresh: true,
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.getItems({ fresh: true });
        goBack(MOUNT, navigation);
    }

    componentWillUnmount() {
        const { customFields, resetCustomFields } = this.props;

        goBack(UNMOUNT);
        customFields && resetCustomFields?.();
    }

    onSelect = field => {
        const { navigation } = this.props;
        navigation.navigate(ROUTES.CUSTOMER_FIELD, {
            type: EDIT_CUSTOM_FIELD_TYPE,
            field
        });
    };

    getItems = ({ fresh = false, onResult = null , search = null }: any = {}) => {
        const { getCustomFields } = this.props;
        const { refreshing, pagination } = this.state;

        if (refreshing) { return; }

        this.setState({
            refreshing: true,
            fresh,
        });

        const paginationParams = fresh ? { ...pagination, page: 1 } : pagination;

        if (!fresh && paginationParams.lastPage < paginationParams.page) {
            return;
        }

        getCustomFields({
            fresh,
            pagination: paginationParams,
            search,
            onMeta: ({ last_page, current_page}) => {
                this.setState({
                    pagination: {
                        ...paginationParams,
                        lastPage: last_page,
                        page: current_page + 1,
                    },
                });
            },
            onResult: () => {
                this.setState({ refreshing: false });
                onResult?.()
            }
        });
    };

    setFormField = (field, value) => {
        this.props.dispatch(change(CUSTOM_FIELDS_FORM, field, value));
    };

    onSearch = search => {
        
        this.setState({ search });
        this.getItems({ fresh: true, search })
    };

    loadMoreItems = () => {
        const { search } = this.state
        this.getItems({ search });
    }

    render() {
        const { navigation, customFields, loading, locale } = this.props;
        const { search, 
            refreshing,
            pagination: { lastPage, page },
            fresh 
        } = this.state;

        let empty = !search
            ? {
                  description: Lng.t('customFields.empty.description', {
                      locale
                  }),
                  buttonTitle: Lng.t('customFields.empty.buttonTitle', {
                      locale
                  }),
                  buttonPress: () => {
                      navigation.navigate(ROUTES.CUSTOMER_FIELD, {
                          type: CREATE_CUSTOM_FIELD_TYPE
                      });
                  }
              }
            : {};

        let emptyTitle = search
            ? Lng.t('search.noResult', { locale, search })
            : Lng.t('customFields.empty.title', { locale });
        
        const canLoadMore = lastPage >= page;

        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={{
                        title: Lng.t('header.customFields', {
                            locale
                        }),
                        leftIcon: 'long-arrow-alt-left',
                        leftIconPress: () => navigation.goBack(null),
                        titleStyle: styles.headerTitle,
                        rightIcon: 'plus',
                        placement: 'center',
                        rightIconPress: () => {
                            navigation.navigate(ROUTES.CUSTOMER_FIELD, {
                                type: CREATE_CUSTOM_FIELD_TYPE
                            });
                        }
                    }}
                    onSearch={this.onSearch}
                    bottomDivider
                    loadingProps={{ is: loading && !hasLength(customFields) }}
                >
                    <View style={styles.listViewContainer}>
                        <ListView
                            items={customFields}
                            onPress={this.onSelect}
                            refreshing={refreshing}
                            loading={loading}
                            isEmpty={customFields.length <= 0}
                            canLoadMore={false}
                            getFreshItems={onHide => {
                                this.getItems({ fresh: true,
                                    onResult: onHide,
                                    search
                                });
                            }}
                            getItems={() => {
                                console.log('getItems')
                                this.loadMoreItems()
                            }}
                            bottomDivider
                            emptyContentProps={{
                                title: emptyTitle,
                                ...empty
                            }}
                            leftTitleStyle={styles.leftTitleText}
                            leftSubTitleLabelStyle={styles.leftSubTitleText}
                            leftSubTitleContainerStyle={
                                styles.leftTitleContainer
                            }
                            rightTitleStyle={styles.rightTitleText}
                            canLoadMore={canLoadMore}
                        />
                    </View>
                </MainLayout>
            </View>
        );
    }
}
