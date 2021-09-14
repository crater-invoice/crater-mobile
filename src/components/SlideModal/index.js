import React, {Component} from 'react';
import {View, Modal} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {ListView} from '../ListView';
import {MainLayout, DefaultLayout} from '../Layouts';
import {InfiniteScroll} from '../InfiniteScroll';
import {ScrollView} from '../ScrollView';
import {isAndroidPlatform} from '@/constants';
import {commonSelector} from 'stores/common/selectors';

type IProps = {
  visible: Boolean,
  onToggle: Function,
  headerProps: Object,
  onSearch: Function,
  bottomDivider: Boolean,
  hasSearchField: Boolean,
  listViewProps: Object,
  defaultLayout: Boolean,
  children: Object,
  bottomAction: Object,
  searchInputProps: Object,
  searchFieldProps: any,
  isPagination: Boolean,
  infiniteScrollProps: any,
  scrollViewProps: any
};

class Screen extends Component<IProps> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      visible,
      onToggle,
      headerProps,
      onSearch,
      bottomDivider = false,
      listViewProps,
      defaultLayout,
      children,
      bottomAction,
      searchInputProps,
      searchFieldProps,
      isPagination = false,
      infiniteScrollProps,
      scrollViewProps,
      customView,
      theme
    } = this.props;

    const listViewChildren = isPagination ? (
      <View style={styles.listViewContainer}>
        <InfiniteScroll {...infiniteScrollProps}>
          <ListView {...listViewProps} />
        </InfiniteScroll>
      </View>
    ) : (
      <View style={styles.listViewContainer}>
        <ScrollView scrollViewProps={scrollViewProps}>
          <ListView {...listViewProps} />
        </ScrollView>
      </View>
    );

    return (
      <Modal
        animationType="slide"
        visible={visible}
        onRequestClose={onToggle && onToggle}
        hardwareAccelerated={true}
        statusBarTranslucent={true}
      >
        <View style={styles.modalContainer}>
          {!defaultLayout && (
            <MainLayout
              headerProps={{
                ...headerProps,
                ...(isAndroidPlatform && {
                  containerStyle: styles.header
                })
              }}
              onSearch={onSearch}
              bottomDivider={bottomDivider}
              bottomAction={bottomAction}
              inputProps={searchInputProps && searchInputProps}
              searchFieldProps={{
                ...searchFieldProps,
                ...(theme?.mode === 'dark' && {
                  inputContainerStyle: {
                    height: 38
                  },
                  inputFieldStyle: {
                    marginTop: 10,
                    marginBottom: 14
                  }
                })
              }}
              searchFieldStyle={styles.searchView}
            >
              {listViewChildren}
            </MainLayout>
          )}

          {defaultLayout && (
            <DefaultLayout
              headerProps={{
                ...headerProps,
                ...(isAndroidPlatform && {
                  containerStyle: styles.header
                })
              }}
              bottomAction={bottomAction}
            >
              {children ? children : listViewChildren}
            </DefaultLayout>
          )}
        </View>
        {customView}
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  ...commonSelector(state)
});

export const SlideModal = connect(mapStateToProps)(Screen);
