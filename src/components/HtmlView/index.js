import React, { FC } from 'react';
import HTML from 'react-native-render-html';
import { Text, View } from 'react-native';
import { colors, fonts } from '@/styles';

interface IProps {
    content?: any;
    theme?: any;
}

export const HtmlView: FC<IProps> = ({ content, theme }) => {
    return (
        <HTML
            html={content}
            tagsStyles={{
                p: () => <Text />,
                h1: () => <Text />,
                h2: () => <Text />,
                h3: () => <Text />,
                h4: () => <Text />,
                h5: () => <Text />,
                h6: () => <Text />
            }}
            baseFontStyle={{
                fontSize: 16,
                color: theme?.input?.color,
                textAlign: 'left'
            }}
        />
    );
};
