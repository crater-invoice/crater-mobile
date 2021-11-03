import {ImageProps, StyleProp, ViewStyle, ImageResizeMode} from 'react-native';
import {ITheme} from '@/interfaces';

export interface IProps {
  /**
   * Styling for main container.
   */
  style?: any;

  /**
   * The image source (either a remote URL or a local file resource).
   */
  uri?: string;

  /**
   * Name of the image.
   */
  imageName?: string;

  /**
   * Additional props to pass to the Image.
   */
  imageProps?: Omit<ImageProps, 'source'>;

  /**
   * Additional props to pass to the ActivityIndicator.
   */
  loadingProps?: any;

  /**
   * Called when the touch is released,
   * but not if cancelled (e.g. by a scroll that steals the responder lock).
   */
  onPress?: () => void;

  /**
   * If true, find image proper dimension width and height.
   */
  findImageHeight?: boolean;

  /**
   * Height of default image size.
   */
  imageHeight?: number | string;

  /**
   * Height of temporary image size.
   */
  temporaryHeight?: number;

  /**
   * Maximum height of image size.
   */
  maxHeight?: number;

  /**
   * Minimum height of image size.
   */
  minHeight?: number;

  /**
   * Styling for main container.
   */
  buttonStyle?: StyleProp<ViewStyle> | any;

  /**
   * Styles for the container surrounding the loader.
   */
  loaderStyle?: StyleProp<ViewStyle> | any;

  /**
   * Styles of minimum image size.
   */
  minHeightStyle?: StyleProp<ViewStyle> | any;

  /**
   * Determines how to resize the image when the frame doesn't match the raw
   * image dimensions.
   *
   * 'cover': Scale the image uniformly (maintain the image's aspect ratio)
   * so that both dimensions (width and height) of the image will be equal
   * to or larger than the corresponding dimension of the view (minus padding).
   *
   * 'contain': Scale the image uniformly (maintain the image's aspect ratio)
   * so that both dimensions (width and height) of the image will be equal to
   * or less than the corresponding dimension of the view (minus padding).
   *
   * 'stretch': Scale width and height independently, This may change the
   * aspect ratio of the src.
   *
   * 'repeat': Repeat the image to cover the frame of the view.
   * The image will keep it's size and aspect ratio. (iOS only)
   *
   * 'center': Scale the image down so that it is completely visible,
   * if bigger than the area of the view.
   * The image will not be scaled up.
   */
  resizeMode?: ImageResizeMode;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme?: ITheme;
}

export interface IStates {
  /**
   * The image source (either a remote URL or a local file resource).
   */
  uri: string | undefined;

  /**
   * If true, cache image download fail.
   */
  downloadFail: boolean;

  /**
   * Height of image size.
   */
  height: number | string;

  /**
   * Whether to check that is image loaded or not.
   */
  isLoaded: boolean;

  /**
   * Animate the touchable to a new opacity.
   * Defaults to 0
   */
  opacityAnimate: any;
}
