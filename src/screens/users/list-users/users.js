import React, {Component} from 'react';
import {isEmpty} from '@/constants';
import {fetchUsers} from 'stores/users/actions';
import {IProps, IStates} from './users-type';
import {routes} from '@/navigation';
import {primaryHeader} from '@/utils';
import {
  BaseEmptyPlaceholder,
  InfiniteScroll,
  ListView,
  MainLayout
} from '@/components';

export default class Users extends Component<IProps, IStates> {
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

  onSelect = user => {
    const {navigation} = this.props;
    navigation.navigate(routes.CREATE_USER, {id: user.id, type: 'UPDATE'});
  };

  addNewUser = () =>
    this.props.navigation.navigate(routes.CREATE_USER, {type: 'ADD'});

  render() {
    const {dispatch, users, route} = this.props;
    const {search} = this.state;

    return (
      <MainLayout
        headerProps={primaryHeader({route})}
        onSearch={this.onSearch}
        bottomDivider
      >
        <InfiniteScroll
          getItems={q => dispatch(fetchUsers(q))}
          reference={ref => (this.scrollViewReference = ref)}
          getItemsInMount={false}
        >
          <ListView
            items={users}
            isAnimated
            hasAvatar
            bottomDivider
            onPress={this.onSelect}
            isEmpty={isEmpty(users)}
            emptyPlaceholder={
              <BaseEmptyPlaceholder {...this.props} search={search} />
            }
          />
        </InfiniteScroll>
      </MainLayout>
    );
  }
}
