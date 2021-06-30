import { colors } from '@/styles';

export const applyProp = (props, prop) => {
    const property = Object.keys(props).filter(k => k.includes(prop))?.[0];

    if (!property) return 0;

    const split = property.split('-');
    return split[split.length - 1];
};

export const applyColor = (props, prop) => {
    const property = Object.keys(props).filter(k => k.includes(prop))?.[0];
    const split = property.split('-');
    const color = `${split[0]}${split[1]}`;
    return colors[color];
};

export const hasProp = (props, prop) => {
    return Object.keys(props).some(function(k) {
        return k.includes(prop);
    });
};
