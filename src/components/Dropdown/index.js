import React, { Component } from 'react';
import { View } from 'react-native';
import ActionSheet from 'react-native-actionsheet'
import { styles } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../../styles/colors';

type IProps = {
    options: Array,
    onPress: Function,
    cancelButtonIndex: Number,
    destructiveButtonIndex: Number,
};

export default class Dropdown extends Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
            labelOptions: []
        };
    }

    componentWillMount() {
        const { options } = this.props;
        const labelOptions = [...options, { label: 'Cancel', value: null }].map(
            ({ label }) => label,
        );

        this.setState({ labelOptions })
    }

    showActionSheet = () => {
        this.ActionSheet.show()
    }

    onSelect = (index) => {
        const { options, onSelect } = this.props;

        const valueOptions = [...options, { label: 'Cancel', value: null }].map(
            ({ value }) => value,
        );

        onSelect && onSelect(valueOptions[index]);
    }



    render() {
        const { options, onPress, cancelButtonIndex, destructiveButtonIndex } = this.props;
        const { labelOptions } = this.state;

        return (
            <View>
                 <TouchableOpacity
                    onPress={this.showActionSheet}
                    style={styles.button}
                    hitSlop={{
                        top: 13,
                        left: 13,
                        bottom: 13,
                        right: 13
                    }}
                >
                    <Icon
                        name={'ellipsis-h'}
                        size={18}
                        style={styles.iconStyle}
                    />
                </TouchableOpacity>
                {labelOptions && (
                    <ActionSheet
                        ref={o => this.ActionSheet = o}
                        tintColor={colors.primary}
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


