import React, {Component} from 'react';
import t from 'locales/use-translation';
import {ARROW_ICON} from '@/assets';
import {isEmpty} from '@/constants';
import {fetchRoles} from 'modules/roles/actions';
import {IProps, IStates} from './roles-type';
import {InfiniteScroll, ListView, MainLayout} from '@/components';
import {goBack, MOUNT, UNMOUNT, ROUTES} from '@/navigation';

export default class Roles extends Component<IProps, IStates> {
  scrollViewReference: any;
  focusListener: any;

  constructor(props) {
    super(props);
    this.scrollViewReference = React.createRef();
    this.state = {search: ''};
  }

  componentDidMount() {
    const {navigation} = this.props;
    goBack(MOUNT, navigation);
    this.onFocus();
  }

  componentWillUnmount() {
    goBack(UNMOUNT);
    this.focusListener?.remove?.();
  }

  onFocus = () => {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
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
    navigation.navigate(ROUTES.CREATE_ROLE, {role, type: 'UPDATE'});
  };

  addNewRole = () =>
    this.props.navigation.navigate(ROUTES.CREATE_ROLE, {type: 'ADD'});

  render() {
    const {navigation, dispatch, roles} = this.props;
    const {search} = this.state;
    const emptyTitle = search ? 'search.noResult' : 'roles.empty.title';
    const emptyContentProps = {
      title: t(emptyTitle, {search}),
      ...(!search && {
        description: t('roles.empty.description'),
        buttonTitle: t('roles.text_add_new_role'),
        buttonPress: this.addNewRole
      })
    };

    const headerProps = {
      leftIcon: ARROW_ICON,
      leftIconPress: () => navigation.goBack(null),
      title: t('header.roles'),
      placement: 'center',
      navigation,
      rightIcon: 'plus',
      rightIconPress: this.addNewRole
    };

    return (
      <MainLayout
        headerProps={headerProps}
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
            onPress={this.onSelect}
            isAnimated
            hasAvatar
            bottomDivider
            isEmpty={isEmpty(roles)}
            emptyContentProps={emptyContentProps}
          />
        </InfiniteScroll>
      </MainLayout>
    );
  }
}
