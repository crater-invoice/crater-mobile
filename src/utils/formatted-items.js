import {isEmpty} from '@/constants';
import {NOTES_FIELD_MODAL_TYPES} from '@/features/settings/constants';
import {find} from 'lodash-es';

export const formatSelectPickerName = items => {
  if (isEmpty(items)) {
    return [];
  }
  return items.map(item => ({
    label: item?.name,
    value: item?.id
  }));
};

export const formatListByName = items => {
  if (isEmpty(items)) {
    return [];
  }
  return items.map(item => ({title: item?.name, fullItem: item}));
};

export const formatTaxTypes = taxes => {
  if (isEmpty(taxes)) {
    return [];
  }
  return taxes.map(tax => {
    const {name, percent, description} = tax;

    return {
      title: name,
      subtitle: {title: description},
      rightTitle: `${percent} %`,
      fullItem: tax
    };
  });
};

export const formatNotes = notes => {
  if (isEmpty(notes)) {
    return [];
  }
  return notes.map(note => {
    const {name, type} = note;
    const label = find(NOTES_FIELD_MODAL_TYPES, {value: type})?.label;

    return {
      title: name,
      rightTitle: label,
      fullItem: note
    };
  });
};

export const formatNotesType = notes => {
  if (isEmpty(notes)) {
    return [];
  }
  return notes.map(note => {
    const {name} = note;
    return {
      title: name,
      fullItem: note
    };
  });
};

export const formatItems = (items, currency) => {
  if (isEmpty(items)) {
    return [];
  }
  return items.map(item => {
    const {name, description, price, title} = item;
    return {
      title: title ?? name ?? '',
      subtitle: {title: description},
      amount: price,
      currency,
      fullItem: item
    };
  });
};

export const formatPaymentModes = methods => {
  if (isEmpty(methods)) {
    return [];
  }
  return methods.map(method => ({title: method?.name || '', fullItem: method}));
};

export const formatItemUnits = units => {
  if (isEmpty(units)) {
    return [];
  }
  return units.map(unit => ({title: unit?.name || '', fullItem: unit}));
};
