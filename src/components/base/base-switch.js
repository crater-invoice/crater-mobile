import React, {Component} from 'react';
import {
  Switch as RNSwitch,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle
} from 'react-native';
import {connect} from 'react-redux';
import {colors} from '@/styles';
import {ITheme} from '@/interfaces';
import {Text} from '../text';
import {commonSelector} from 'stores/common/selectors';
import {isIosPlatform, isAndroidPlatform} from '@/helpers/platform';

class Switch extends Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.state = {status: false};
  }

  componentDidMount() {
    const {status, input} = this.props;
    if (status) this.setState({status});
    if (!status && input?.value) {
      this.setState({status: input?.value ? true : false});
    }
  }

  onToggle = () => {
    const {onChangeCallback, disabled, input} = this.props;
    const {status} = this.state;

    if (disabled) {
      return;
    }

    this.setState(prevState => {
      return {status: !prevState.status};
    });

    input?.onChange?.(!status);

    onChangeCallback?.(!status);
  };

  render() {
    const {status} = this.state;
    const {
      hint,
      description,
      containerStyle,
      mainContainerStyle,
      hintStyle,
      descriptionStyle,
      input: {value},
      switchStyle,
      isRequired,
      theme
    } = this.props;

    return (
      <View style={[mainContainerStyle]}>
        <View style={[styles.container, containerStyle && containerStyle]}>
          {hint && (
            <Text
              h4
              color={theme?.text?.secondaryColor}
              numberOfLines={2}
              medium={
                !this.props?.['title-text-default'] && theme?.mode === 'dark'
              }
              style={[styles.hint, hintStyle && hintStyle]}
            >
              {hint}
              {isRequired ? <Text danger> *</Text> : null}
            </Text>
          )}
          <RNSwitch
            ios_backgroundColor={colors.darkGray}
            thumbColor={colors.white}
            trackColor={{
              false: colors.darkGray,
              true: colors.primaryLight
            }}
            onValueChange={() => this.onToggle()}
            value={status}
            style={[styles.switchStyle, switchStyle && switchStyle]}
          />
        </View>
        {description ? (
          <View style={styles.descriptionContainer}>
            <Text
              color={theme?.icons?.primaryColor}
              h5
              style={descriptionStyle}
            >
              {description}
            </Text>
          </View>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = state => commonSelector(state);

export const BaseSwitch = connect(mapStateToProps)(Switch);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    marginVertical: 15,
    alignItems: 'center'
  },
  hint: {
    marginTop: 4,
    width: '83%'
  },
  switchStyle: {
    transform: isIosPlatform
      ? [{scaleX: 0.8}, {scaleY: 0.8}]
      : [{scaleX: 1.2}, {scaleY: 1.2}]
  },
  switchContainer: {
    height: 20
  },
  descriptionContainer: {
    flex: 1,
    paddingRight: 8,
    marginTop: -5,
    ...(isAndroidPlatform && {
      marginTop: -10
    })
  }
});

interface IProps {
  /**
   * Redux form built-in input events.
   */
  input?: any;

  /**
   * If true the user won't be able to press.
   * @default false
   */
  disabled?: boolean;

  /**
   * Redux form built-in meta validation events.
   */
  meta?: any;

  /**
   * Styling for the main container.
   */
  containerStyle?: StyleProp<ViewStyle> | any;

  /**
   * Styles for the container surrounding the switch view.
   */
  switchStyle?: StyleProp<ViewStyle> | any;

  /**
   * The value of the switch. If true the switch will be turned on.
   * Default value is false.
   */
  status: boolean;

  /**
   * Styles for the container surrounding the description.
   */
  descriptionStyle?: StyleProp<ViewStyle> | any;

  /**
   * Styles for the container surrounding the title.
   */
  hintStyle?: StyleProp<TextStyle> | any;

  /**
   * Label of switch view.
   */
  hint?: string;

  /**
   * Description of switch view.
   */
  description?: string;

  /**
   * Invoked with the the change event as an argument when the value changes.
   */
  onChangeCallback?: (callback: any) => void;

  /**
   * If true, required validation message shows.
   */
  isRequired?: boolean;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme?: ITheme;

  /**
   * Styling for main container.
   */
  mainContainerStyle?: StyleProp<ViewStyle> | any;
}

interface IStates {
  /**
   * The value of the switch. If true the switch will be turned on.
   * Default value is false.
   */
  status: boolean;
}
