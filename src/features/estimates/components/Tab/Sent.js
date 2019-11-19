// @flow
import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { ListView, Content } from '../../../../components';
import { IMAGES } from '../../../../config';
import Lng from '../../../../api/lang/i18n';
import { ESTIMATES_STATUS_BG_COLOR, ESTIMATES_STATUS_TEXT_COLOR } from '../../constants';

type IProps = {
    estimates: Array,
    onEstimateSelect: Function,
    getEstimates: Function,
    loading: String,
    canLoadMore: Boolean,
    refreshing: Boolean,
    fresh: Boolean,
    search: String,
    onAddEstimate: Function,
    loadMoreItems: Function,
    filter: Boolean
};

const Sent = ({
    estimates,
    onEstimateSelect,
    refreshing,
    loading,
    canLoadMore,
    getEstimates,
    fresh,
    search,
    language,
    navigation,
    onAddEstimate,
    loadMoreItems,
    filter
}: IProps) => {
    let items = [];

    if (typeof estimates !== 'undefined' && estimates.length != 0) {
        items = estimates.map((item) => {
            const {
                estimate_number,
                user: { name, currency } = {},
                status,
                formattedEstimateDate,
                total,
            } = item;

            return {
                title: name,
                subtitle: {
                    title: estimate_number,
                    label: status,
                    labelBgColor: ESTIMATES_STATUS_BG_COLOR[status],
                    labelTextColor: ESTIMATES_STATUS_TEXT_COLOR[status],
                },
                amount: total,
                currency,
                rightSubtitle: formattedEstimateDate,
                fullItem: item,
            };
        });
    }

    let empty = (!filter && !search) ? {
        description: Lng.t("estimates.empty.sent.description", { locale: language }),
        buttonTitle: Lng.t("estimates.empty.buttonTitle", { locale: language }),
        buttonPress: () => onAddEstimate(),
    } : {}

    let emptyTitle = search ? Lng.t("search.noResult", { locale: language, search })
        : (!filter) ? Lng.t("estimates.empty.sent.title", { locale: language }) :
            Lng.t("filter.empty.filterTitle", { locale: language })

    return (
        <View style={styles.content}>
            <Content loadingProps={{ is: refreshing && fresh }}>
                <ListView
                    items={items}
                    onPress={onEstimateSelect}
                    refreshing={refreshing}
                    loading={loading}
                    isEmpty={items.length <= 0}
                    canLoadMore={canLoadMore}
                    getFreshItems={(onHide) => {
                        getEstimates({
                            fresh: true,
                            onResult: onHide,
                            type: 'SENT',
                            q: search,
                            resetFilter: true
                        });
                    }}
                    getItems={() => {
                        loadMoreItems({
                            type: 'SENT',
                            q: search,
                        });
                    }}
                    bottomDivider
                    emptyContentProps={{
                        title: emptyTitle,
                        image: IMAGES.EMPTY_ESTIMATES,
                        ...empty
                    }}
                />
            </Content>
        </View>
    );
};

export default Sent;
