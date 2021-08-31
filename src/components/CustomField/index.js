import React, { useEffect, useState } from 'react';
import { FieldArray, change } from 'redux-form';
import { CUSTOM_FIELD_DATA_TYPES as DATA_TYPES } from '@/features/settings/constants';
import { isArray } from '@/constants';
import { getInitialCustomFields, getCustomFieldValueParams } from '@/utils';
import {
    InputType,
    SwitchType,
    TextAreaType,
    PhoneType,
    UrlType,
    NumberType,
    DropdownType,
    DateType,
    TimeType,
    DateTimeType
} from './Types';

interface IProps {
    customFields?: Array<any>;
    dispatch?: Function;
    form?: String;
    formValues?: Any;
    type?: String;
}

const FIELDS = ({ fields, customFields, disabled }) => {
    const items = [];

    if (fields.length === 0) return null;

    customFields.map((field, index) => {
        const { type } = field;
        const name = `customFields[${index}].value`;
        const fieldProps = {
            field,
            name,
            key: index,
            disabled
        };

        switch (type) {
            case DATA_TYPES.INPUT:
                items.push(<InputType {...fieldProps} />);
                break;

            case DATA_TYPES.TEXTAREA:
                items.push(<TextAreaType {...fieldProps} />);
                break;

            case DATA_TYPES.PHONE:
                items.push(<PhoneType {...fieldProps} />);
                break;

            case DATA_TYPES.URL:
                items.push(<UrlType {...fieldProps} />);
                break;

            case DATA_TYPES.NUMBER:
                items.push(<NumberType {...fieldProps} />);
                break;

            case DATA_TYPES.DROPDOWN:
                items.push(<DropdownType {...fieldProps} />);
                break;

            case DATA_TYPES.SWITCH:
                items.push(<SwitchType {...fieldProps} />);
                break;

            case DATA_TYPES.DATE:
                items.push(<DateType {...fieldProps} />);
                break;

            case DATA_TYPES.TIME:
                items.push(<TimeType {...fieldProps} />);
                break;

            case DATA_TYPES.DATE_TIME:
                items.push(<DateTimeType {...fieldProps} />);
                break;

            default:
                break;
        }
    });

    return items;
};

export const CustomField = (props: IProps) => {
    const {
        customFields,
        dispatch,
        form,
        formValues,
        type,
        isAllowToEdit
    } = props;

    const [sortableFields, setSortableFields] = useState(null);

    useEffect(() => {
        const values = type ? formValues?.[type]?.fields : formValues?.fields;
        const fields = getInitialCustomFields(customFields, values);

        setFormField('customFields', getCustomFieldValueParams(fields));
        setSortableFields(fields);
        return () => {};
    }, []);

    const setFormField = (field, value) => {
        dispatch(change(form, field, value));
    };

    if (!isArray(sortableFields)) {
        return null;
    }

    return (
        <FieldArray
            name={'customFields'}
            component={FIELDS}
            customFields={sortableFields}
            disabled={!isAllowToEdit}
        />
    );
};
