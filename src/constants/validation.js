// @flow
import { trim } from 'lodash';
import React from 'react';
import { EMAIL_REGEX, URL_REGEX, CHARACTER_ONLY_REGEX } from './regex';

type IValidationOptions = {
    fieldName?: string
};

type ErrorType =
    | 'emailFormat'
    | 'required'
    | 'requiredField'
    | 'itemField'
    | 'requiredCheckArray'
    | 'minNumberRequired'
    | 'maxNumberRequired'
    | 'maxCharacterRequired'
    | 'minCharacterRequired'
    | 'characterOnlyRequired'
    | 'isNumberFormat'
    | 'passwordCompared'
    | 'moreThanDue'
    | 'urlFormat';

export function getError(
    value: string,
    errorTypes: Array<ErrorType>,
    options: IValidationOptions = {}
) {
    const {
        fieldName,
        minNumber,
        maxNumber,
        maxCharacter,
        minCharacter,
        message = null
    } = options;

    const errorTypeMap = {
        emailFormat: () =>
            EMAIL_REGEX.test(value) ? null : 'validation.email',

        required: () => (!trim(value) ? 'validation.required' : null),

        requiredField: () => (!trim(value) ? 'validation.field' : null),

        itemField: () => (!value ? 'validation.choose' : null),

        requiredCheckArray: () =>
            value && value.length ? null : 'validation.choose',

        minNumberRequired: () =>
            value <= minNumber ? getMinNumberError(fieldName, minNumber) : null,

        maxNumberRequired: () => {
            return value > maxNumber ? 'validation.maximumNumber' : null;
        },

        maxCharacterRequired: () => {
            return value.length > maxCharacter
                ? 'validation.maximumCharacter'
                : null;
        },

        minCharacterRequired: () => {
            if (value) {
                return value.length < minCharacter
                    ? message || 'validation.minCharacter'
                    : null;
            }
        },
        characterOnlyRequired: () =>
            CHARACTER_ONLY_REGEX.test(value) ? null : 'validation.character',

        isNumberFormat: () =>
            isNaN(Number(value)) ? 'validation.numeric' : null,
        passwordCompared: () =>
            value
                ? value === fieldName
                    ? null
                    : 'validation.passwordCompare'
                : fieldName
                ? value === fieldName
                    ? null
                    : 'validation.passwordCompare'
                : null,

        moreThanDue: () => 'validation.moreThanDue',

        urlFormat: () => (URL_REGEX.test(value) ? null : 'validation.url')
    };

    const errorType = errorTypes.find(
        error => errorTypeMap[error] && errorTypeMap[error]()
    );

    return errorType ? errorTypeMap[errorType]() : null;
}

export const getMinNumberError = (fieldName, minNumber) =>
    `validation.minimumNumber`;
