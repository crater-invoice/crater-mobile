import {StyleProp, ViewStyle} from 'react-native';
import {ITheme} from '@/interfaces';

export interface IProps {
  /**
   * Styling for the scroll container.
   */
  style?: StyleProp<ViewStyle> | any;

  /**
   * Styling for main container.
   */
  contentContainerStyle?: StyleProp<ViewStyle> | any;

  /**
   * If true, show an empty view placeholder.
   */
  isEmpty?: boolean;

  /**
   * The color of the refresh indicator.
   */
  refreshControlColor?: string;

  /**
   * Additional props to pass to the EmptyPlaceholder.
   */
  emptyContentProps?: any;

  /**
   * Reference of scroll component.
   */
  reference?: any;

  /**
   * If true, hide refresh scroll view.
   */
  hideRefreshControl?: boolean;

  /**
   * An action to fetch pagination items.
   */
  getItems?: (callback: any) => void;

  /**
   * If true, fetch pagination items.
   */
  getItemsInMount?: boolean;

  /**
   * Called when component mount.
   */
  onMount?: () => void;

  /**
   * If true, hide base loader.
   */
  hideLoader?: boolean;

  /**
   * Set the limit of pagination items.
   * @default 10
   */
  paginationLimit?: Number;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;
}

export interface IState {
  /**
   * The loading indicator for the screen, displayed until the screen is ready to be displayed.
   */
  loading: boolean;

  /**
   * Whether the view should be indicating an active refresh.
   */
  refreshing: boolean;

  /**
   * Loading indicator for searchable items.
   */
  searchLoading: boolean;

  /**
   * If true, load more pagination items.
   */
  isMore: boolean;

  /**
   * Active page number.
   * @default 1
   */
  page: number;

  /**
   * Set the limit of pagination items.
   * @default 10
   */
  limit: number;
}
