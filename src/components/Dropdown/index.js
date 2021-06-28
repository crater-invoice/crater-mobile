import React, { Component, Fragment } from 'react';
import { TouchableOpacity, View, StatusBar } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import { styles } from './styles';
import { AssetIcon } from '../AssetIcon';
import { colors } from '@/styles';
import { isEmpty, isIosPlatform } from '@/constants';
import { isDarkMode } from '@/utils';

type IProps = {
    options: Array,
    onPress: Function,
    cancelButtonIndex: Number,
    destructiveButtonIndex: Number
};

export default class Dropdown extends Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
            labelOptions: [],
            visible: false
        };
    }

    componentWillMount() {
        const { options } = this.props;
        const labelOptions = [...options, { label: 'Cancel', value: null }].map(
            ({ label }) => label
        );

        this.setState({ labelOptions });
    }

    onToggleStatus = () => {
        this.setState(prevState => {
            return { visible: !prevState.visible };
        });
    };

    showActionSheet = () => {
        this.onToggleStatus();
        this.ActionSheet.show();
    };

    onSelect = index => {
        this.onToggleStatus();

        const { options, onSelect } = this.props;

        const valueOptions = [...options, { label: 'Cancel', value: null }].map(
            ({ value }) => value
        );

        onSelect && onSelect(valueOptions[index]);
    };

    BUTTON_VIEW = () => {
        const { hasIcon = true, theme } = this.props;
        return !hasIcon ? (
            <Fragment />
        ) : (
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
                <AssetIcon
                    name={'ellipsis-h'}
                    size={18}
                    style={styles.iconStyle(theme)}
                />
            </TouchableOpacity>
        );
    };

    render() {
        const {
            options,
            onPress,
            cancelButtonIndex,
            destructiveButtonIndex,
            theme
        } = this.props;
        const { labelOptions, visible } = this.state;

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
                                : isIosPlatform()
                                ? 'dark-content'
                                : 'light-content'
                        }
                        translucent={true}
                    />
                )}

                {this.BUTTON_VIEW()}

                {labelOptions && (
                    <ActionSheet
                        ref={o => (this.ActionSheet = o)}
                        tintColor={isDarkMode() ? colors.gray2 : colors.primary}
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
