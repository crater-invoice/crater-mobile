import React from 'react';
import { Text as RNText } from 'react-native';
import styled, { css } from 'styled-components/native';
import { ifProp, prop } from 'styled-tools';
import { fontSizes } from '../../utils/sizes';
import { fonts, colors } from '../../styles';

const generateSize = size => css`
    font-size: ${size};
`;

const CTText = ({ children, ...props }) => (
    <RNText {...props}>
        {children}
    </RNText>
);

export const Text = styled(CTText)`

    color: ${colors.secondary};
    text-align: left;
    font-family: ${fonts.poppins};

    ${generateSize(fontSizes.h4.fontSize)}

    ${ifProp('biggestSize', generateSize(fontSizes.biggestSize.fontSize))}

    ${ifProp('h1', generateSize(fontSizes.h1.fontSize))}

    ${ifProp('h2', generateSize(fontSizes.h2.fontSize))}

    ${ifProp('h3', generateSize(fontSizes.h3.fontSize))}

    ${ifProp('h4', generateSize(fontSizes.h4.fontSize))}

    ${ifProp('h5', generateSize(fontSizes.h5.fontSize))}

    ${ifProp('h6', generateSize(fontSizes.h6.fontSize))}

    ${ifProp('mediumSize', generateSize(fontSizes.mediumSize.fontSize))}

    ${ifProp('bigMediumSize', generateSize(fontSizes.bigMediumSize.fontSize))}

    ${ifProp(
        'danger',
        css`
            color: ${colors.danger};
        `
    )}

    ${ifProp(
        'primary',
        css`
            color: ${colors.primary};
        `
    )};

    ${ifProp(
        'primaryLight',
        css`
            color: ${colors.primaryLight};
        `
    )};

    ${ifProp(
        'secondary',
        css`
            color: ${colors.secondary};
        `
    )};


    ${ifProp(
        'white',
        css`
            color: ${colors.white};
        `
    )}

    ${ifProp(
        'black',
        css`
            color: ${colors.black};
        `
    )};

    ${ifProp(
        'veryLightGray',
        css`
            color: ${colors.veryLightGray};
        `
    )};

    ${ifProp(
        'gray',
        css`
            color: ${colors.gray};
        `
    )};

    ${ifProp(
        'darkGray',
        css`
            color: ${colors.darkGray};
        `
    )};

    ${ifProp(
        'darkGray2',
        css`
            color: ${colors.darkGray2};
        `
    )};

    ${ifProp(
        'veryDarkGray',
        css`
            color: ${colors.veryDarkGray};
        `
    )};

    ${ifProp(
        'dark',
        css`
            color: ${colors.dark};
        `
    )};

    ${ifProp(
        'dark2',
        css`
            color: ${colors.dark2};
        `
    )};

    ${ifProp(
        'dark3',
        css`
            color: ${colors.dark3};
        `
    )};

    ${ifProp(
        'opacity',
        css`
            opacity: ${prop('opacity')};
        `
    )};

    ${ifProp(
        'wide',
        css`
            width: 100%;
        `
    )};

    ${ifProp(
        'width',
        css`
            width: ${prop('width')};
        `
    )};

    ${ifProp(
        'center',
        css`
            text-align: center;
        `
    )};

    ${ifProp(
        'left',
        css`
            text-align: left;
        `
    )};

    ${ifProp(
        'italic',
        css`
            font-style: italic;
        `
    )};

    ${ifProp(
        'bold',
        css`
            font-family: Poppins-bold;
        `
    )};

    ${ifProp(
        'normal',
        css`
            font-family: Poppins;
        `
    )};

    ${ifProp(
        'light',
        css`
            font-family: Poppins-light;
        `
    )};

    ${ifProp(
        'semiBoldFont',
        css`
            font-family: Poppins-semi-bold;
        `
    )};

    ${ifProp(
        'medium',
        css`
            font-family: Poppins-medium;
        `
    )};

    ${ifProp(
        'semiBold',
        css`
            font-weight: 600;
        `
    )};

    ${ifProp(
        'flex',
        css`
            flex: ${prop('flex')};
        `
    )};

    ${ifProp(
        'lineHeight',
        css`
            line-height: ${prop('lineHeight')};
        `
    )}

    ${ifProp(
        'upperCase',
        css`
            text-transform: uppercase;
        `
    )}

    ${ifProp(
        'marginBottom',
        css`
            margin-bottom: marginBottom;
        `
    )}

    ${ifProp(
        'marginTop',
        css`
            margin-top: marginTop;
        `
    )}

    ${ifProp(
        'positionAbsolute',
        css`
            position: absolute;
        `
    )}

    ${prop('style')}

`;
