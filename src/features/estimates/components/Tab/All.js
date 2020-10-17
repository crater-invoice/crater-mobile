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

const All = ({ canLoadMore, parentProps }: IProps) => {

    const {
        props,
        state,
        getItems,
        onEstimateSelect,
        loadMoreItems,
        onAddEstimate
    } = parentProps
    const { allEstimates = [], loading, locale } = props
    const { refreshing, fresh, search, filter } = state

    let empty = (!filter && !search) ? {
        description: Lng.t("estimates.empty.all.description", { locale }),
        buttonTitle: Lng.t("estimates.empty.buttonTitle", { locale }),
        buttonPress: () => onAddEstimate()
    } : {}

    let emptyTitle = search ? Lng.t("search.noResult", { locale, search })
        : (!filter) ? Lng.t("estimates.empty.all.title", { locale }) :
            Lng.t("filter.empty.filterTitle", { locale })

    return (
        <View style={styles.content}>
            <Content loadingProps={{ is: refreshing && fresh }}>
                <ListView
                    items={allEstimates}
                    onPress={onEstimateSelect}
                    refreshing={refreshing}
                    loading={loading}
                    isEmpty={allEstimates.length <= 0}
                    canLoadMore={canLoadMore}
                    getFreshItems={(onHide) => {
                        getItems({
                            fresh: true,
                            onResult: onHide,
                            type: '',
                            q: search,
                            resetFilter: true
                        });
                    }}
                    getItems={() => {
                        loadMoreItems({
                            type: '',
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

export default All;
