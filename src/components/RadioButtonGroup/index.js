import React, {Component} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from '../Text';
import {styles} from './styles';

type IProps = {
  input: Object,
  disabled: boolean,
  baseSelectContainerStyle: Object,
  hint: string,
  initialValue: string,
  onChangeCallback: () => void,
  theme: any
};

export class RadioButtonGroup extends Component<IProps> {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }

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
    onChangeCallback && onChangeCallback(val);
    this.setState({selected: val});
  };

  render() {
    const {options, hint, theme} = this.props;
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
        <View style={styles.buttonGroupContainer}>
          {options.map(item => (
            <TouchableOpacity
              key={item.key}
              style={styles.buttonContainer}
              onPress={() => this.onSelect(item.key)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.circle(theme),
                  selected === item.key && styles.checkedCircle
                ]}
              >
                <View style={styles.middleCircle(theme)} />
              </View>
              <Text
                h5
                color={theme?.viewLabel?.primaryColor}
                medium={theme?.mode === 'dark'}
                style={
                  selected === item.key && {
                    color: theme?.viewLabel?.thirdColor
                  }
                }
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}
