import React, {useEffect} from 'react';
import {Field} from 'redux-form';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import styles from './styles';
import {BaseInput} from '@/components';
import {isEmpty} from '@/constants';
import {AssetIcon, BaseButton, BaseLabel} from '@/components';
import {colors} from '@/styles';
import t from 'locales/use-translation';

const removeItem = (fields, index, removeFirstItemOnPress) => {
  if (fields?.length === 1 && removeFirstItemOnPress) return;
  fields.remove(index);
};

const addItem = fields => {
  fields.push('');
};

const OptionList = ({fields, removeFirstItemOnPress, disabled}) => {
  if (isEmpty(fields)) return null;

  return (
    <View style={styles.itemList}>
      {fields.map((member, index) => {
        return (
          <View key={index} style={styles.item}>
            <View style={[styles.column2, disabled && {flex: 5}]}>
              <Field
                name={member}
                component={BaseInput}
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
                    removeItem(fields, index, removeFirstItemOnPress)
                  }
                >
                  <View style={styles.removeButtonWhiteLine} />
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
  const {fields, addFirstItem, disabled, theme} = props;

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
          <BaseLabel pt-3>{t('custom_fields.options')}</BaseLabel>
        </View>
        {!disabled ? (
          <BaseButton
            onPress={() => addItem(fields)}
            class="px-10"
            size="sm"
            labelComponent={
              <AssetIcon name={'plus'} size={13} color={colors.white} />
            }
          />
        ) : null}
      </View>
      <ScrollView
        style={styles.scrollContainer(theme)}
        showsVerticalScrollIndicator={false}
      >
        <OptionList fields={fields} {...props} />
      </ScrollView>
    </>
  );
};
