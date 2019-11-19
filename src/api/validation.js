// @flow
import React from 'react'
import {
    EMAIL_REGEX,
    URL_REGEX
} from './consts';

type IValidationOptions = {
    fieldName?: string,
};
type ErrorType =
    | 'emailFormat'
    | 'required'
    | 'requiredField'
    | 'itemField'
    | 'requiredCheckArray'
    | 'minNumberRequired'
    | 'maxNumberRequired'
    | 'isNumberFormat'
    | 'passwordCompared'
    | 'moreThanDue'
    | 'urlFormat'

export function getError(
    value: string,
    errorTypes: Array<ErrorType>,
    options: IValidationOptions = {},
) {
    const { fieldName, minNumber, maxNumber } = options;

    const errorTypeMap = {

        emailFormat: () => (EMAIL_REGEX.test(value) ? null : "validation.email"),

        required: () => (!value ? "validation.required" : null),

        requiredField: () => (!value ? "validation.field" : null),

        itemField: () => (!value ? "validation.choose" : null),

        requiredCheckArray: () => (value && value.length ? null : "validation.choose"),

        minNumberRequired: () => (value <= minNumber ? getMinNumberError(fieldName, minNumber) : null),

        maxNumberRequired: () => {
            return (value > maxNumber ? ("validation.maximumNumber") : null)
        },

        isNumberFormat: () => (
            isNaN(Number(value)) ? "validation.numeric" : null
        ),
        passwordCompared: () => (
            value ? (value === fieldName ? null : "validation.passwordCompare") :
                fieldName ? (value === fieldName ? null : "validation.passwordCompare") : null
        ),

        moreThanDue: () => ("validation.moreThanDue"),

        urlFormat: () => (URL_REGEX.test(value) ? null : "validation.url"),

    };

    const errorType = errorTypes.find((error) => errorTypeMap[error] && errorTypeMap[error]());

    return errorType ? errorTypeMap[errorType]() : null;
}


export const getMinNumberError = (fieldName, minNumber) =>
    `validation.minimumNumber`;
