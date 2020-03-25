import React from 'react';
import { Field } from 'redux-form';
import { CUSTOM_FIELDS as FIELDS } from '../../constants';
import { InputField } from '../../../../components';
import Lng from '../../../../api/lang/i18n';
import { View, Text } from 'react-native';
import styles from './styles';

// Custom Field Refs
// -----------------------------------------
export let customFieldRefs = {}
export const setCustomFieldRefs = refs => (customFieldRefs = refs)

const HELP_TEXT = () => {
    const { language } = customFieldRefs?.props
    return (
        <>
            <Field
                name={`${FIELDS.FIELD}.${FIELDS.HELP}`}
                component={InputField}
                hint={Lng.t("customFields.help", { locale: language })}
                inputProps={{
                    returnKeyType: 'next',
                    autoCorrect: true,
                }}
            />
            <View>
                <Text style={styles.helpText}>
                    {Lng.t("customFields.helpText", { locale: language })}
                </Text>
            </View>
        </>
    )
}


const DEFAULT_VALUE = () => {
    const { language } = customFieldRefs?.props
    return (
        <Field
            name={`${FIELDS.FIELD}.${FIELDS.DEFAULT_VALUE}`}
            component={InputField}
            hint={Lng.t("customFields.defaultValue", { locale: language })}
            inputProps={{
                returnKeyType: 'next',
                autoCorrect: true
            }}
        />
    )
}

export {
    HELP_TEXT,
    DEFAULT_VALUE,
}
