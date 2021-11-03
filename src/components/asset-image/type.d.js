import {
  StyleProp,
  ImageStyle,
  ImageSourcePropType,
  ImageProps
} from 'react-native';

export interface IProps {
  /**
   * Styling for the image container.
   */
  style?: StyleProp<ImageStyle> | any;

  /**
   * If true image fetch from remote URL.
   */
  uri?: boolean;

  /**
   * Additional props to pass to the Image.
   */
  imageProps?: ImageProps | any;

  /**
   * The image source (either a remote URL or a local file resource).
   */
  source: ImageSourcePropType | any;
}
