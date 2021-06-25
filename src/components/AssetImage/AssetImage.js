import React, { Component } from 'react';
import { Image, View, ActivityIndicator } from 'react-native';

interface IProps {
    imageStyle: Object;
    imageName: String;
    uri: Boolean;
    imageProps: Object;
    loadingImageStyle: Object;
    loaderSize: 'large' | 'small';
}

export class AssetImage extends Component<IProps> {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    render() {
        const {
            imageSource,
            imageStyle,
            loadingImageStyle,
            uri,
            imageProps,
            loaderSize = 'large'
        } = this.props;

        return (
            <View>
                {this.state.loading && (
                    <ActivityIndicator
                        size={loaderSize}
                        style={[
                            imageStyle,
                            loadingImageStyle && loadingImageStyle,
                            { position: 'absolute' }
                        ]}
                    />
                )}
                <Image
                    source={uri ? { uri: imageSource } : imageSource}
                    style={imageStyle}
                    onLoadEnd={() => this.setState({ loading: false })}
                    {...imageProps}
                />
            </View>
        );
    }
}

export default AssetImage;
