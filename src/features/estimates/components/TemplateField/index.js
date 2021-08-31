// @flow

import React, { Component } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import styles from './styles';
import { SlideModal, FakeInput, AssetImage, ActionButton } from '@/components';
import { Icon } from 'react-native-elements';
import { colors } from '@/styles';
import t from 'locales/use-translation';

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
    templates: Array
};

export class TemplateField extends Component<IProps> {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            visible: false,
            selectedTemplate: ''
        };
    }

    componentDidMount() {
        const { templates, input } = this.props;

        const selectedTemplate = templates.filter(
            val => val.name === input?.value
        )?.[0];

        this.setState({ selectedTemplate });
    }

    onToggle = () => {
        const {
            input: { value },
            templates,
            disabled
        } = this.props;
        const { selectedTemplate, visible } = this.state;

        if (disabled) {
            return;
        }

        if (visible && selectedTemplate?.name !== value) {
            const template = templates.filter(val => val.name === value)[0];
            this.setState({
                selectedTemplate: template
            });
        }

        this.setState({ visible: !visible });
    };

    onTemplateSelect = template => {
        this.setState({
            selectedTemplate: template
        });
    };

    onSearch = search => {
        this.setState({ search });
        this.getItems({ fresh: true, q: search });
    };

    onSubmit = async () => {
        const {
            onChangeCallback,
            input: { onChange }
        } = this.props;

        const { selectedTemplate } = this.state;

        await onChange(selectedTemplate.name);

        onChangeCallback && onChangeCallback(selectedTemplate);

        this.onToggle();
    };

    render() {
        const {
            containerStyle,
            templates,
            label,
            icon,
            placeholder,
            meta,
            disabled
        } = this.props;

        const { visible, selectedTemplate: { name } = {} } = this.state;
        const bottomAction = [
            {
                label: 'button.chooseTemplate',
                onPress: this.onSubmit
            }
        ];

        return (
            <View style={styles.container}>
                <FakeInput
                    label={label}
                    icon={icon}
                    values={name}
                    placeholder={placeholder}
                    onChangeCallback={this.onToggle}
                    containerStyle={containerStyle}
                    disabled={disabled}
                    meta={meta}
                />

                <SlideModal
                    visible={visible}
                    onToggle={this.onToggle}
                    headerProps={{
                        leftIconPress: () => this.onToggle(),
                        title: t('header.template'),
                        placement: 'center',
                        hasCircle: false,
                        noBorder: false,
                        transparent: false
                    }}
                    bottomDivider
                    defaultLayout
                    bottomAction={<ActionButton buttons={bottomAction} />}
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
                                            name === val.name && styles.active
                                        ]}
                                    />
                                    {name === val.name && (
                                        <Icon
                                            name="check"
                                            size={18}
                                            iconStyle={styles.iconStyle}
                                            color={colors.white}
                                            containerStyle={
                                                styles.iconContainer
                                            }
                                        />
                                    )}
                                </View>
                            </TouchableWithoutFeedback>
                        ))}
                    </View>
                </SlideModal>
            </View>
        );
    }
}
