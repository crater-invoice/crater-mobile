import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import * as Linking from 'expo-linking';
import * as IntentLauncher from 'expo-intent-launcher';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Constants from 'expo-constants';
import * as DocumentPicker from 'expo-document-picker';
import { styles } from './styles';
import { AssetImage } from '../AssetImage';
import { colors } from '@/styles';
import Lng from '@/lang/i18n';
import { Content } from '../Content';
import { alertMe } from '@/constants';
import Dropdown from '../Dropdown';
import { isIosPlatform } from '@/constants';
import { Switch } from 'react-native';

type IProps = {
    label: String,
    icon: String,
    placeholder: String,
    containerStyle: Object,
    onChangeCallback: Function,
    mediaType: String,
    onGetBase64: Function,
    imageStyle: Object,
    imageContainerStyle: Object,
    hasAvatar: Boolean,
    loadingContainerStyle: Object,
    defaultImage: String,
    withDocument: boolean,
};

const UPLOAD_BUTTON_ACTIONS = {
    DOCUMENT: 'DOCUMENT',
    GALLERY: 'GALLERY',
    CAMERA: 'CAMERA'
};

export class FilePickerComponent extends Component<IProps> {
    constructor(props) {
        super(props);
        this.actionSheet = React.createRef();
        this.state = {
            image: null,
            loading: false,
            isUploaded: false
        };
    }

    getPermissionAsync = async () => {
        alertMe({
            desc: Lng.t('filePicker.permission', { locale: this.props.locale }),
            showCancel: true,
            okText: 'Allow',
            okPress: () => {
                if (isIosPlatform()) {
                    Linking.openURL('app-settings:');
                } else {
                    const appName =
                        Constants?.manifest?.android?.package ??
                        'com.craterapp.app';

                    IntentLauncher.startActivityAsync(
                        IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS,
                        { data: 'package:' + appName }
                    );
                }
            }
        });
    };

    onToggleLoading = async loading => {
        await this.setState({ loading });
        this.props?.fileLoading?.(loading);
    };

    GALLERY_UPLOAD_BUTTON_OPTIONS = () => {
        const { locale, withDocument = false } = this.props

        const items = [
            {
                label: Lng.t('filePicker.gallery', { locale }),
                value: UPLOAD_BUTTON_ACTIONS.GALLERY
            },
            {
                label: Lng.t('filePicker.camera', { locale }),
                value: UPLOAD_BUTTON_ACTIONS.CAMERA
            }
        ]

        if (withDocument) {
             items.unshift({
                label: Lng.t('filePicker.document', { locale }),
                value: UPLOAD_BUTTON_ACTIONS.DOCUMENT
            })
        }

        return items;
    };

    onFileSelect = (result, action) => {

        action !== UPLOAD_BUTTON_ACTIONS.DOCUMENT
        ? this.setState({ image: result.uri })
        : this.setState({ image: null})

        FileSystem.readAsStringAsync(result.uri, {
            encoding: FileSystem.EncodingType.Base64
        })
            .then(async base64 => {
                const res = { ...result, base64 };
                this.props?.onChangeCallback?.(res);
                await this.onToggleLoading(false);
                this.setState({ isUploaded: true});
            })
            .catch(error => console.error(error));
    }

    onDocumentOptionSelect = async (action) => {
        await this.onToggleLoading(true);

        let result = await DocumentPicker.getDocumentAsync({copyToCacheDirectory : false});

        if (result.type === "success") {
            this.onFileSelect(result, action)
        } else {
            this.onToggleLoading(false);
        }
    }

    onCameraPermissions = async (status) => {
        if (status !== 'granted') {
            this.getPermissionAsync();
        } else {
            const { status } = await Permissions.askAsync(
                Permissions.MEDIA_LIBRARY_WRITE_ONLY
            );
            if (status !== 'granted') {
                this.getPermissionAsync();
                return true;
            }
        }
    }

    onOptionSelect = async action => {
        const { mediaType = 'Images' } = this.props;
        let asyncFun = '',
            permission = '',
            type = mediaType;

        if (action == UPLOAD_BUTTON_ACTIONS.DOCUMENT) {
            this.onDocumentOptionSelect(action)
            return;

        } else if (action == UPLOAD_BUTTON_ACTIONS.CAMERA) {
            asyncFun = 'launchCameraAsync';
            permission = 'CAMERA';
            type = 'Images';
            const { status } = await Permissions.askAsync(Permissions[permission]);
            this.onCameraPermissions(asyncFun, status, type, action)

        } else if (action == UPLOAD_BUTTON_ACTIONS.GALLERY) {
            asyncFun = 'launchImageLibraryAsync';
            permission = 'CAMERA_ROLL';

        }

        this.chooseFile({ asyncFun, type, action });
    };

    chooseFile = async ({ asyncFun, type, action}) => {
        await this.onToggleLoading(true);

        let result = await ImagePicker[asyncFun]({
            mediaTypes: ImagePicker.MediaTypeOptions[type],
            allowsEditing: true,
            base64: true,
            quality: 1
        });

        if (!result.cancelled) {
            this.onFileSelect(result, action)
        } else {
            this.onToggleLoading(false);
        }
    };

    toggleActionSheet = () => this.actionSheet.current.showActionSheet();

    SELECTED_IMAGE = () => {
        const { image } = this.state;
        const { imageUrl, imageStyle, imageContainerStyle } = this.props;

        return (
            <View style={[styles.imageContainer, imageContainerStyle]}>
                <AssetImage
                    imageSource={image !== null ? image : imageUrl}
                    imageStyle={[styles.images, imageStyle && imageStyle]}
                    uri
                    loadingImageStyle={styles.loadImage}
                />
            </View>
        );
    };

    render() {
        let { image, loading, isUploaded } = this.state;
        const {
            label,
            containerStyle,
            imageUrl,
            imageContainerStyle,
            hasAvatar = false,
            loadingContainerStyle,
            defaultImage,
            locale,
            withDocument
        } = this.props;

        const AVATAR_VIEW = () => {
            return (
                <View style={styles.iconContainer}>
                    <Icon
                        name={'camera'}
                        size={20}
                        color={colors.white}
                        style={styles.iconStyle}
                    />
                </View>
            );
        };

        const DEFAULT_VIEW = locale => {
            return (
                <View style={styles.container}>
                    <Icon name={'cloud-upload-alt'} size={23} color={colors.gray} />
                    <Text style={styles.title}>
                        {Lng.t('filePicker.file', { locale })}
                    </Text>
                </View>
            );
        };

        const DEFAULT_IMAGE = () => {
            const { imageStyle, defaultImage } = this.props;
            return (
                <AssetImage
                    imageSource={defaultImage}
                    imageStyle={[styles.images, imageStyle && imageStyle]}
                    loadingImageStyle={styles.loadImage}
                />
            );
        };

        const SELECTED_PDF = locale => {
            return (
                <View style={styles.container}>
                    <Icon name={'file'} size={64} color={colors.primary}/>
                    <Text style={styles.title}>
                        {Lng.t('filePicker.successful', { locale })}
                    </Text>
                </View>
            )
        }

        const fileAliasView = locale => {
            if (image !== null || imageUrl) {
                return this.SELECTED_IMAGE()
            } else if (withDocument && isUploaded) {
                return SELECTED_PDF(locale)
            } else if (!defaultImage) {
                return DEFAULT_VIEW(locale)
            } else {
                return DEFAULT_IMAGE()
            }
        }

        return (
            <View
                style={[styles.mainContainer, containerStyle && containerStyle]}
            >
                {label && <Text style={styles.label}>{label}</Text>}

                <Dropdown
                    ref={this.actionSheet}
                    options={this.GALLERY_UPLOAD_BUTTON_OPTIONS()}
                    onSelect={this.onOptionSelect}
                    cancelButtonIndex={withDocument ? 3 : 2}
                    destructiveButtonIndex={withDocument ? 5 : 3}
                    hasIcon={false}
                />

                <TouchableWithoutFeedback
                    onPress={() => this.toggleActionSheet()}
                >
                    <View>
                        <View
                            style={[
                                styles.imageWithIconContainer,
                                hasAvatar && imageContainerStyle
                            ]}
                        >
                            <Content
                                loadingProps={{
                                    is: loading,
                                    style: {
                                        ...styles.loadingContainer,
                                        ...loadingContainerStyle
                                    }
                                }}
                            >
                                {fileAliasView(locale)}

                            </Content>
                        </View>

                        {hasAvatar && AVATAR_VIEW()}
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const mapStateToProps = ({ global }) => ({
    locale: global?.locale
});

const mapDispatchToProps = {};

export const FilePicker = connect(
    mapStateToProps,
    mapDispatchToProps
)(FilePickerComponent);
