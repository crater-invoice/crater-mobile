import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    Linking,
} from 'react-native';
import * as IntentLauncher from 'expo-intent-launcher';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { styles } from './styles';
import { AssetImage } from '../AssetImage';
import { colors } from '@/styles';
import Lng from '@/lang/i18n';
import { Content } from '../Content';
import { alertMe } from '@/constants';
import Dropdown from '../Dropdown';
import { isIosPlatform } from '@/constants';

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
    defaultImage: String
};

const UPLOAD_BUTTON_ACTIONS = {
    GALLERY: 'GALLERY',
    CAMERA: 'CAMERA',
};

export class FilePickerComponent extends Component<IProps> {
    constructor(props) {
        super(props);
        this.actionSheet = React.createRef();
        this.state = {
            image: null,
            loading: false
        };
    }

    getPermissionAsync = async () => {
        alertMe({
            desc: Lng.t("filePicker.permission", { locale: this.props.locale }),
            showCancel: true,
            okText: 'Allow',
            okPress: () => {
                if (isIosPlatform()) {
                    Linking.openURL('app-settings:');
                } else {
                    IntentLauncher.startActivityAsync(IntentLauncher.ACTION_MANAGE_APPLICATIONS_SETTINGS);
                }
            }
        })
    }

    onToggleLoading = (loading) => {
        this.setState({ loading })
        this.props?.fileLoading?.(loading)
    }

    GALLERY_UPLOAD_BUTTON_OPTIONS = (locale) => {
        return [
            {
                label: Lng.t("filePicker.gallery", { locale }),
                value: UPLOAD_BUTTON_ACTIONS.GALLERY
            },
            {
                label: Lng.t("filePicker.camera", { locale }),
                value: UPLOAD_BUTTON_ACTIONS.CAMERA
            }
        ]
    };

    onOptionSelect = async (action) => {

        const { mediaType = 'Images' } = this.props
        let asyncFun = "", permission = "", type = mediaType

        if (action == UPLOAD_BUTTON_ACTIONS.CAMERA) {
            asyncFun = "launchCameraAsync"
            permission = "CAMERA"
            type = "Images"

        } else if (action == UPLOAD_BUTTON_ACTIONS.GALLERY) {
            asyncFun = "launchImageLibraryAsync"
            permission = "CAMERA_ROLL"
        }

        const { status } = await Permissions.askAsync(Permissions[permission]);
        if (status !== 'granted') {
            this.getPermissionAsync();
        }
        else {
            if (action == UPLOAD_BUTTON_ACTIONS.CAMERA) {
                const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                if (status !== 'granted') {
                    this.getPermissionAsync();
                    return true;
                }
            }

            this.chooseFile({ asyncFun, type })

        }

    };

    chooseFile = async ({ asyncFun, type }) => {

        setTimeout(() => {
            this.onToggleLoading(true)
        }, 500);

        let result = await ImagePicker[asyncFun]({
            mediaTypes: ImagePicker.MediaTypeOptions[type],
            allowsEditing: true,
            base64: true,
            quality: 1,
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri });

            FileSystem.readAsStringAsync(result.uri, {
                encoding: FileSystem.EncodingType.Base64
            }).then((base64) => {
                const res = { ...result, base64 }
                this.props?.onChangeCallback?.(res)
                this.onToggleLoading(false)
            })
                .catch(error => console.error(error));
        }
        else {
            this.onToggleLoading(false)
        }
    }

    toggleActionSheet = () => this.actionSheet.current.showActionSheet()

    AVATAR_VIEW = () => {
        return (
            <View style={styles.iconContainer}>
                <Icon
                    name={"camera"}
                    size={20}
                    color={colors.white}
                    style={styles.iconStyle}
                />
            </View>
        )
    }

    DEFAULT_VIEW = (locale) => {
        return (
            <View style={styles.container}>
                <Icon
                    name={"cloud-upload-alt"}
                    size={23}
                    color={colors.gray}
                />
                <Text style={styles.title}>
                    {Lng.t("filePicker.file", { locale })}
                </Text>
            </View>
        )
    }

    SELECTED_IMAGE = () => {
        const { image } = this.state;
        const { imageUrl, imageStyle, imageContainerStyle } = this.props;
        return (
            <View
                style={[
                    styles.imageContainer,
                    imageContainerStyle
                ]}
            >
                <AssetImage
                    imageSource={image !== null ? image : imageUrl}
                    imageStyle={[
                        styles.images,
                        imageStyle && imageStyle,
                    ]}
                    uri
                    loadingImageStyle={styles.loadImage}
                />
            </View>
        )
    }

    DEFAULT_IMAGE = () => {
        const { imageStyle, defaultImage } = this.props;
        return (
            <AssetImage
                imageSource={defaultImage}
                imageStyle={[
                    styles.images,
                    imageStyle && imageStyle,
                ]}
                loadingImageStyle={styles.loadImage}
            />
        )
    }

    render() {

        let { image, loading } = this.state;
        const {
            label,
            containerStyle,
            imageUrl,
            imageContainerStyle,
            hasAvatar = false,
            loadingContainerStyle,
            defaultImage,
            locale
        } = this.props;

        return (
            <View style={[styles.mainContainer, containerStyle && containerStyle]}>

                {label && <Text style={styles.label}>{label}</Text>}

                <Dropdown
                    ref={this.actionSheet}
                    options={this.GALLERY_UPLOAD_BUTTON_OPTIONS(locale)}
                    onSelect={this.onOptionSelect}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={3}
                    hasIcon={false}
                />

                <TouchableWithoutFeedback onPress={() => this.toggleActionSheet()}>
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
                                    style: { ...styles.loadingContainer, ...loadingContainerStyle }
                                }}
                            >
                                {image !== null || imageUrl ?
                                    this.SELECTED_IMAGE() :
                                    !defaultImage ?
                                        this.DEFAULT_VIEW(locale) :
                                        this.DEFAULT_IMAGE()
                                }

                            </Content>
                        </View>

                        {hasAvatar && this.AVATAR_VIEW()}

                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}


const mapStateToProps = ({ global }) => ({
    locale: global?.locale,
});

const mapDispatchToProps = {};

export const FilePicker = connect(
    mapStateToProps,
    mapDispatchToProps,
)(FilePickerComponent);
