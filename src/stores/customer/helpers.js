export const addressParams = address => {
  return {
    address_street_1: address?.address_street_1,
    address_street_2: address?.address_street_2,
    city: address?.city,
    country_id: address?.country_id,
    name: address?.name,
    phone: address?.phone,
    state: address?.state,
    zip: address?.zip,
    type: null
  };
};

export const isAddress = object => {
  return object?.address_street_1 ||
    object?.address_street_2 ||
    object?.city ||
    object?.country_id ||
    object?.name ||
    object?.phone ||
    object?.state ||
    object?.zip
    ? true
    : false;
};
