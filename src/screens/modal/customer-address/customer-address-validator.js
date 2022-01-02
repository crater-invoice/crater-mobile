import {getError} from '@/validator';

export default values => {
  const {address_street_1, city, state, zip} = values;
  const errors: any = {};

  errors.address_street_1 = getError(address_street_1, ['required']);
  errors.city = getError(city, ['required']);
  errors.state = getError(state, ['required']);
  errors.zip = getError(zip, ['required']);

  return errors;
};
