// @flow

import React from 'react';
import { View } from 'react-native';
import { change } from 'redux-form';
import styles from './styles';
import { MainLayout, ListView, InfiniteScroll } from '@/components';
import { ROUTES } from '@/navigation';
import Lng from '@/lang/i18n';
import {
    CUSTOM_FIELDS_FORM,
    CREATE_CUSTOM_FIELD_TYPE,
    EDIT_CUSTOM_FIELD_TYPE
} from '../../constants';
import { goBack, MOUNT, UNMOUNT } from '@/navigation';
import { ARROW_ICON } from '@/assets';

type IProps = {
    navigation: Object,
    getCustomFields: Function,
    customFields: Object,
    loading: Boolean,
    locale: String
};

export class CustomFields extends React.Component<IProps> {
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

    onSelect = field => {
        const { navigation } = this.props;
        navigation.navigate(ROUTES.CUSTOMER_FIELD, {
            type: EDIT_CUSTOM_FIELD_TYPE,
            field
        });
    };

    setFormField = (field, value) => {
        this.props.dispatch(change(CUSTOM_FIELDS_FORM, field, value));
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
            customFields,
            locale,
            getCustomFields
        } = this.props;
        const { search } = this.state;

        const isEmpty = customFields && customFields.length <= 0;

        const emptyTitle = search
            ? 'search.noResult'
            : 'customFields.empty.title';

        const emptyContentProps = {
            title: Lng.t(emptyTitle, { locale, search }),
            ...(!search && {
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
            })
        };

        const headerProps = {
            title: Lng.t('header.customFields', { locale }),
            leftIcon: ARROW_ICON,
            leftIconPress: () => navigation.goBack(null),
            rightIcon: 'plus',
            placement: 'center',
            rightIconPress: () => {
                navigation.navigate(ROUTES.CUSTOMER_FIELD, {
                    type: CREATE_CUSTOM_FIELD_TYPE
                });
            }
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
                            getItems={getCustomFields}
                            reference={ref => (this.scrollViewReference = ref)}
                            getItemsInMount={false}
                        >
                            <ListView
                                items={customFields}
                                onPress={this.onSelect}
                                isEmpty={isEmpty}
                                bottomDivider
                                emptyContentProps={emptyContentProps}
                                leftTitleStyle={styles.leftTitleText}
                                leftSubTitleLabelStyle={styles.leftSubTitleText}
                                leftSubTitleContainerStyle={
                                    styles.leftTitleContainer
                                }
                                rightTitleStyle={styles.rightTitleText}
                                isAnimated
                            />
                        </InfiniteScroll>
                    </View>
                </MainLayout>
            </View>
        );
    }
}
