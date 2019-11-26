import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    Alert,
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
import { colors } from '../../styles/colors';
import { isIosPlatform } from '../../api/helper';
import Lng from '../../api/lang/i18n';
import { Content } from '../Content';

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

export class FilePickerComponent extends Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            loading: false
        };
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        const { language } = this.props

        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            Alert.alert(
                "",
                Lng.t("filePicker.permission", { locale: language }),
                [
                    {
                        text: 'Allow',
                        onPress: () => {
                            if (isIosPlatform()) {
                                Linking.openURL('app-settings:');
                            } else {
                                IntentLauncher.startActivityAsync(IntentLauncher.ACTION_MANAGE_APPLICATIONS_SETTINGS);
                            }
                        }
                    },
                    {
                        text: 'Cancel',
                        onPress: () => console.log('cancel'),
                        style: 'cancel',
                    },
                ],
                { cancelable: false }
            );
        }
    }

    onToggleLoading = () => {
        const { fileLoading } = this.props
        const { loading } = this.state

        this.setState((prevState) => {
            return { loading: !prevState.loading }
        });

        fileLoading && fileLoading(!loading)
    }

    chooseFile = async () => {

        setTimeout(() => {
            this.onToggleLoading()
        }, 1000);

        const { mediaType = 'Images' } = this.props

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions[mediaType],
            // mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: mediaType === 'Images' ? true : false,
            base64: true,
            quality: 1,
        });

        if (!result.cancelled) {
            const { onChangeCallback, input: { onChange } } = this.props
            this.setState({ image: result.uri });

            FileSystem.readAsStringAsync(result.uri, {
                encoding: FileSystem.EncodingType.Base64
            }).then((base64) => {
                const res = { ...result, base64 }
                onChangeCallback(res)
                this.onToggleLoading()
            })
                .catch(error => {
                    console.error(error);
                });
        }
        else {
            this.onToggleLoading()
        }
    };


    render() {

        let { image, loading } = this.state;
        const {
            label,
            containerStyle,
            imageUrl,
            language,
            imageStyle,
            imageContainerStyle,
            hasAvatar = false,
            loadingContainerStyle,
            defaultImage,
        } = this.props;


        return (
            <View style={[styles.mainContainer, containerStyle && containerStyle]}>
                {label && <Text style={styles.label}>{label}</Text>}

                <TouchableWithoutFeedback onPress={() => this.chooseFile()}>
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
                                {image !== null || imageUrl ? (
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
                                ) : (
                                        !defaultImage ? (
                                            <View style={styles.container}>
                                                <Icon
                                                    name={"cloud-upload-alt"}
                                                    size={23}
                                                    color={colors.gray}
                                                />
                                                <Text style={styles.title}>
                                                    {Lng.t("filePicker.file", { locale: language })}
                                                </Text>
                                            </View>
                                        )
                                            : (
                                                <AssetImage
                                                    imageSource={defaultImage}
                                                    imageStyle={[
                                                        styles.images,
                                                        imageStyle && imageStyle,
                                                    ]}
                                                    loadingImageStyle={styles.loadImage}
                                                />
                                            )
                                    )}
                            </Content>
                        </View>
                        {hasAvatar && (
                            <View style={styles.iconContainer}>
                                <Icon
                                    name={"camera"}
                                    size={20}
                                    color={colors.white}
                                    style={styles.iconStyle}
                                />
                            </View>
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}


const mapStateToProps = ({ global }) => ({
    language: global.language,
});

const mapDispatchToProps = {};

export const FilePicker = connect(
    mapStateToProps,
    mapDispatchToProps,
)(FilePickerComponent);
