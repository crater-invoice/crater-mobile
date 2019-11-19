import React, { Component } from 'react';
import { Image, View, ActivityIndicator } from 'react-native';

type IProps = {
    imageStyle: Object,
    imageName: String,
    uri: Boolean,
    imageProps: Object,
    loadingImageStyle: Object
};
export class AssetImage extends Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    imageLoad() {
        const { loading } = this.state;
        this.setState({ loading: !loading });
    }

    render() {
        const { imageSource, imageStyle, loadingImageStyle, uri, imageProps } = this.props;
        const { loading } = this.state;
        return (
            <View>
                {loading && <ActivityIndicator
                    style={[imageStyle, loadingImageStyle && loadingImageStyle, { position: 'absolute' }]}
                />
                }
                <Image
                    source={uri ? { uri: imageSource } : imageSource}
                    style={imageStyle}
                    onLoadStart={() => this.imageLoad()}
                    onLoad={() => this.imageLoad()}
                    {...imageProps}
                />
            </View>
        );
    }
}

export default AssetImage;
