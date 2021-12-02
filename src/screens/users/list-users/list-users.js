import React, {Component} from 'react';
import {change} from 'redux-form';
import {hasTextLength, isEmpty} from '@/constants';
import {fetchUsers} from 'stores/users/actions';
import {IProps, IStates} from './list-users-type.d';
import {routes} from '@/navigation';
import {primaryHeader} from '@/utils';
import usersFilter from './list-users-filter';
import {USERS_FORM} from 'stores/users/types';
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

  setFormField = (field, value) => {
    this.props.dispatch(change(USERS_FORM, field, value));
  };

  addNewUser = () =>
    this.props.navigation.navigate(routes.CREATE_USER, {type: 'ADD'});

  onSubmitFilter = data => {
    const {role = '', filterName = '', email = '', phone = ''} = data;
    const {search} = this.state;

    this.scrollViewReference?.getItems?.({
      queryString: {
        role,
        email,
        phone,
        search: hasTextLength(filterName) ? filterName : search
      },
      showLoader: true
    });
  };

  onResetFilter = () => {
    const {search} = this.state;
    this.scrollViewReference?.getItems?.({
      queryString: {search},
      resetQueryString: true,
      resetParams: true,
      showLoader: true
    });
  };
  render() {
    const {dispatch, users, route, handleSubmit} = this.props;
    const {search} = this.state;
    const filterProps = {
      onSubmitFilter: handleSubmit(this.onSubmitFilter),
      ...usersFilter(this),
      clearFilter: this.props,
      onResetFilter: () => this.onResetFilter
    };
    return (
      <MainLayout
        headerProps={primaryHeader({route})}
        onSearch={this.onSearch}
        bottomDivider
        filterProps={filterProps}
        bodyStyle="is-full-listView"
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
