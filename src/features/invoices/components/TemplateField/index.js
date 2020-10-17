// @flow

import React, { Component } from 'react';
import {
    TouchableWithoutFeedback,
    View
} from 'react-native';
import styles from './styles';
import { SlideModal, FakeInput, AssetImage, CtButton } from '../../../../components';
import { Icon } from 'react-native-elements';
import { colors } from '../../../../styles/colors';
import Lng from '../../../../api/lang/i18n';
import { headerTitle } from '../../../../api/helper';

type IProps = {
    label: String,
    icon: String,
    onChangeCallback: Function,
    placeholder: String,
    containerStyle: Object,
    rightIcon: String,
    leftIcon: String,
    color: String,
    value: String,
    templates: Array,
};

export class TemplateField extends Component<IProps> {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            visible: false,
            selectedTemplate: '',
        };
    }

    componentDidMount() {
        const { input: { value }, templates, navigation } = this.props

        const template = templates.filter(val => val.id === value)[0]

        this.setState({
            selectedTemplate: template,
        })
    }

    onToggle = () => {
        this.setState((prevState) => {
            return { visible: !prevState.visible }
        });
    }

    onTemplateSelect = (template) => {
        this.setState({
            selectedTemplate: template
        })
    }

    onSearch = (search) => {
        this.setState({ search })
        this.getItems({ fresh: true, q: search })
    }

    onSubmit = () => {
        const { onChangeCallback, input: { onChange } } = this.props

        const { selectedTemplate } = this.state

        onChange(selectedTemplate.id)

        onChangeCallback && onChangeCallback(selectedTemplate)

        this.onToggle()
    }

    BOTTOM_ACTION = () => {
        const { locale } = this.props

        return (
            <View style={styles.submitButton}>
                <CtButton
                    onPress={this.onSubmit}
                    btnTitle={Lng.t("button.chooseTemplate", { locale })}
                />
            </View>
        )
    }

    render() {
        const {
            containerStyle,
            templates,
            label,
            icon,
            placeholder,
            meta,
            locale,
        } = this.props;

        const {
            visible,
            selectedTemplate: { name, id } = {},
        } = this.state

        return (
            <View style={styles.container}>

                <FakeInput
                    label={label}
                    icon={icon}
                    values={name}
                    placeholder={placeholder}
                    onChangeCallback={this.onToggle}
                    containerStyle={containerStyle}
                    meta={meta}
                />

                <SlideModal
                    visible={visible}
                    onToggle={this.onToggle}
                    headerProps={{
                        leftIcon: "long-arrow-alt-left",
                        leftIconPress: () => this.onToggle(),
                        title: Lng.t("header.template", { locale }),
                        titleStyle: headerTitle({ marginLeft: -19, marginRight: -19 }),
                        placement: "center",
                        hasCircle: false,
                        noBorder: false,
                        transparent: false,
                    }}
                    bottomDivider
                    defaultLayout
                    bottomAction={this.BOTTOM_ACTION()}
                >
                    <View style={styles.imageList}>
                        {templates.map((val, index) => (
                            <TouchableWithoutFeedback
                                onPress={() => this.onTemplateSelect(val)}
                                key={index}
                            >
                                <View style={styles.imageContainer}>
                                    <AssetImage
                                        uri
                                        imageSource={val.path}
                                        imageStyle={[
                                            styles.image,
                                            id === val.id && styles.active
                                        ]}
                                    />
                                    {id === val.id &&
                                        <Icon
                                            name="check"
                                            size={18}
                                            iconStyle={styles.iconStyle}
                                            color={colors.white}
                                            containerStyle={styles.iconContainer}
                                        />
                                    }
                                </View>
                            </TouchableWithoutFeedback>
                        ))}
                    </View>
                </SlideModal>
            </View>
        );
    }
}
