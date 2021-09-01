import React, {Component} from 'react';
import {Switch as RNSwitch, View} from 'react-native';
import {connect} from 'react-redux';
import {colors} from '@/styles';
import {styles} from './styles';
import {Text} from '../Text';
import {commonSelector} from 'stores/common/selectors';

type IProps = {
  input: Object,
  disabled: Boolean,
  meta: Object,
  switchStyle: Object,
  containerStyle: Object,
  descriptionStyle: Object,
  hintStyle: Object,
  hint: string,
  description: String,
  switchType: String
};
class Switch extends Component<IProps> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      status: false
    };
  }

  componentDidMount() {
    const {
      status,
      input: {value}
    } = this.props;
    if (status) this.setState({status});
    if (!status && value) {
      this.setState({status: value ? true : false});
    }
  }

  onToggle = () => {
    const {
      onChangeCallback,
      disabled,
      input: {onChange}
    } = this.props;
    const {status} = this.state;

    if (disabled) {
      return;
    }

    this.setState(prevState => {
      return {status: !prevState.status};
    });

    onChange(!status);

    onChangeCallback && onChangeCallback(!status);
  };

  render() {
    const {loading, status} = this.state;

    const {
      switchType,
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
      <View
        style={[styles.mainContainer, mainContainerStyle && mainContainerStyle]}
      >
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

const mapStateToProps = state => ({
  ...commonSelector(state)
});

export const ToggleSwitch = connect(mapStateToProps)(Switch);
