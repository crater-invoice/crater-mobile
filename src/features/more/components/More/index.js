import React from 'react';
import styles from './styles';
import {MainLayout, ListView} from '@/components';
import {MORE_MENU} from '../../constants';
import t from 'locales/use-translation';
import {alertMe} from '@/constants';
import {logoutSuccess} from 'stores/auth/actions';

export class More extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      endpointVisible: false
    };
  }

  onSelectMenu = item => {
    const {navigation} = this.props;

    if (item.route) {
      navigation.navigate(item.route);
    } else {
      this[item.action]();
    }
  };

  onLogout = () => {
    const {dispatch} = this.props;

    alertMe({
      title: t('logout.confirmation'),
      showCancel: true,
      okText: t('logout.title'),
      okPress: () => dispatch?.(logoutSuccess())
    });
  };

  toggleEndpointModal = () => {
    this.setState(state => ({
      endpointVisible: !state.endpointVisible
    }));
  };

  render() {
    const {theme} = this.props;
    const settingList = [];
    MORE_MENU().map(list => list?.show && settingList.push(list));

    return (
      <MainLayout
        headerProps={{
          hasCircle: false,
          title: t('header.more')
        }}
        bottomDivider
        dividerStyle={styles.dividerStyle}
        hasSearchField={false}
      >
        <ListView
          items={settingList}
          onPress={this.onSelectMenu}
          hasAvatar
          refreshing={false}
          leftTitleStyle={styles.listViewTitle(theme)}
          leftIconStyle={styles.listViewIcon}
          itemContainer={styles.itemContainer}
          rightArrowIcon
          listViewContainerStyle={styles.listViewScrollContainerStyle}
        />
      </MainLayout>
    );
  }
}
