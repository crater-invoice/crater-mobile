import React, {Component} from 'react';
import {isEmpty} from '@/constants';
import {fetchRoles} from 'stores/roles/actions';
import {IProps, IStates} from './list-roles-type';
import {routes} from '@/navigation';
import {primaryHeader} from '@/utils';
import {
  BaseEmptyPlaceholder,
  InfiniteScroll,
  ListView,
  MainLayout
} from '@/components';

export default class Roles extends Component<IProps, IStates> {
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

  onSelect = role => {
    const {navigation} = this.props;
    navigation.navigate(routes.CREATE_ROLE, {id: role.id, type: 'UPDATE'});
  };

  render() {
    const {dispatch, roles, route} = this.props;
    const {search} = this.state;

    return (
      <MainLayout
        headerProps={primaryHeader({route})}
        onSearch={this.onSearch}
        bottomDivider
      >
        <InfiniteScroll
          getItems={q => dispatch(fetchRoles(q))}
          reference={ref => (this.scrollViewReference = ref)}
          getItemsInMount={false}
        >
          <ListView
            items={roles}
            isAnimated
            hasAvatar
            bottomDivider
            onPress={this.onSelect}
            isEmpty={isEmpty(roles)}
            emptyPlaceholder={
              <BaseEmptyPlaceholder {...this.props} search={search} />
            }
          />
        </InfiniteScroll>
      </MainLayout>
    );
  }
}
