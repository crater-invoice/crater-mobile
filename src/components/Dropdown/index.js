import React, { Component } from 'react';
import { TouchableOpacity, View, StatusBar } from 'react-native';
import ActionSheet from 'react-native-actionsheet'
import { styles } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
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
            labelOptions: [],
            visible: false,
        };
    }

    componentWillMount() {
        const { options } = this.props;
        const labelOptions = [...options, { label: 'Cancel', value: null }].map(
            ({ label }) => label,
        );

        this.setState({ labelOptions })
    }

    onToggleStatus = () => {
        this.setState((prevState) => {
            return { visible: !prevState.visible }
        });
    }

    showActionSheet = () => {
        this.onToggleStatus()
        this.ActionSheet.show()
    }

    onSelect = (index) => {
        this.onToggleStatus()

        const { options, onSelect } = this.props;

        const valueOptions = [...options, { label: 'Cancel', value: null }].map(
            ({ value }) => value,
        );

        onSelect && onSelect(valueOptions[index]);
    }



    render() {
        const { options, onPress, cancelButtonIndex = 2, destructiveButtonIndex = 1 } = this.props;
        const { labelOptions, visible } = this.state;

        return (
            <View>

                {visible && (
                    <StatusBar
                        backgroundColor={colors.secondary}
                        barStyle={"dark-content"}
                        translucent={true}
                    />
                )}

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
                        cancelButtonIndex={cancelButtonIndex}
                        destructiveButtonIndex={destructiveButtonIndex}
                        onPress={this.onSelect}
                    />
                )}
            </View>
        );
    }
}
