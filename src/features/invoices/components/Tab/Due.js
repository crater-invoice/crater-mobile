// @flow
import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { ListView, Content } from '../../../../components';
import { IMAGES } from '../../../../config';
import Lng from '../../../../api/lang/i18n';

type IProps = {
    canLoadMore: Boolean,
    parentProps: any
};

const Due = ({ canLoadMore, parentProps }: IProps) => {

    const {
        props,
        state,
        getItems,
        onInvoiceSelect,
        loadMoreItems,
        onAddInvoice
    } = parentProps
    const { dueInvoices = [], navigation, loading, language } = props
    const { refreshing, fresh, search, filter } = state

    let empty = (!filter && !search) ? {
        description: Lng.t("invoices.empty.due.description", { locale: language }),
        buttonTitle: Lng.t("invoices.empty.buttonTitle", { locale: language }),
        buttonPress: () => onAddInvoice(),
    } : {}

    let emptyTitle = search ? Lng.t("search.noResult", { locale: language, search })
        : (!filter) ? Lng.t("invoices.empty.due.title", { locale: language }) :
            Lng.t("filter.empty.filterTitle", { locale: language })

    let isLoading = navigation.getParam('loading', false)

    return (
        <View style={styles.content}>
            <Content loadingProps={{ is: isLoading || (refreshing && fresh) }}>
                <ListView
                    items={dueInvoices}
                    onPress={onInvoiceSelect}
                    refreshing={refreshing}
                    loading={loading}
                    isEmpty={dueInvoices.length <= 0}
                    canLoadMore={canLoadMore}
                    getFreshItems={(onHide) => {
                        getItems({
                            fresh: true,
                            onResult: onHide,
                            type: 'UNPAID',
                            q: search,
                            resetFilter: true
                        });
                    }}
                    getItems={() => {
                        loadMoreItems({
                            type: 'UNPAID',
                            q: search,
                        });
                    }}
                    bottomDivider
                    emptyContentProps={{
                        title: emptyTitle,
                        image: IMAGES.EMPTY_INVOICES,
                        ...empty
                    }}
                />
            </Content>
        </View>
    );
};

export default Due;
