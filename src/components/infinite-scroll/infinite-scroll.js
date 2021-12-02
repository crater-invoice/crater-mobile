import React from 'react';
import {ScrollView, RefreshControl, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import debounce from 'lodash/debounce';
import {styles} from './styles';
import {colors} from '@/styles/colors';
import {Empty} from '../empty';
import {Content} from '../content';
import {hasValue} from '@/constants';
import {commonSelector} from 'stores/common/selectors';
import {IProps, IState} from './type.d';

const isScrollToEnd = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 65;

  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

class ScrollList extends React.Component<IProps, IState> {
  isLoading: boolean;
  allParams: any;
  allQueryStrings: any;

  constructor(props) {
    super(props);
    this.isLoading = false;
    this.allParams = {};
    this.allQueryStrings = {
      orderByField: 'created_at',
      orderBy: 'desc',
      ...props?.defaultQueryString
    };
    this.state = {
      loading: props?.hideLoader ? false : true,
      refreshing: false,
      searchLoading: false,
      isMore: false,
      page: 1,
      limit: props?.paginationLimit ? props?.paginationLimit : 12
    };
  }

  static defaultProps = {
    getItemsInMount: true,
    hideLoader: false,
    paginationLimit: 12
  };

  componentDidMount() {
    const {getItemsInMount, reference, onMount} = this.props;

    reference?.(this);
    getItemsInMount && this.getItems();
    setTimeout(() => {
      this.getItems = debounce(this.getItems, 300);
    }, 1000);

    onMount?.();
  }

  componentWillUnmount() {
    // this.props.reference?.(undefined);
  }

  getItems = ({
    fresh = true,
    params = {},
    queryString = null,
    onSuccess = null,
    resetQueryString = false,
    resetParams = false,
    showLoader = false,
    hideLoader = false
  } = {}) => {
    if (!hideLoader && this.isLoading) {
      return;
    }

    if (!fresh && !this.state.isMore) {
      return;
    }

    if (!this.props?.getItems) {
      return;
    }

    if (showLoader) {
      this.setState({searchLoading: true});
    }

    this.isLoading = true;

    this.updateParamsValues(resetParams, params);
    this.updateQueryStringValues(resetQueryString, queryString);

    const getItemProps = {
      queryString: this.getQueryStringValue(
        resetQueryString,
        queryString,
        fresh
      ),
      ...(!resetParams && this.allParams),
      ...params
    };

    this.props?.getItems?.({
      fresh,
      ...getItemProps,
      onSuccess: res => {
        this.updateInitialState(res);
        onSuccess?.(res);
      },
      onFail: this.onFail
    });
  };

  onFail = () => {
    this.setState({
      loading: false,
      refreshing: false,
      searchLoading: false,
      isMore: false
    });
    this.isLoading = false;
  };

  getQueryStringValue = (resetQueryString, queryString, fresh) => {
    const {page, limit} = this.state;

    return {
      ...(!resetQueryString
        ? this.allQueryStrings
        : {orderByField: 'created_at', orderBy: 'desc'}),
      ...queryString,
      limit,
      page: fresh ? 1 : page
    };
  };

  updateParamsValues = (reset, params) => {
    this.allParams = {...(!reset && this.allParams), ...params};
  };

  updateQueryStringValues = (reset, queryString) => {
    this.allQueryStrings = !reset
      ? {...this.allQueryStrings, ...queryString}
      : {orderByField: 'created_at', orderBy: 'desc', ...queryString};
  };

  updateInitialState = res => {
    let next_page_url = res?.links?.next ?? null;
    let current_page = res?.meta?.current_page ?? 1;
    this.setState({
      loading: false,
      refreshing: false,
      searchLoading: false,
      isMore: hasValue(next_page_url),
      page: current_page + 1
    });
    this.isLoading = false;
  };

  onRefresh = () => {
    this.setState({refreshing: true});
    this.getItems();
  };

  render() {
    const {loading, refreshing, searchLoading, isMore} = this.state;
    const {
      style,
      contentContainerStyle,
      isEmpty,
      refreshControlColor,
      emptyContentProps,
      children,
      hideRefreshControl,
      theme
    } = this.props;

    const loaderColor =
      refreshControlColor || theme?.mode === 'light'
        ? colors.veryDarkGray
        : colors.white;

    const refreshControl =
      !loading && !hideRefreshControl ? (
        <RefreshControl
          refreshing={refreshing}
          onRefresh={this.onRefresh}
          tintColor={loaderColor}
        />
      ) : null;

    const loader = (
      <ActivityIndicator
        size={'large'}
        color={loaderColor}
        style={styles.loader}
      />
    );

    const loadingProps = {
      is: loading || searchLoading,
      ...(searchLoading && {
        style: styles.searchLoader
      })
    };

    return (
      <ScrollView
        style={[styles.container, style]}
        contentContainerStyle={[{flexGrow: 1}, contentContainerStyle]}
        scrollEventThrottle={400}
        refreshControl={refreshControl}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        onScroll={({nativeEvent}) => {
          if (isScrollToEnd(nativeEvent) && !loading && !refreshing) {
            this.getItems({fresh: false});
          }
        }}
      >
        <Content loadingProps={loadingProps} theme={theme}>
          {!isEmpty ? children : <Empty {...emptyContentProps} theme={theme} />}

          {!loading && !refreshing && isMore && loader}
        </Content>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => commonSelector(state);

export const InfiniteScroll = connect(mapStateToProps)(ScrollList);
