import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import * as Linking from 'expo-linking';
import * as IntentLauncher from 'expo-intent-launcher';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import {connect} from 'react-redux';
import {AssetIcon} from '../asset-icon';
import Constants from 'expo-constants';
import * as DocumentPicker from 'expo-document-picker';
import t from 'locales/use-translation';
import {colors} from '@/styles';
import {alertMe} from '@/constants';
import {isIosPlatform} from '@/helpers/platform';
import {AssetImage} from '../asset-image';
import {Content} from '../content';
import {styles} from './styles';
import {Text} from '../text';
import {CacheImage} from '../cache-image';
import {BaseActionSheet, BaseLabel} from '@/components';
import {commonSelector} from 'stores/common/selectors';
import {IProps, IStates} from './type.d';

const ACTIONS = {
  DOCUMENT: 'DOCUMENT',
  GALLERY: 'GALLERY',
  CAMERA: 'CAMERA'
};

class Picker extends Component<IProps, IStates> {
  actionSheet: any;

  constructor(props) {
    super(props);
    this.actionSheet = React.createRef();
    this.state = this.initialState();
  }

  initialState = () => {
    return {
      image: null,
      loading: false,
      action: null,
      options: this.getDropdownOptions()
    };
  };

  getDropdownOptions = () => {
    const {withDocument} = this.props;

    const label = string => t(string);

    const options = [
      {
        label: label('file_picker.gallery'),
        value: ACTIONS.GALLERY
      },
      {
        label: label('file_picker.camera'),
        value: ACTIONS.CAMERA
      }
    ];

    if (withDocument) {
      options.unshift({
        label: label('file_picker.document'),
        value: ACTIONS.DOCUMENT
      });
    }

    return options;
  };

  requestToGrantPermission = async () => {
    const redirectToSetting = () => {
      if (isIosPlatform) {
        Linking.openURL('app-settings:');
        return;
      }

      const appName =
        Constants?.manifest?.android?.package ?? 'com.craterapp.app';

      IntentLauncher.startActivityAsync(
        IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS,
        {data: 'package:' + appName}
      );
    };

    alertMe({
      desc: t('file_picker.permission'),
      showCancel: true,
      okText: 'Allow',
      okPress: redirectToSetting
    });
  };

  askGalleryPermission = async () => {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === 'denied') {
      this.requestToGrantPermission();
      return false;
    }

    return true;
  };

  askCameraPermission = async () => {
    const {status} = await ImagePicker.requestCameraPermissionsAsync();

    if (status === 'denied') {
      this.requestToGrantPermission();
      return false;
    }

    return true;
  };

  onToggleLoading = async loading => {
    await this.setState({loading});
    this.props?.fileLoading?.(loading);
  };

  onSelect = async (file, action, onSuccess) => {
    const {onChangeCallback} = this.props;

    try {
      if (!file?.uri) {
        this.onToggleLoading(false);
        return;
      }
      const base64 = await FileSystem.readAsStringAsync(file.uri, {
        encoding: FileSystem.EncodingType.Base64
      });

      onChangeCallback?.({...file, base64});

      onSuccess?.(file);

      this.setState({action});

      this.onToggleLoading(false);
    } catch (e) {
      this.onToggleLoading(false);
    }
  };

  showFileManager = async action => {
    try {
      await this.onToggleLoading(true);

      const file = await DocumentPicker.getDocumentAsync({});

      this.onSelect(file, action, () => {});
    } catch (e) {
      this.onToggleLoading(false);
    }
  };

  showGallery = async action => {
    try {
      const isAllow = await this.askGalleryPermission();

      if (!isAllow) {
        return;
      }

      await this.onToggleLoading(true);

      const file = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        allowsMultipleSelection: false
      });

      this.onSelect(file, action, res => {
        this.setState({image: res.uri});
      });
    } catch (e) {
      this.onToggleLoading(false);
    }
  };

  showCamera = async action => {
    try {
      const isAllow = await this.askCameraPermission();
      if (!isAllow) {
        return;
      }

      await this.onToggleLoading(true);

      const file = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1
      });

      this.onSelect(file, action, res => {
        this.setState({image: res.uri});
      });
    } catch (e) {
      this.onToggleLoading(false);
    }
  };

  onOptionSelect = async action => {
    if (!action) {
      this.setState({loading: false});
      return;
    }

    if (action == ACTIONS.DOCUMENT) {
      this.showFileManager(action);
      return;
    }

    if (action == ACTIONS.GALLERY) {
      this.showGallery(action);
      return;
    }

    if (action == ACTIONS.CAMERA) {
      this.showCamera(action);
      return;
    }
  };

  openDropdown = () =>
    !this.props.disabled && this.actionSheet.current.showActionSheet();

  selectedFile = () => {
    const {image, action} = this.state;
    const {
      uploadedFileUrl,
      imageContainerStyle,
      style,
      uploadedFileType,
      hasAvatar,
      showUploadedImageAsCache = true,
      theme,
      disabled
    } = this.props;

    const fileView = (
      <View style={styles.container}>
        <AssetIcon
          name={'file'}
          size={50}
          color={theme?.icons?.secondaryBgColor}
          style={{opacity: 0.9}}
        />
      </View>
    );

    const defaultView = (
      <View style={[styles.container, disabled && styles.disabledInput(theme)]}>
        <AssetIcon
          name={'cloud-upload-alt'}
          size={23}
          color={theme?.icons?.fourthColor}
        />
        <Text
          color={theme.tabNavigator.inActiveIconColor}
          h5
          light
          center
          style={styles.title}
        >
          {t('file_picker.file')}
        </Text>
      </View>
    );

    const avatarView = (
      <AssetImage
        source={AssetImage.images.avatar}
        style={[styles.images, style]}
      />
    );

    const imageView = image => (
      <View style={[styles.imageContainer, imageContainerStyle]}>
        <AssetImage source={image} style={[styles.images, style]} uri />
      </View>
    );

    const selectedAction = {
      [ACTIONS.DOCUMENT]: fileView,
      [ACTIONS.GALLERY]: imageView(image),
      [ACTIONS.CAMERA]: imageView(image)
    };

    if (action) {
      return selectedAction[action];
    }

    if (uploadedFileType && !uploadedFileType.includes('image')) {
      return fileView;
    }

    if (uploadedFileUrl) {
      if (!showUploadedImageAsCache) {
        return imageView(uploadedFileUrl);
      }

      const getImageName = () => {
        const split = uploadedFileUrl?.split('/') ?? [];
        return `${split?.[split.length - 2]}-${split?.[split.length - 1]}`;
      };

      const imageName = getImageName();

      return hasAvatar ? (
        <CacheImage
          uri={uploadedFileUrl}
          imageName={imageName}
          resizeMode="stretch"
          style={styles.uploadedImage}
          theme={theme}
        />
      ) : (
        <View style={[styles.imageContainer, imageContainerStyle]}>
          <CacheImage
            uri={uploadedFileUrl}
            imageName={imageName}
            style={styles.uploadedFullImage}
            resizeMode="contain"
            theme={theme}
          />
        </View>
      );
    }

    if (hasAvatar) {
      return avatarView;
    }

    return defaultView;
  };

  render() {
    const {loading, options} = this.state;
    const {
      label,
      containerStyle,
      imageContainerStyle,
      loadingContainerStyle,
      hasAvatar = false,
      withDocument,
      theme
    } = this.props;

    const File = this.selectedFile();

    const loadingProps: any = {
      is: loading,
      style: {
        ...styles.loadingContainer,
        ...loadingContainerStyle
      }
    };

    return (
      <View style={[styles.mainContainer, containerStyle]}>
        <BaseLabel style={styles.label}>{label}</BaseLabel>

        <BaseActionSheet
          ref={this.actionSheet}
          options={options}
          onSelect={this.onOptionSelect}
          cancelButtonIndex={withDocument ? 3 : 2}
          destructiveButtonIndex={withDocument ? 5 : 3}
          hasIcon={false}
          theme={theme}
        />

        <TouchableOpacity activeOpacity={0.7} onPress={this.openDropdown}>
          <View
            style={[
              styles.imageWithIconContainer,
              hasAvatar && imageContainerStyle
            ]}
          >
            <Content loadingProps={loadingProps} theme={theme}>
              {File}
            </Content>
          </View>

          {hasAvatar && (
            <View style={styles.iconContainer}>
              <AssetIcon name={'camera'} size={20} color={colors.white} />
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => commonSelector(state);

export const FilePicker = connect(mapStateToProps)(Picker);
