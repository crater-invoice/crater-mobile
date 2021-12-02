import React from 'react';
import t from 'locales/use-translation';
import {routes} from '@/navigation';
import {IProps} from './list-settings-type.d';
import styles from './list-settings-style';
import {ListView, DefaultLayout} from '@/components';
import {fetchBootstrap} from 'stores/common/actions';
import {SETTINGS_MENU} from 'stores/setting/helpers';

export default class Settings extends React.Component<IProps> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {navigation, dispatch} = this.props;
    navigation.addListener('focus', () => {
      dispatch(fetchBootstrap());
    });
  }

  onSelect = item => {
    const {navigation} = this.props;

    if (!item?.route) {
      this[item.action]();
      return;
    }

    navigation.navigate(item.route);
  };

  render() {
    const {navigation, theme} = this.props;
    const settingList = SETTINGS_MENU().filter(list => list?.show);
    const headerProps = {
      leftIconPress: () => navigation.navigate(routes.MAIN_MORE),
      title: t('header.settings'),
      leftIconStyle: {color: theme?.header?.primary?.color}
    };

    return (
      <DefaultLayout
        headerProps={headerProps}
        hasSearchField={false}
        bodyStyle="px-0 pt-12 pb-17"
      >
        <ListView
          items={settingList}
          onPress={this.onSelect}
          leftTitleStyle={styles.listViewTitle(theme)}
          leftIconStyle={styles.listViewIcon}
          itemContainer={styles.itemContainer}
          rightArrowIcon
          hasAvatar
        />
      </DefaultLayout>
    );
  }
}
