import React, { Component } from 'react';
import { Switch, View, Text } from 'react-native';
import { colors } from '../../styles/colors';
import { styles } from './styles';

type IProps = {
    input: Object,
    disabled: Boolean,
    meta: Object,
    switchStyle: Object,
    containerStyle: Object,
    descriptionStyle: Object,
    hintStyle: Object,
    hint: string,
    description: String,
    switchType: String
};
export class ToggleSwitch extends Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            status: false
        };
    }

    componentDidMount() {
        const {
            status,
            input: { value }
        } = this.props;
        if (status) this.setState({ status });
        if (!status && value) {
            this.setState({ status: value ? true : false });
        }
    }

    onToggle = () => {
        const {
            onChangeCallback,
            input: { onChange }
        } = this.props;
        const { status } = this.state;

        this.setState(prevState => {
            return { status: !prevState.status };
        });

        onChange(!status);

        onChangeCallback && onChangeCallback(!status);
    };

    render() {
        const { loading, status } = this.state;

        const {
            switchType,
            hint,
            description,
            containerStyle,
            mainContainerStyle,
            hintStyle,
            descriptionStyle,
            input: { value },
            switchStyle,
            isRequired
        } = this.props;

        return (
            <View
                style={[
                    styles.mainContainer,
                    mainContainerStyle && mainContainerStyle
                ]}
            >
                <View
                    style={[styles.container, containerStyle && containerStyle]}
                >
                    {hint && (
                        <Text
                            numberOfLines={2}
                            style={[styles.hint, hintStyle && hintStyle]}
                        >
                            {hint}
                            {isRequired ? (
                                <Text style={styles.required}> *</Text>
                            ) : null}
                        </Text>
                    )}
                    <Switch
                        ios_backgroundColor={colors.darkGray}
                        thumbColor={colors.white}
                        trackColor={{
                            false: colors.darkGray,
                            true: colors.primaryLight
                        }}
                        onValueChange={() => this.onToggle()}
                        value={status}
                        style={[styles.switchStyle, switchStyle && switchStyle]}
                    />
                </View>
                {description && (
                    <View style={styles.descriptionContainer}>
                        <Text
                            style={[
                                styles.description,
                                descriptionStyle && descriptionStyle
                            ]}
                        >
                            {description}
                        </Text>
                    </View>
                )}
            </View>
        );
    }
}

export default ToggleSwitch;
