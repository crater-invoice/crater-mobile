import React, {Component} from 'react';
import t from 'locales/use-translation';
import {ARROW_ICON} from '@/assets';
import {isEmpty} from '@/constants';
import {fetchUsers} from 'stores/users/actions';
import {IProps, IStates} from './users-type';
import {InfiniteScroll, ListView, MainLayout} from '@/components';
import {routes} from '@/navigation';

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
    const {navigation, dispatch, users, route} = this.props;
    const {search} = this.state;
    const emptyTitle = search ? 'search.noResult' : 'users.empty.title';
    const emptyContentProps = {
      title: t(emptyTitle, {search}),
      ...(!search && {
        description: t('users.empty.description'),
        buttonTitle: t('users.text_add_new_user'),
        buttonPress: this.addNewUser
      })
    };

    const headerProps = {
      leftIcon: ARROW_ICON,
      leftIconPress: () => navigation.goBack(null),
      title: t('header.users'),
      placement: 'center',
      route,
      rightIcon: 'plus',
      rightIconPress: this.addNewUser
    };

    return (
      <MainLayout
        headerProps={headerProps}
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
            onPress={this.onSelect}
            isAnimated
            hasAvatar
            bottomDivider
            isEmpty={isEmpty(users)}
            route={route}
            emptyContentProps={emptyContentProps}
          />
        </InfiniteScroll>
      </MainLayout>
    );
  }
}
