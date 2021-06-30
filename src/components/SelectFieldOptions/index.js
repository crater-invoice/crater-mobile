import React, { useEffect } from 'react';
import { Field } from 'redux-form';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import { InputField } from '../InputField';
import { CtButton } from '../Button';
import { hasFieldValue } from '@/constants';
import { Text } from '../Text';

const removeItem = (fields, index, removeFirstItemOnPress) => {
    if (fields?.length === 1 && removeFirstItemOnPress) return;
    fields.remove(index);
};

const addItem = fields => {
    fields.push('');
};

const OptionList = ({ fields, removeFirstItemOnPress }) => {
    if (!hasFieldValue(fields)) return null;

    return (
        <View style={styles.itemList}>
            {fields.map((member, index) => {
                return (
                    <View key={index} style={styles.item}>
                        <View style={styles.column2}>
                            <Field
                                name={member}
                                component={InputField}
                                inputProps={{
                                    returnKeyType: 'next',
                                    autoCorrect: true
                                }}
                                inputContainerStyle={styles.input}
                            />
                        </View>
                        <View style={styles.column1}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={styles.removeButton}
                                hitSlop={{
                                    top: 10,
                                    bottom: 60,
                                    left: 25,
                                    right: 0
                                }}
                                onPress={() =>
                                    removeItem(
                                        fields,
                                        index,
                                        removeFirstItemOnPress
                                    )
                                }
                            >
                                <View style={styles.removeButtonWhiteLine} />
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            })}
        </View>
    );
};

export const SelectFieldOptions = props => {
    const { fields, addFirstItem } = props;

    useEffect(() => {
        if (addFirstItem) {
            fields.length === 0 && addItem(fields);
        }
        return () => {};
    }, []);

    return (
        <>
            <View style={styles.row}>
                <View style={styles.column2}>
                    <Text secondary h5 medium>Options</Text>
                </View>
                <View style={styles.column}>
                    <CtButton
                        onPress={() => addItem(fields)}
                        iconName={'plus'}
                    />
                </View>
            </View>
            <ScrollView
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <OptionList fields={fields} {...props} />
            </ScrollView>
        </>
    );
};
