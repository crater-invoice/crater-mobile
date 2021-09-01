import { getError } from '@/constants';
import { USER_FIELDS as FIELDS } from './types';

export const validateUser = (values,{type}) => {    
    const errors: any = { user: {} };
    errors.user[FIELDS.NAME] = getError(values?.user?.[FIELDS.NAME], [
        'required'
    ]);
    errors.user[FIELDS.EMAIL] = getError(values?.user?.[FIELDS.EMAIL], [
        'required',
        'emailFormat'
    ]);
    errors.user[FIELDS.PASSWORD] = getError(
        values?.user?.[FIELDS.PASSWORD],
        type === 'ADD'? ['required' ,'minCharacterRequired']:['minCharacterRequired'],
        { minCharacter: 8 }
    );
    errors.user[FIELDS.ROLE] = getError(values?.user?.[FIELDS.ROLE], [
        'required'
    ]);

    return errors;
};
