import React from 'react'
import { Field } from 'redux-form'
import { CUSTOM_FIELDS as FIELDS } from '../../constants'
import {
    InputField,
    CheckBox,
    DatePickerField,
    TimePickerField
} from '@/components'
import { View, Text } from 'react-native'
import styles from './styles'
import { KEYBOARD_TYPE } from '@/api/global'
import moment from 'moment'
import Lng from '@/api/lang/i18n'

// Custom Field Refs
// -----------------------------------------
export let customFieldRefs = {}
export const setCustomFieldRefs = refs => (customFieldRefs = refs)

const HELP_TEXT_FIELD = () => {
    const { language } = customFieldRefs?.props
    return (
        <>
            <Field
                name={`${FIELDS.FIELD}.${FIELDS.HELP}`}
                component={InputField}
                hint={Lng.t('customFields.help', { locale: language })}
                inputProps={{
                    returnKeyType: 'next',
                    autoCorrect: true
                }}
            />
            <View>
                <Text style={styles.helpText}>
                    {Lng.t('customFields.helpText', { locale: language })}
                </Text>
            </View>
        </>
    )
}
const DEFAULT_TIME_FIELD = () => {
    const { language } = customFieldRefs?.props
    return (
        <>
            <Field
                name={`${FIELDS.FIELD}.${FIELDS.HELP}`}
                component={TimePickerField}
                hint={Lng.t('customFields.help', { locale: language })}
                inputProps={{
                    returnKeyType: 'next',
                    autoCorrect: true
                }}
                language={language}
            />
            <View>
                <Text style={styles.helpText}>
                    {Lng.t('customFields.helpText', { locale: language })}
                </Text>
            </View>
        </>
    )
}

const DEFAULT_NUMBER_FIELD = symbol => {
    const { language, currency } = customFieldRefs?.props
    return (
        <Field
            name={`${FIELDS.FIELD}.${FIELDS.DEFAULT_VALUE}`}
            component={InputField}
            hint={Lng.t('customFields.defaultValue', { locale: language })}
            inputProps={{
                returnKeyType: 'next',
                autoCorrect: true,
                keyboardType: KEYBOARD_TYPE.NUMERIC
            }}
            leftSymbol={symbol ?? currency?.symbol}
        />
    )
}

const DEFAULT_DATE_FIELD = symbol => {
    const { language, currency } = customFieldRefs?.props
    return (
        <Field
            name={`${FIELDS.FIELD}.${FIELDS.DEFAULT_VALUE}`}
            component={DatePickerField}
            hint={Lng.t('customFields.defaultValue', { locale: language })}
            inputProps={{
                returnKeyType: 'next',
                autoCorrect: true,
                keyboardType: KEYBOARD_TYPE.NUMERIC
            }}
            leftSymbol={symbol ?? currency?.symbol}
            displayValue={moment()}
        />
    )
}

const DEFAULT_VALUE_FIELD = () => {
    const { language } = customFieldRefs?.props
    return (
        <Field
            name={`${FIELDS.FIELD}.${FIELDS.DEFAULT_VALUE}`}
            component={InputField}
            hint={Lng.t('customFields.defaultValue', { locale: language })}
            inputProps={{
                returnKeyType: 'next',
                autoCorrect: true
            }}
        />
    )
}

const DEFAULT_CHECKBOX_FIELD = () => {
    const { language } = customFieldRefs?.props
    return (
        <Field
            name={`${FIELDS.FIELD}.${FIELDS.DEFAULT_CHECK_BOX_VALUE}`}
            component={CheckBox}
            hint={Lng.t('customFields.defaultValue', { locale: language })}
            label={Lng.t('customFields.check', { locale: language })}
        />
    )
}

export {
    HELP_TEXT_FIELD,
    DEFAULT_VALUE_FIELD,
    DEFAULT_NUMBER_FIELD,
    DEFAULT_CHECKBOX_FIELD,
    DEFAULT_DATE_FIELD,
    DEFAULT_TIME_FIELD
}
