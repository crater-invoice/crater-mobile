import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {ListView, DefaultLayout} from '@/components';
import t from 'locales/use-translation';
import {REPORTS_MENU} from '../../constants';
import {routes} from '@/navigation';

export class Reports extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      endpointVisible: false
    };
  }

  onSelectMenu = ({route, type}) => {
    const {navigation} = this.props;

    if (route) {
      navigation.navigate(route, {type});
    }
  };

  render() {
    const {navigation, theme} = this.props;
    const reportList = [];
    REPORTS_MENU().map(list => {
      list?.show && reportList.push(list);
    });

    return (
      <DefaultLayout
        headerProps={{
          leftIconPress: () => navigation.navigate(routes.MAIN_MORE),
          title: t('header.reports'),
          leftArrow: 'primary'
        }}
        hasSearchField={false}
        bodyStyle="px-0 py-0"
      >
        <View style={styles.listViewContainer}>
          <ListView
            items={reportList}
            onPress={this.onSelectMenu}
            leftTitleStyle={styles.listViewTitle(theme)}
            rightArrowIcon
            rightArrowIconStyle={{marginTop: 5}}
          />
        </View>
      </DefaultLayout>
    );
  }
}
