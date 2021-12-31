import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {Text, View} from '@/components';

import {styles} from './styles';
import {IProps, IStates} from './type.d';

export class RadioButtonGroup extends Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.state = {selected: false};
  }

  static defaultProps = {isList: false};

  componentWillMount() {
    const {initialValue} = this.props;
    if (initialValue) {
      this.setState({
        selected: initialValue
      });
    }
  }

  onSelect = val => {
    const {
      input: {onChange},
      onChangeCallback
    } = this.props;

    onChange(val);
    onChangeCallback?.(val);
    this.setState({selected: val});
  };

  render() {
    const {options, hint, theme, isList} = this.props;
    const {selected} = this.state;

    return (
      <View style={styles.fieldContainer}>
        {hint && (
          <Text
            h5
            color={theme?.viewLabel?.primaryColor}
            bold2={theme?.mode === 'dark'}
            style={styles.hintStyle}
          >
            {hint}
          </Text>
        )}
        <View style={!isList && styles.buttonGroupContainer}>
          {options.map(item => {
            const {key, label, description} = item;
            return (
              <TouchableOpacity
                key={key}
                style={[
                  styles.buttonContainer,
                  !isList && styles.horizontalButton
                ]}
                onPress={() => this.onSelect(key)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.circle(theme),
                    selected === key && styles.checkedCircle
                  ]}
                >
                  <View style={styles.middleCircle(theme)} />
                </View>
                <View>
                  <Text
                    h5
                    color={theme?.viewLabel?.primaryColor}
                    medium={theme?.mode === 'dark'}
                    style={
                      selected === key && {color: theme?.viewLabel?.thirdColor}
                    }
                  >
                    {label}
                  </Text>
                  {description && (
                    <Text h5 color={theme?.icons?.primaryColor}>
                      {description}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}
