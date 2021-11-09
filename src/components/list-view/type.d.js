import {StyleProp, ViewStyle} from 'react-native';
import {ITheme} from '@/interfaces';

export interface IProps {
  /**
   * If true, show avatar based view.
   */
  hasAvatar?: boolean;

  /**
   * If true, show an empty view placeholder.
   */
  isEmpty?: boolean;

  /**
   * Styling for main container.
   */
  containerStyle?: StyleProp<ViewStyle> | any;

  /**
   * Additional props to pass to the EmptyPlaceholder.
   */
  emptyContentProps?: any;

  /**
   * Styles for the container surrounding the right title.
   */
  rightTitleStyle?: StyleProp<ViewStyle> | any;

  /**
   * Styles for the container surrounding the left title.
   */
  leftTitleStyle?: StyleProp<ViewStyle> | any;

  /**
   * Styles for the container surrounding the left sub title.
   */
  leftSubTitleLabelStyle?: StyleProp<ViewStyle> | any;

  /**
   * Additional props to pass to the ListView.
   */
  listItemProps?: any;

  /**
   * Background color of the actual overlay.
   *
   * @default transparent
   */
  backgroundColor?: string;

  /**
   * The key of an array is to find the selected item.
   */
  compareField?: string;

  /**
   * An array of objects with data for each item.
   */
  checkedItems: Array<any>;

  /**
   * Styling for list view container.
   */
  listViewContainerStyle?: StyleProp<ViewStyle> | any;

  /**
   * If true, show the animated list view.
   */
  isAnimated?: boolean;

  /**
   * Styling for main parent container.
   */
  parentViewStyle?: StyleProp<ViewStyle> | any;

  /**
   * If false, hide the bottom border.
   */
  bottomDivider?: boolean;

  /**
   * An array of objects with data for each item.
   */
  items?: Array<any>;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;

  /**
   * Additional props to pass to the Content.
   */
  contentProps?: any;

  /**
   * Called when selecting one of any options.
   */
  onPress?: (callback: any) => void;

  /**
   * Styling for content view container.
   */
  contentContainerStyle?: StyleProp<ViewStyle> | any;

  /**
   * Styles for the container surrounding the left subtitle.
   */
  leftSubTitleStyle?: StyleProp<ViewStyle> | any;

  /**
   * Show empty placeholder content if "isEmpty" props set to true.
   */
  emptyPlaceholder?: any;

  /**
   * The value of the selected item field.
   */
  valueCompareField: string | any;
}
