import React, {Component, Fragment} from 'react';
import {TouchableOpacity, View, StatusBar, StyleSheet} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import {AssetIcon} from '../asset-icon';
import {colors} from '@/styles';
import {isEmpty} from '@/constants';
import {isIosPlatform, definePlatformParam} from '@/helpers/platform';
import {ITheme} from '@/interfaces';

export class BaseActionSheet extends Component<IProps, IStates> {
  actionSheet: any;
  constructor(props) {
    super(props);
    this.state = {
      labelOptions: [],
      visible: false
    };
  }

  componentWillMount() {
    const {options} = this.props;
    const labelOptions = [...options, {label: 'Cancel', value: null}].map(
      ({label}) => label
    );

    this.setState({labelOptions});
  }

  onToggleStatus = () => {
    this.setState(prevState => {
      return {visible: !prevState.visible};
    });
  };

  showActionSheet = () => {
    this.onToggleStatus();
    this.actionSheet?.show?.();
  };

  onSelect = index => {
    this.onToggleStatus();

    const {options, onSelect} = this.props;

    const valueOptions = [...options, {label: 'Cancel', value: null}].map(
      ({value}) => value
    );

    onSelect?.(valueOptions[index]);
  };

  buttonView = () => {
    const {hasIcon = true, theme} = this.props;
    return !hasIcon ? (
      <Fragment />
    ) : (
      <TouchableOpacity
        onPress={this.showActionSheet}
        style={styles.button}
        hitSlop={{
          top: 30,
          left: 30,
          bottom: 30,
          right: 30
        }}
      >
        <AssetIcon
          name="ellipsis-h"
          size={18}
          style={styles.iconStyle(theme)}
        />
      </TouchableOpacity>
    );
  };

  render() {
    const {
      options,
      cancelButtonIndex,
      destructiveButtonIndex,
      theme
    } = this.props;
    const {labelOptions, visible} = this.state;

    if (isEmpty(options)) {
      return null;
    }

    return (
      <View>
        {visible && (
          <StatusBar
            backgroundColor={colors.secondary}
            barStyle={
              theme.mode === 'dark'
                ? 'light-content'
                : definePlatformParam('dark-content', 'light-content')
            }
            translucent={true}
          />
        )}

        {this.buttonView()}

        {labelOptions && (
          <ActionSheet
            ref={o => (this.actionSheet = o)}
            tintColor={
              theme?.mode === 'dark' && isIosPlatform
                ? colors.gray2
                : colors.primary
            }
            options={labelOptions}
            cancelButtonIndex={cancelButtonIndex || 2}
            destructiveButtonIndex={destructiveButtonIndex || 1}
            onPress={this.onSelect}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    marginRight: 10
  },
  iconStyle: theme => ({
    color: theme?.icons?.primaryBgColor
  })
});

interface IProps {
  /**
   * An array of objects with data for each dropdown option.
   */
  options: Array<any>;

  /**
   * Called when selecting one of any options.
   */
  onPress?: () => void;

  /**
   * The index of a cancel button option
   */
  cancelButtonIndex?: number;

  /**
   * The index of a destructive button option
   */
  destructiveButtonIndex?: number;

  /**
   * Invoked with the the change event as an argument when the value changes.
   */
  onSelect?: (callback: any) => void;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme?: ITheme;

  /**
   * If true, hide the default icon view.
   */
  hasIcon?: boolean;
}

interface IStates {
  /**
   * If true the dropdown is showing.
   */
  visible?: boolean;

  /**
   * An array of objects with data for each dropdown option.
   */
  labelOptions: Array<any>;
}
