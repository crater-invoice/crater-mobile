import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { FakeInput } from '../FakeInput';
import { styles } from './styles';

type IProps = {
    input: Object,
    disabled: Boolean,
    fakeInputContainerStyle: Object,
    hint: String,
    initialValue: string,
    onChangeCallback: Function
};
export class RadioButtonGroup extends Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
        };
    }

    componentWillMount() {
        const { initialValue } = this.props
        if (initialValue) {
            this.setState({
                selected: initialValue
            })
        }

    }

    onSelect = (val) => {
        const { input: { onChange }, onChangeCallback } = this.props

        onChange(val)
        onChangeCallback && onChangeCallback(val)
        this.setState({ selected: val })
    }

    render() {
        const { options, hint } = this.props;
        const { selected } = this.state;

        return (
            <View style={styles.fieldContainer}>
                {hint && (
                    <Text style={styles.hintStyle}>{hint}</Text>
                )}
                <View style={styles.buttonGroupContainer}>
                    {options.map(item => (
                        <TouchableOpacity
                            key={item.key} style={styles.buttonContainer}
                            onPress={() => this.onSelect(item.key)}
                        >
                            <View
                                style={[
                                    styles.circle,
                                    selected === item.key && styles.checkedCircle
                                ]}
                            >
                                <View style={styles.middleCircle} />
                            </View>
                            <Text style={[styles.label, selected === item.key && styles.checkedLabel]}>
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    }
}

