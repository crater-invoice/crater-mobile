// @flow

import React from 'react';
import { View } from 'react-native';
import { change } from 'redux-form';
import styles from './styles';
import { MainLayout, ListView } from '../../../../components';
import { ROUTES } from '../../../../navigation/routes';
import Lng from '../../../../api/lang/i18n';
import {
    CUSTOM_FIELDS_FORM,
    CREATE_CUSTOM_FIELD_TYPE,
    EDIT_CUSTOM_FIELD_TYPE,
} from '../../constants';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';
import { itemsDescriptionStyle } from '../../../invoices/components/Invoice/styles';
import { formatListByName, hasValue, hasLength } from '../../../../api/global'

type IProps = {
    navigation: Object,
    getCustomFields: Function,
    customFields: Object,
    loading: Boolean,
    language: String,
}

export class CustomFields extends React.Component<IProps> {
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
            search: ''
        };
    }

    componentDidMount() {
        this.getItems({ fresh: true });
        goBack(MOUNT, this.props.navigation)
    }

    componentWillUnmount() {
        goBack(UNMOUNT)
    }

    onSelect = (field) => {
        const { navigation } = this.props
        navigation.navigate(ROUTES.CUSTOMER_FIELD, { type: EDIT_CUSTOM_FIELD_TYPE, field })
    }

    getItems = ({
        fresh = false,
        onResult,
        search,
        filter = false
    } = {}) => {

        const { getCustomFields } = this.props;
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

        getCustomFields({
            fresh,
            pagination: paginationParams,
            search,
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

    setFormField = (field, value) => {
        this.props.dispatch(change(CUSTOM_FIELDS_FORM, field, value));
    }


    onSearch = (search) => {
        this.getItems({ fresh: true, search })
        this.setState({ search })
    };

    loadMoreItems = () => this.getItems({ search: this.state.search });

    render() {

        const {
            navigation,
            customFields,
            loading,
            language,
        } = this.props;

        const {
            refreshing,
            pagination: { lastPage, page },
            fresh,
            search,
        } = this.state;

        const canLoadMore = lastPage >= page;


        let empty = (!search) ? {
            description: Lng.t("customFields.empty.description", { locale: language }),
            buttonTitle: Lng.t("customFields.empty.buttonTitle", { locale: language }),
            buttonPress: () => {
                navigation.navigate(ROUTES.CUSTOMER_FIELD, { type: CREATE_CUSTOM_FIELD_TYPE })
            }
        } : {}

        let emptyTitle = search ? Lng.t("search.noResult", { locale: language, search })
            : Lng.t("customFields.empty.title", { locale: language })

        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={{
                        title: Lng.t("header.customFields", { locale: language }),
                        leftIcon: "long-arrow-alt-left",
                        leftIconPress: () => navigation.goBack(null),
                        titleStyle: styles.headerTitle,
                        rightIcon: "plus",
                        placement: "center",
                        rightIcon: "plus",
                        rightIconPress: () => {
                            navigation.navigate(ROUTES.CUSTOMER_FIELD, { type: CREATE_CUSTOM_FIELD_TYPE })
                        },
                    }}
                    onSearch={this.onSearch}
                    bottomDivider
                    loadingProps={{ is: loading && fresh }}
                >
                    <View style={styles.listViewContainer} >
                        <ListView
                            items={customFields ?? []}
                            onPress={this.onSelect}
                            refreshing={refreshing}
                            loading={loading}
                            isEmpty={!hasLength(customFields)}
                            canLoadMore={canLoadMore}
                            getFreshItems={(onHide) => {
                                this.getItems({
                                    fresh: true,
                                    onResult: onHide,
                                    search
                                });
                            }}
                            getItems={() => this.loadMoreItems()}
                            bottomDivider
                            leftSubTitleStyle={itemsDescriptionStyle()}
                            emptyContentProps={{
                                title: emptyTitle,
                                ...empty
                            }}
                        />
                    </View>

                </MainLayout>
            </View>
        );
    }
}

