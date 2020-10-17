// @flow

import React from 'react';
import { View } from 'react-native';
import { change } from 'redux-form';
import styles from './styles';
import { MainLayout, ListView } from '@/components';
import { ROUTES } from '@/navigation/routes';
import Lng from '@/api/lang/i18n';
import {
    CUSTOM_FIELDS_FORM,
    CREATE_CUSTOM_FIELD_TYPE,
    EDIT_CUSTOM_FIELD_TYPE
} from '../../constants';
import { goBack, MOUNT, UNMOUNT } from '@/navigation/actions';
import { hasLength, hasFieldValue, hasValue } from '@/api/global';

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
            found: true,
            fieldsFilter: []
        };
    }

    componentDidMount() {
        this.getItems({});
        const { navigation } = this.props;
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

    getItems = ({ onResult } = {}) => {
        const { getCustomFields } = this.props;

        getCustomFields({
            onResult: () => onResult?.()
        });
    };

    setFormField = (field, value) => {
        this.props.dispatch(change(CUSTOM_FIELDS_FORM, field, value));
    };

    onSearch = search => {
        const { customFields } = this.props;
        let searchFields = ['name', 'label', 'model_type', 'type'];

        if (hasFieldValue(customFields)) {
            let newData = customFields.filter(({ fullItem }) => {
                let filterData = false;

                searchFields.filter(field => {
                    let itemField = fullItem?.[field] ?? '';

                    if (typeof itemField === 'number') {
                        itemField = itemField.toString();
                    }

                    if (hasValue(itemField)) {
                        itemField = itemField.toLowerCase();

                        let searchData = search.toString().toLowerCase();

                        if (itemField.indexOf(searchData) > -1) {
                            filterData = true;
                        }
                    }
                });
                return filterData;
            });

            this.setState({
                fieldsFilter: newData,
                found: newData.length != 0 ? true : false
            });
        }
        this.setState({ search });
    };

    render() {
        const { navigation, customFields, loading, locale } = this.props;
        const { search, found, fieldsFilter } = this.state;

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
                            items={
                                hasFieldValue(fieldsFilter)
                                    ? fieldsFilter
                                    : found
                                    ? customFields
                                    : []
                            }
                            onPress={this.onSelect}
                            refreshing={false}
                            loading={loading}
                            isEmpty={found ? customFields.length <= 0 : true}
                            canLoadMore={false}
                            getFreshItems={onHide => {
                                this.getItems({ onResult: onHide });
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
                        />
                    </View>
                </MainLayout>
            </View>
        );
    }
}
