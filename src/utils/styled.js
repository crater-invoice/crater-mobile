import {hasTextLength} from '@/constants';
import {isMajorScreenHeight} from '@/helpers/size';
import {colors} from '@/styles';

export const applyProp = (props, prop) => {
  const property = Object.keys(props).filter(k => k.includes(prop))?.[0];

  if (!property) return 0;

  const split = property.split('-');

  if (property.charAt(0) === '-' && split.length === 3) {
    return -split[split.length - 1];
  }

  return split[split.length - 1];
};

export const applyDivisionProp = (props, prop, division = 100) => {
  const property = Object.keys(props).filter(k => k.includes(prop))?.[0];

  if (!property) return 0;

  const split: any = property.split('-');
  return split[split.length - 1] / division;
};

export const applyColor = (props, prop) => {
  const property = Object.keys(props).filter(k => k.includes(prop))?.[0];
  const split = property.split('-');
  const color = `${split[0]}${split[1]}`;
  return colors[color];
};

export const hasProp = (props, prop) => {
  if (prop.includes('lg:') && !isMajorScreenHeight) {
    return false;
  }
  return Object.keys(props).some(function(k) {
    return k.includes(prop);
  });
};

export const getClass = classTexts => {
  if (!hasTextLength(classTexts)) {
    return {};
  }

  let styles = {};

  classTexts.split(' ').map(property => {
    if (property.includes('=')) {
      const split = property.split('=');
      let value = split[1];

      if (value === 'true' || value === 'false') {
        value = value === 'true';
      }

      styles = {...styles, [split[0]]: value};
      return;
    }

    if (
      property.includes('flex-') &&
      !isNaN(parseFloat(property.split('flex-')?.[1]))
    ) {
      const split = property.split('-');
      let value = split[1];
      styles = {...styles, [split[0]]: parseFloat(value)};
      return;
    }

    styles = {...styles, [property]: true};
  });

  return styles;
};
