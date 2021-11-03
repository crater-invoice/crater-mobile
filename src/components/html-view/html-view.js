import React, {FC} from 'react';
import HTML from 'react-native-render-html';
import {Text} from 'react-native';
import {fonts, fontSizes} from '@/styles';

interface IProps {
  content?: any;
  theme?: any;
}

export const HtmlView: FC<IProps> = ({content, theme}) => {
  return (
    <HTML
      html={content}
      tagsStyles={{
        p: () => <Text allowFontScaling={false} />,
        h1: () => <Text allowFontScaling={false} />,
        h2: () => <Text allowFontScaling={false} />,
        h3: () => <Text allowFontScaling={false} />,
        h4: () => <Text allowFontScaling={false} />,
        h5: () => <Text allowFontScaling={false} />,
        h6: () => <Text allowFontScaling={false} />
      }}
      baseFontStyle={{
        fontSize: fontSizes.h4,
        color: theme?.input?.color,
        textAlign: 'left',
        fontFamily: fonts.regular
      }}
    />
  );
};
