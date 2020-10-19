import React from 'react';
import { View, Text } from 'react-native';
import { AssetImage } from '../AssetImage';
import { styles } from './styles';
import { CtButton } from '../Button';
import { BUTTON_TYPE } from '@/constants';

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

            <Text numberOfLines={2} style={styles.emptyTitle}>
                {title && title}
            </Text>

            <Text numberOfLines={2} style={styles.emptyDescription}>
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
