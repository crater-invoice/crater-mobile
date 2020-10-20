import { omit } from 'lodash';
import { hasObjectLength } from '@/constants';

export const isFilterApply = formValues => {
    if (!formValues) return false;

    const values = omit(formValues, 'search');
    return hasObjectLength(values);
};
