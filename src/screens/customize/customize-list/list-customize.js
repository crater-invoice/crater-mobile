import React, {Component} from 'react';
import {View} from 'react-native';
import styles from './list-customize-styles';
import {ListView, DefaultLayout} from '@/components';
import t from 'locales/use-translation';
import {IProps} from './list-customize-type';
import {CUSTOMIZES_MENU} from 'stores/customize/helpers';
import {routes} from '@/navigation';

export default class CustomizeList extends Component<IProps> {
  constructor(props) {
    super(props);
  }

  onSelectMenu = ({route}) => {
    const {navigation} = this.props;
    route && navigation.navigate(route);
  };

  render() {
    const {navigation, theme} = this.props;
    const customizeList = [];
    CUSTOMIZES_MENU().map(list => list?.show && customizeList.push(list));
    const headerProps = {
      leftIconPress: () => navigation.navigate(routes.SETTING_LIST),
      title: t('header.customize'),
      leftArrow: 'primary'
    };

    return (
      <DefaultLayout
        headerProps={headerProps}
        hasSearchField={false}
        bodyStyle="px-0 py-0"
      >
        <View style={styles.listViewContainer}>
          <ListView
            items={customizeList}
            onPress={this.onSelectMenu}
            leftTitleStyle={styles.listViewTitle(theme)}
            rightArrowIcon
            rightArrowIconStyle={styles.rightArrowIconStyle}
          />
        </View>
      </DefaultLayout>
    );
  }
}
