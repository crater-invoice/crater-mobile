import {hasObjectLength, hasTextLength as hasValue} from '@/constants';
import {isAndroidPlatform, isIosPlatform, isIPhoneX} from '@/helpers/platform';
import {SCREEN_HEIGHT} from '@/helpers/size';
import properties from '../helpers/styled';

/**
 * Helper function to formate property name
 */
function formattedPropertyName(property) {
  if (property.includes('ios:')) {
    return property.split('ios:').pop();
  }

  if (property.includes('and:')) {
    return property.split('and:').pop();
  }

  if (property.includes('xl:')) {
    return property.split('xl:').pop();
  }

  if (property.includes('lg:')) {
    return property.split('lg:').pop();
  }

  if (property.charAt(0) === '-') {
    return property.substring(1);
  }

  return property;
}

/**
 * Helper function to get property actual value
 */
function formattedPropertyValue(property, value) {
  const isNegative = property.charAt(0) === '-';

  if (property.includes('font-weight')) {
    return `${value}`;
  }

  let propertyValue: any = parseFloat(value);

  if (isNegative) {
    propertyValue = -propertyValue;
  }

  if (value.includes('%')) {
    propertyValue = `${propertyValue}%`;
  }

  return propertyValue;
}

/**
 * Helper function to check that is allow to show style or not
 */
function isAllowToApply(property) {
  if (!property) {
    return false;
  }

  if (property.includes('ios:') && !isIosPlatform) {
    return false;
  }

  if (property.includes('and:') && !isAndroidPlatform) {
    return false;
  }

  if (property.includes('lg:') && SCREEN_HEIGHT < 775) {
    return false;
  }

  if (property.includes('xl:') && !isIPhoneX()) {
    return false;
  }

  return true;
}

/**
 * Helper function to return property and value.
 */
function splitPropertyAndValue(prop) {
  const split = prop.split('-');
  const property = split.slice(0, -1).join('-');
  const value = split[split.length - 1];

  return {property, value};
}

/**
 * Utility component wrapper to handle dynamic class value
 */
function getDynamicStyle(prop) {
  const {property, value} = splitPropertyAndValue(prop);
  const isAllow = isAllowToApply(property);

  if (!isAllow) {
    return {};
  }

  const propertyName = formattedPropertyName(property);
  const propertyValue = formattedPropertyValue(property, value);
  let style = properties?.[propertyName] ?? {};

  for (const key in style) style = {[key]: propertyValue};

  return style;
}

/**
 * Utility component wrapper to handle dynamic binding class
 */
function bindStyle(props, property) {
  const key = property.substring(1);

  if (!props.hasOwnProperty(key)) {
    return {};
  }

  return {[key]: props?.[key]};
}

/**
 * Utility component wrapper to handle class
 */
function getStyle(props, property) {
  if (property.charAt(0) === ':') {
    return bindStyle(props, property);
  }

  const isAllow = isAllowToApply(property);

  if (!isAllow) {
    return {};
  }

  const style = properties?.[formattedPropertyName(property)];

  if (!hasObjectLength(style)) {
    return getDynamicStyle(property);
  }

  return style;
}

export const getClass = (props, styleClass) => {
  if (!hasValue(styleClass)) {
    return {};
  }

  let styles = {};

  styleClass
    .trim()
    .split(' ')
    .map(key => {
      const style = getStyle(props, key);
      if (style) {
        styles = {...styles, ...style};
      }
    });

  return styles;
};
