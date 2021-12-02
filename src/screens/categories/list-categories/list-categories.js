import React from 'react';
import {routes} from '@/navigation';
import {IProps, IStates} from './list-categories-type.d';
import {isEmpty} from '@/constants';
import {fetchCategories} from 'stores/category/actions';
import {primaryHeader} from '@/utils';
import {
  MainLayout,
  ListView,
  InfiniteScroll,
  BaseEmptyPlaceholder
} from '@/components';

export default class Categories extends React.Component<IProps, IStates> {
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

  onSelect = category => {
    const {navigation} = this.props;
    navigation.navigate(routes.CREATE_CATEGORY, {
      type: 'UPDATE',
      id: category.id
    });
  };

  render() {
    const {categories, dispatch, route} = this.props;
    const {search} = this.state;

    return (
      <MainLayout
        headerProps={primaryHeader({route})}
        onSearch={this.onSearch}
        bottomDivider
        bodyStyle="is-full-listView"
      >
        <InfiniteScroll
          getItems={q => dispatch(fetchCategories(q))}
          reference={ref => (this.scrollViewReference = ref)}
          getItemsInMount={false}
        >
          <ListView
            isAnimated
            bottomDivider
            items={categories}
            onPress={this.onSelect}
            isEmpty={isEmpty(categories)}
            emptyPlaceholder={
              <BaseEmptyPlaceholder {...this.props} search={search} />
            }
          />
        </InfiniteScroll>
      </MainLayout>
    );
  }
}
