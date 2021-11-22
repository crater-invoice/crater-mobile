import React from 'react';
import {routes} from '@/navigation';
import {IProps, IStates} from './list-taxes-type.d';
import {isEmpty} from '@/constants';
import {primaryHeader} from '@/utils';
import {fetchTaxes} from 'stores/tax-type/actions';
import {itemsDescriptionStyle} from '@/styles';
import {
  MainLayout,
  ListView,
  InfiniteScroll,
  BaseEmptyPlaceholder
} from '@/components';

export default class Taxes extends React.Component<IProps, IStates> {
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

  onSelect = tax => {
    const {navigation} = this.props;
    navigation.navigate(routes.CREATE_TAX, {type: 'UPDATE', id: tax.id});
  };

  render() {
    const {taxTypes, dispatch, route} = this.props;
    const {search} = this.state;

    return (
      <MainLayout
        headerProps={primaryHeader({route})}
        onSearch={this.onSearch}
        bottomDivider
        bodyStyle="is-full-listView"
      >
        <InfiniteScroll
          getItems={q => dispatch(fetchTaxes(q))}
          reference={ref => (this.scrollViewReference = ref)}
          getItemsInMount={false}
        >
          <ListView
            isAnimated
            bottomDivider
            items={taxTypes}
            onPress={this.onSelect}
            isEmpty={isEmpty(taxTypes)}
            contentContainerStyle={{flex: 3}}
            leftSubTitleStyle={itemsDescriptionStyle(45)}
            emptyPlaceholder={
              <BaseEmptyPlaceholder {...this.props} search={search} />
            }
          />
        </InfiniteScroll>
      </MainLayout>
    );
  }
}
