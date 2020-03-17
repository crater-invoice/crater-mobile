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

const Draft = ({ canLoadMore, parentProps }: IProps) => {

    const {
        props,
        state,
        getItems,
        onEstimateSelect,
        loadMoreItems,
        onAddEstimate
    } = parentProps
    const { draftEstimates = [], loading, language } = props
    const { refreshing, fresh, search, filter } = state

    let empty = (!filter && !search) ? {
        description: Lng.t("estimates.empty.draft.description", { locale: language }),
        buttonTitle: Lng.t("estimates.empty.buttonTitle", { locale: language }),
        buttonPress: () => onAddEstimate(),
    } : {}

    let emptyTitle = search ? Lng.t("search.noResult", { locale: language, search })
        : (!filter) ? Lng.t("estimates.empty.draft.title", { locale: language }) :
            Lng.t("filter.empty.filterTitle", { locale: language })

    return (
        <View style={styles.content}>
            <Content loadingProps={{ is: refreshing && fresh }}>
                <ListView
                    items={draftEstimates}
                    onPress={onEstimateSelect}
                    refreshing={refreshing}
                    loading={loading}
                    isEmpty={draftEstimates.length <= 0}
                    canLoadMore={canLoadMore}
                    getFreshItems={(onHide) => {
                        getItems({
                            fresh: true,
                            onResult: onHide,
                            type: 'DRAFT',
                            q: search,
                            resetFilter: true
                        });
                    }}
                    getItems={() => {
                        loadMoreItems({
                            type: 'DRAFT',
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

export default Draft;
