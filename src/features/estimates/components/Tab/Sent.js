// @flow
import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { ListView, Content } from '@/components';
import { IMAGES } from '@/assets';
import Lng from '@/lang/i18n';

type IProps = {
    canLoadMore: Boolean,
    parentProps: any
};

const Sent = ({ canLoadMore, parentProps }: IProps) => {

    const {
        props,
        state,
        getItems,
        onEstimateSelect,
        loadMoreItems,
        onAddEstimate
    } = parentProps
    const { sentEstimates = [], loading, locale } = props
    const { refreshing, fresh, search, filter } = state

    let empty = (!filter && !search) ? {
        description: Lng.t("estimates.empty.sent.description", { locale }),
        buttonTitle: Lng.t("estimates.empty.buttonTitle", { locale }),
        buttonPress: () => onAddEstimate(),
    } : {}

    let emptyTitle = search ? Lng.t("search.noResult", { locale, search })
        : (!filter) ? Lng.t("estimates.empty.sent.title", { locale }) :
            Lng.t("filter.empty.filterTitle", { locale })

    return (
        <View style={styles.content}>
            <Content loadingProps={{ is: refreshing && fresh }}>
                <ListView
                    items={sentEstimates}
                    onPress={onEstimateSelect}
                    refreshing={refreshing}
                    loading={loading}
                    isEmpty={sentEstimates.length <= 0}
                    canLoadMore={canLoadMore}
                    getFreshItems={(onHide) => {
                        getItems({
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
