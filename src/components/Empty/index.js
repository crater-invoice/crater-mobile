import React from 'react';
import { View } from 'react-native';
import { AssetImage } from '../AssetImage';
import { styles } from './styles';
import { CtButton } from '../Button';
import { BUTTON_TYPE } from '@/constants';
import { Text } from '../Text';

type IProps = {
    title: String,
    description: String,
    image: String,
    buttonTitle: String,
    buttonPress: Function,
};
export const Empty = ({
    title,
    description,
    image,
    buttonTitle,
    buttonPress,
}: IProps) => {
    return (
        <View style={styles.emptyContainer}>
            {image && (
                <AssetImage imageSource={image} imageStyle={styles.emptyImage} />
            )}

            <Text mediumSize dark bold2 center font-weight-600 numberOfLines={2} style={styles.emptyTitle}>
                {title && title}
            </Text>

            <Text veryDarkGray center numberOfLines={2} style={styles.emptyDescription}>
                {description && description}
            </Text>

            {buttonTitle && (
                <CtButton
                    onPress={buttonPress && buttonPress}
                    btnTitle={buttonTitle}
                    type={BUTTON_TYPE.OUTLINE}
                    hasFocus={false}
                    buttonContainerStyle={styles.emptyButton}
                />
            )}


        </View>
    );
};

export default Empty;
