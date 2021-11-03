import {getConditionStyles} from '@/constants';
import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle
} from 'react-native';
import {Text} from '../text';
import {fonts} from '@/styles';
import {ITheme} from '@/interfaces';

export class BaseTabs extends Component<IProps> {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {activeTab, setActiveTab, tabs} = this.props;
    !activeTab && setActiveTab(tabs[0].Title || tabs[0].id);
  }

  render() {
    const {activeTab, tabs, setActiveTab, style, tabStyle, theme} = this.props;

    let {render} = tabs.find(({id, Title}) => [id, Title].includes(activeTab));

    return (
      <View style={{...styles.container, ...style}}>
        <View style={[styles.tabs, tabStyle]}>
          {tabs.map(({id, Title, tabName}) => (
            <TouchableOpacity
              key={Title}
              activeOpacity={0.8}
              style={getConditionStyles([
                styles.tab(theme),
                {
                  condition: [Title, id].includes(activeTab),
                  style: styles.selected_tab(theme)
                }
              ])}
              onPress={() => setActiveTab(Title)}
            >
              {typeof tabName === 'string' ? (
                <Text
                  color={theme?.tab?.color}
                  bold2
                  h5
                  style={activeTab === Title && styles.selectedTabTitle(theme)}
                >
                  {tabName && tabName}
                </Text>
              ) : (
                tabName &&
                tabName({
                  active: [tabName, id].includes(activeTab)
                })
              )}
            </TouchableOpacity>
          ))}
        </View>
        {render}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  tabs: {
    width: '100%',
    height: 38,
    display: 'flex',
    flexDirection: 'row'
  },
  tab: theme => ({
    flex: 1,
    borderBottomWidth: 2,
    borderColor: theme?.tab?.borderColor,
    fontFamily: fonts.semiBold,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'left'
  }),
  selected_tab: theme => ({
    borderBottomWidth: 2,
    borderBottomColor: theme?.tab?.borderBottomColor
  }),
  selectedTabTitle: theme => ({
    color: theme?.tab?.activeColor
  })
});

interface IProps {
  /**
   * Name of currently active tab.
   */
  activeTab: string;

  /**
   * An array of objects with data for each tab option.
   */
  tabs: Array<any>;

  /**
   * Invoked with the the change event as an argument when the value changes.
   */
  setActiveTab?: (callback: any) => void;

  /**
   * Styling for the tab container.
   */
  style?: StyleProp<ViewStyle> | any;

  /**
   * Styles for the container surrounding the tab.
   */
  tabStyle?: StyleProp<ViewStyle> | any;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;
}
