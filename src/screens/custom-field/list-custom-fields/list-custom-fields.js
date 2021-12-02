import React from 'react';
import {routes} from '@/navigation';
import {primaryHeader} from '@/utils';
import {isEmpty} from '@/constants';
import styles from './list-custom-fields-style';
import {IProps, IStates} from './list-custom-fields-type.d';
import {fetchCustomFields} from 'stores/custom-field/actions';
import {
  MainLayout,
  ListView,
  InfiniteScroll,
  BaseEmptyPlaceholder
} from '@/components';

export default class CustomFields extends React.Component<IProps, IStates> {
  scrollViewReference: any;
  focusListener: any;

  constructor(props) {
    super(props);
    this.scrollViewReference = React.createRef();
    this.state = {search: ''};
  }

  componentDidMount() {
    this.onFocus();
  }

  componentWillUnmount() {
    this.focusListener?.remove?.();
  }

  onFocus = () => {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('focus', () => {
      this.scrollViewReference?.getItems?.();
    });
  };

  onSearch = search => {
    this.setState({search});
    this.scrollViewReference?.getItems?.({
      queryString: {search},
      showLoader: true
    });
  };

  onSelect = field => {
    const {navigation} = this.props;
    navigation.navigate(routes.CREATE_CUSTOM_FIELD, {
      id: field?.id,
      type: 'UPDATE'
    });
  };

  render() {
    const {customFields, dispatch, route} = this.props;
    const {search} = this.state;

    return (
      <MainLayout
        headerProps={primaryHeader({route})}
        onSearch={this.onSearch}
        bottomDivider
        bodyStyle="is-full-listView"
      >
        <InfiniteScroll
          getItems={q => dispatch(fetchCustomFields(q))}
          reference={ref => (this.scrollViewReference = ref)}
          getItemsInMount={false}
        >
          <ListView
            isAnimated
            bottomDivider
            items={customFields}
            onPress={this.onSelect}
            isEmpty={isEmpty(customFields)}
            leftTitleStyle={styles.leftTitleText}
            leftSubTitleLabelStyle={styles.leftSubTitleText}
            leftSubTitleContainerStyle={styles.leftTitleContainer}
            rightTitleStyle={styles.rightTitleText}
            emptyPlaceholder={
              <BaseEmptyPlaceholder {...this.props} search={search} />
            }
          />
        </InfiniteScroll>
      </MainLayout>
    );
  }
}
