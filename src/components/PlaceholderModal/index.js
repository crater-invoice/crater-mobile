import { DOUBLE_RIGHT_ICON } from '@/assets';
import { dismissKeyboard, isArray, SCREEN_WIDTH } from '@/constants';
import { colors } from '@/styles';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { AnimateModal } from '../AnimateModal';
import AssetSvg from '../AssetSvg';
import styles from './styles';

interface IProps {
    reference: any;
    items: Array<any>;
    onSelect: Function;
}

interface IStates {
    visible: boolean;
}

export class PlaceholderModal extends Component<IProps, IStates> {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };
    }

    componentDidMount() {
        this.props.reference?.(this);
    }

    componentWillUnmount() {
        this.props.reference?.(undefined);
    }

    onToggle = () => {
        dismissKeyboard();
        this.setState({ visible: !this.state.visible });
    };

    onSelect = value => {
        this.onToggle();
        this.props.onSelect?.(value);
    };

    getListOfFields = () => {
        const { items } = this.props;

        if (!isArray(items)) {
            return [];
        }

        const fieldList = [];

        items.map((list, index) => {
            const { label, fields } = list;

            const isFirst = index === 0;
            const isOnlyOne = items.length === 1;

            const containerStyle = [
                !isFirst && { paddingLeft: 15 },
                isOnlyOne && {
                    width: SCREEN_WIDTH - 50
                }
            ];

            fieldList.push(
                <>
                    <View style={containerStyle}>
                        <View style={styles.labelView}>
                            <Text style={styles.label} numberOfLines={1}>
                                {label}
                            </Text>
                        </View>
                        {fields.map(field => (
                            <TouchableOpacity
                                onPress={() => this.onSelect(field.value)}
                                style={styles.item}
                            >
                                <View style={styles.arrowIcon}>
                                    <AssetSvg
                                        name={DOUBLE_RIGHT_ICON}
                                        width={14}
                                        height={14}
                                    />
                                </View>
                                <Text style={styles.itemText} numberOfLines={1}>
                                    {field.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </>
            );
        });

        return fieldList;
    };

    render() {
        const { visible } = this.state;
        const items = this.getListOfFields();

        return (
            <AnimateModal
                visible={visible}
                onToggle={this.onToggle}
                modalProps={{
                    animationIn: 'slideInUp',
                    animationOut: 'slideOutDown'
                }}
            >
                <View style={styles.modalViewContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyboardShouldPersistTaps="always"
                    >
                        <View style={styles.body}>
                            <View style={styles.items}>{items}</View>
                        </View>
                    </ScrollView>
                </View>
            </AnimateModal>
        );
    }
}
