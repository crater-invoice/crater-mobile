import * as _ from 'lodash';
import * as React from 'react';
import {
  Image,
  View,
  ActivityIndicator,
  ImageProps,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  Animated,
  ImageResizeMode
} from 'react-native';
import {BASE_DIR, getPath} from './cache-manager';
import {hasValue} from '@/constants';
import {SCREEN_WIDTH} from '@/constants';
import styles from './cache-image-style';
import {CacheImageService, IS_UNDER_PROCESSING} from './image-service';
import {colors} from '@/styles';
import {AssetImage} from '../asset-image';

export class CacheImage extends React.Component<IProps, IStates> {
  timer: any;
  processInterval: any;
  underProcessingCounter: number;
  _isMounted = false;

  constructor(props) {
    super(props);
    this.underProcessingCounter = 0;

    this.state = {
      uri: undefined,
      downloadFail: false,
      height: props?.temporaryHeight,
      isLoaded: false,
      opacityAnimate: new Animated.Value(0)
    };
  }

  static defaultProps = {
    findImageHeight: false,
    resizeMode: 'cover'
  };

  componentDidMount() {
    this._isMounted = true;
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkIsImageUriChange(nextProps);
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.timer && clearTimeout(this.timer);
    this.processInterval && clearInterval(this.processInterval);
  }

  checkIsImageUriChange = async nextProps => {
    const {imageName, uri} = nextProps;

    if (imageName !== this.props.imageName) {
      const path = await getPath(uri, imageName, this._isMounted);
      this.setFileUri(path, uri);
    }
  };

  initialAnimation = () => {
    Animated.timing(this.state.opacityAnimate, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start(() => {});
  };

  async load({uri, imageName}: IProps): Promise<void> {
    if (!uri) return;

    try {
      const path = await getPath(uri, imageName, this._isMounted);
      this._isMounted && this.setFileUri(path, uri);
    } catch (e) {}
  }

  setFileUri = (path, uri) => {
    let filePath = uri;

    if (path && path === IS_UNDER_PROCESSING) {
      this.handleImageUnderProcess();
      return;
    }

    if (path && !path.includes('http')) {
      filePath = path;
    }

    setTimeout(() => this.setState({uri: filePath}), 30);
  };

  checkImageIsUnderProcessing = async () => {
    try {
      // 350 milliseconds per counter
      this.underProcessingCounter = this.underProcessingCounter + 1;

      // if it takes more than 4 second
      if (this.underProcessingCounter >= 12) {
        this.setState({uri: this.props.uri});
        this.processInterval && clearInterval(this.processInterval);
        CacheImageService.removeImage(this.props.imageName);
        this.underProcessingCounter = 0;
        return;
      }

      const {imageName} = this.props;
      const path: string = `${BASE_DIR}${imageName}`;

      const isUnderProcess = await CacheImageService.isUnderProcess(imageName);

      if (!isUnderProcess) {
        setTimeout(() => this.setState({uri: path}), 30);
        this.processInterval && clearInterval(this.processInterval);
        CacheImageService.removeImage(this.props.imageName);
        this.underProcessingCounter = 0;
      }
    } catch (e) {
      this.underProcessingCounter = 0;
    }
  };

  handleImageUnderProcess = () => {
    try {
      this.processInterval = setInterval(this.checkImageIsUnderProcessing, 350);
    } catch (e) {}
  };

  render() {
    const {
      style,
      imageProps,
      onPress,
      findImageHeight,
      buttonStyle,
      minHeight,
      minHeightStyle,
      temporaryHeight,
      loadingProps,
      loaderStyle,
      resizeMode = 'cover',
      theme
    } = this.props;

    const {uri, downloadFail, height, isLoaded, opacityAnimate} = this.state;

    const imageStyle: any = [
      styles.image(theme),
      style,
      findImageHeight && {height},
      findImageHeight && height === minHeight && minHeightStyle,
      {opacity: opacityAnimate}
    ];

    const loaderProps: any = {
      onLoadEnd: () => {
        this.setState({isLoaded: true});
        this.initialAnimation();
      }
    };

    const loader = (
      <ActivityIndicator
        size={'large'}
        color={colors.primary}
        style={[
          styles.loader(theme),
          findImageHeight && {height},
          style,
          loaderStyle
        ]}
        {...loadingProps}
      />
    );

    const children = (
      <View style={style}>
        {loader}

        {downloadFail && (
          <Animated.Image
            source={{uri: this.props.uri}}
            style={imageStyle}
            resizeMode={resizeMode}
            fadeDuration={0}
            {...loaderProps}
            {...imageProps}
            defaultSource={AssetImage.images.logo_dark}
          />
        )}

        {!downloadFail && hasValue(uri) && (
          <Animated.Image
            source={{uri}}
            style={imageStyle}
            resizeMode={resizeMode}
            fadeDuration={0}
            onError={({nativeEvent}) => {
              !downloadFail && this.setState({downloadFail: true});
            }}
            {...loaderProps}
            {...imageProps}
          />
        )}
      </View>
    );

    if (onPress) {
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            isLoaded &&
            onPress?.({
              height,
              uri,
              originalUrl: this.props.uri
            })
          }
          style={[
            {flex: 1},
            findImageHeight && {minHeight: temporaryHeight},
            buttonStyle
          ]}
        >
          {children}
        </TouchableOpacity>
      );
    }

    return children;
  }
}

interface IProps {
  /**
   * The style of the content container(Icon).
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
   * An additional image accessibility.
   */
  imageProps?: Omit<ImageProps, 'source'>;

  /**
   * An additional image loader accessibility.
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
   * The style of the content container(Button).
   */
  buttonStyle?: StyleProp<ViewStyle> | any;

  /**
   * The style of the content container(Loader).
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
}

interface IStates {
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
