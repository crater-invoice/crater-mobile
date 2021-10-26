import React from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {INavigation, ITheme} from '@/interfaces';
import {AssetImage, Text} from '@/components';
import {BaseButton} from './base-button';
import {commonSelector} from 'stores/common/selectors';
import {hasTextLength} from '@/constants';
import t from 'locales/use-translation';
import {PermissionService} from '@/services';
import {routes} from '@/navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

interface IProps {
  /**
   * An active theme object.
   * @see ITheme
   */
  theme?: ITheme;

  /**
   * Current navigation object values.
   */
  route?: any;

  /**
   * A navigator is an object of navigation functions that a view can call.
   * @see INavigation
   */
  navigation?: INavigation;

  /**
   * Text of searched string.
   */
  search?: string;

  /**
   * Title of empty placeholder.
   */
  title?: string;

  /**
   * Description of empty placeholder.
   */
  description?: string;

  /**
   * Image of empty placeholder.
   */
  image?: string;

  /**
   * Title of empty placeholder button.
   */
  buttonTitle?: string;

  /**
   * An action to redirect a specific route.
   */
  buttonPress?: () => void;
}

export const EmptyPlaceholder = (props: IProps) => {
  const {route, theme} = props;
  const {title, description, image, buttonTitle, buttonPress} = contentProps(
    props
  );
  let showButton = hasTextLength(buttonTitle);

  if (route && hasTextLength(buttonTitle)) {
    showButton = PermissionService.isAllowToCreate(route?.name);
  }

  return (
    <View style={styles.emptyContainer}>
      {image && (
        <AssetImage imageSource={image} imageStyle={styles.emptyImage} />
      )}

      <Text
        mediumSize
        bold2
        center
        font-weight-600
        numberOfLines={2}
        color={theme?.listItem?.fifth?.color}
        style={styles.emptyTitle}
      >
        {title && title}
      </Text>

      <Text
        center
        numberOfLines={2}
        color={theme?.text?.thirdColor}
        style={styles.emptyDescription}
        medium={theme?.mode === 'dark'}
      >
        {description && description}
      </Text>

      {showButton && (
        <BaseButton
          type="primary-outline"
          base-class="mt-25 mx-40"
          class="px-11"
          onPress={buttonPress}
        >
          {buttonTitle}
        </BaseButton>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyImage: {
    height: hp('20%'),
    width: wp('40%'),
    resizeMode: 'contain'
  },
  emptyTitle: {
    marginTop: 15,
    paddingHorizontal: 10
  },
  emptyDescription: {
    paddingHorizontal: 10,
    marginTop: 5
  },
  emptyButton: {
    marginTop: 22,
    marginHorizontal: 40
  }
});

const contentProps = props => {
  const {route, search, navigation} = props;
  switch (route?.name) {
    case routes.CATEGORIES:
      const title = search ? 'search.noResult' : 'categories.empty.title';
      return {
        title: t(title, {search}),
        ...(!search && {
          description: t('categories.empty.description'),
          buttonTitle: t('categories.empty.buttonTitle'),
          buttonPress: () =>
            navigation.navigate(routes.CREATE_CATEGORY, {type: 'ADD'})
        })
      };

    default:
      return {
        title: props?.title,
        description: props?.description,
        image: props?.image,
        buttonTitle: props?.buttonTitle,
        buttonPress: props?.buttonPress
      };
  }
};

const mapStateToProps = state => commonSelector(state);

export const BaseEmptyPlaceholder = connect(mapStateToProps)(EmptyPlaceholder);
