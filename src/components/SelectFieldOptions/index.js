import React, { useEffect } from 'react';
import { Field } from 'redux-form';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import { InputField } from '../InputField';
import { CtButton } from '../Button';
import { hasFieldValue } from '@/constants';
import { Text } from '../Text';
import { Label } from '../Label';

const removeItem = (fields, index, removeFirstItemOnPress) => {
    if (fields?.length === 1 && removeFirstItemOnPress) return;
    fields.remove(index);
};

const addItem = fields => {
    fields.push('');
};

const OptionList = ({ fields, removeFirstItemOnPress, disabled }) => {
    if (!hasFieldValue(fields)) return null;

    return (
        <View style={styles.itemList}>
            {fields.map((member, index) => {
                return (
                    <View key={index} style={styles.item}>
                        <View style={[styles.column2, disabled && { flex: 5 }]}>
                            <Field
                                name={member}
                                component={InputField}
                                inputProps={{
                                    returnKeyType: 'next',
                                    autoCorrect: true
                                }}
                                inputContainerStyle={styles.input}
                                disabled={disabled}
                            />
                        </View>
                        <View style={styles.column1}>
                            {!disabled ? (
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
                                    <View
                                        style={styles.removeButtonWhiteLine}
                                    />
                                </TouchableOpacity>
                            ) : null}
                        </View>
                    </View>
                );
            })}
        </View>
    );
};

export const SelectFieldOptions = props => {
    const { fields, addFirstItem, theme, disabled } = props;

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
                    <Label h5 theme={theme} {...(disabled && { 'mt-8': true })}>
                        Options
                    </Label>
                </View>
                {!disabled ? (
                    <View style={styles.column}>
                        <CtButton
                            onPress={() => addItem(fields)}
                            iconName={'plus'}
                        />
                    </View>
                ) : null}
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
