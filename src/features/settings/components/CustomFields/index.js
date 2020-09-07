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
import { itemsDescriptionStyle } from '@/features/invoices/components/Invoice/styles';
import { hasLength } from '@/api/global';
import { moreTriggerSpinner } from '@/features/more/actions';

type IProps = {
    navigation: Object,
    getCustomFields: Function,
    customFields: Object,
    loading: Boolean,
    language: String
};

export class CustomFields extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };
    }

    componentDidMount() {
        this.getItems({});
        const { navigation } = this.props;
        goBack(MOUNT, navigation);
    }

    componentWillUnmount() {
        goBack(UNMOUNT);
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
        this.setState({ search });
    };

    render() {
        const { navigation, customFields, loading, language } = this.props;

        const { search } = this.state;

        let empty = !search
            ? {
                  description: Lng.t('customFields.empty.description', {
                      locale: language
                  }),
                  buttonTitle: Lng.t('customFields.empty.buttonTitle', {
                      locale: language
                  }),
                  buttonPress: () => {
                      navigation.navigate(ROUTES.CUSTOMER_FIELD, {
                          type: CREATE_CUSTOM_FIELD_TYPE
                      });
                  }
              }
            : {};

        let emptyTitle = search
            ? Lng.t('search.noResult', { locale: language, search })
            : Lng.t('customFields.empty.title', { locale: language });

        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={{
                        title: Lng.t('header.customFields', {
                            locale: language
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
                            items={customFields ?? []}
                            onPress={this.onSelect}
                            refreshing={false}
                            loading={loading}
                            isEmpty={!hasLength(customFields)}
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
