import React, { Component, Fragment } from 'react';
import { View, Modal, TouchableOpacity, Keyboard } from 'react-native';
import { Field, reset, change } from 'redux-form';
import { AssetIcon } from '../AssetIcon';
import styles from './styles';
import { DefaultLayout } from '../Layouts';
import { InputField } from '../InputField';
import { SelectField } from '../SelectField';
import { SelectPickerField } from '../SelectPickerField';
import { DatePickerField } from '../DatePickerField';
import { CtButton } from '../Button';
import Lng from '@/lang/i18n';
import { BUTTON_TYPE, isIosPlatform, isAndroidPlatform } from '@/constants';
import { Text } from '../Text';
import { View as CtView } from '../View';

type IProps = {
    visible: Boolean,
    onToggle: Function,
    onSubmitFilter: Function,
    headerProps: Object,
    inputFields: Object,
    dropdownFields: Object,
    selectFields: Object,
    datePickerFields: Object,
    locale: String,
    onResetFilter: Function
};

export class Filter extends Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            counter: 0,
            isKeyboardVisible: false
        };
    }

    componentDidMount = () => {
        this.keyboardDidShowListener = Keyboard?.addListener?.(
            'keyboardDidShow',
            () => {
                !isIosPlatform() && this.setState({ isKeyboardVisible: true });
            }
        );
        this.keyboardDidHideListener = Keyboard?.addListener?.(
            'keyboardDidHide',
            () => {
                !isIosPlatform() && this.setState({ isKeyboardVisible: false });
            }
        );
    };

    componentWillUnmount = () => {
        this.keyboardDidShowListener?.remove?.();
        this.keyboardDidHideListener?.remove?.();
    };

    inputField = fields => {
        return fields.map((field, index) => {
            const { name, hint, inputProps } = field;
            return (
                <View key={index}>
                    <Field
                        name={name}
                        component={InputField}
                        hint={hint}
                        inputProps={{
                            returnKeyType: 'next',
                            ...inputProps
                        }}
                        {...field}
                        leftIconStyle={field.leftIcon && styles.inputIconStyle}
                    />
                </View>
            );
        });
    };

    selectField = fields => {
        const { counter } = this.state;

        return fields.map((field, index) => {
            const { name, items } = field;

            return (
                <View key={index}>
                    <Field
                        name={name}
                        items={items}
                        component={SelectField}
                        hasFirstItem={counter > 0 ? false : true}
                        {...field}
                    />
                </View>
            );
        });
    };

    dropdownField = fields => {
        return fields.map((field, index) => {
            const { name, items } = field;

            return (
                <View key={index}>
                    <Field
                        name={name}
                        component={SelectPickerField}
                        items={items}
                        {...field}
                    />
                </View>
            );
        });
    };

    datePickerField = fields => {
        return fields.map((field, index) => {
            const { name } = field;

            return (
                <Fragment key={index}>
                    <CtView flex={1} justify-between>
                        <Field
                            name={name}
                            component={DatePickerField}
                            filter={true}
                            {...field}
                        />
                    </CtView>
                    {index === 0 && <CtView flex={0.07} />}
                </Fragment>
            );
        });
    };

    setFormField = (field, value) => {
        const { form, dispatch } = this.props.clearFilter;
        dispatch(change(form, field, value));
    };

    onToggleFilter = () => {
        this.setState(prevState => {
            return { visible: !prevState.visible };
        });
    };

    onSubmit = val => {
        let counter = 0;

        for (const key in val) {
            key !== 'search' && counter++;
        }

        this.setState({ counter });

        this.onToggleFilter();

        this.props.onSubmitFilter?.();
    };

    onClear = () => {
        const { clearFilter, onResetFilter } = this.props;
        const {
            form,
            dispatch,
            formValues: { search }
        } = clearFilter;

        dispatch(reset(form));
        dispatch(change(form, 'search', search));

        this.setState({ counter: 0 });

        onResetFilter?.();
    };

    BOTTOM_ACTION = () => {
        const {
            locale,
            clearFilter: { handleSubmit }
        } = this.props;

        return (
            <View style={styles.submitButton}>
                <CtButton
                    onPress={() => this.onClear()}
                    btnTitle={Lng.t('button.clear', { locale })}
                    type={BUTTON_TYPE.OUTLINE}
                    containerStyle={styles.handleBtn}
                    buttonContainerStyle={styles.buttonContainer}
                />

                <CtButton
                    onPress={handleSubmit(this.onSubmit)}
                    btnTitle={Lng.t('search.title', { locale })}
                    containerStyle={styles.handleBtn}
                    buttonContainerStyle={styles.buttonContainer}
                />
            </View>
        );
    };

    render() {
        const {
            headerProps,
            inputFields,
            dropdownFields,
            selectFields,
            datePickerFields,
            locale,
            clearFilter: { handleSubmit },
            theme
        } = this.props;

        const { visible, counter, isKeyboardVisible } = this.state;

        const headerView = {
            title: Lng.t('header.filter', {
                locale
            }),
            placement: 'center',
            rightIcon: 'search',
            hasCircle: false,
            noBorder: false,
            transparent: false,
            leftIconPress: () => this.onToggleFilter(),
            rightIconPress: handleSubmit(this.onSubmit),
            ...(isAndroidPlatform() && {
                containerStyle: { paddingTop: 60, height: 110 }
            }),
            ...headerProps
        };

        return (
            <View>
                <TouchableOpacity
                    onPress={() => this.onToggleFilter()}
                    activeOpacity={0.4}
                >
                    <AssetIcon
                        name={'filter'}
                        size={22}
                        color={theme?.icons?.filter?.color}
                        style={styles.filterIcon}
                    />

                    {counter > 0 && (
                        <View style={styles.counter(theme)}>
                            <Text
                                veryLightGray
                                center
                                style={styles.counterText}
                            >
                                {counter}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    visible={visible}
                    onRequestClose={() => this.onToggleFilter()}
                    hardwareAccelerated={true}
                    statusBarTranslucent={true}
                >
                    <View style={styles.modalContainer}>
                        <DefaultLayout
                            headerProps={headerView}
                            bottomAction={
                                !isKeyboardVisible && this.BOTTOM_ACTION()
                            }
                            keyboardProps={{
                                keyboardVerticalOffset: isIosPlatform()
                                    ? 60
                                    : 100
                            }}
                        >
                            <View style={styles.bodyContainer}>
                                {selectFields && this.selectField(selectFields)}

                                <CtView flex={1} flex-row mt-5>
                                    {datePickerFields &&
                                        this.datePickerField(datePickerFields)}
                                </CtView>

                                {dropdownFields &&
                                    this.dropdownField(dropdownFields)}

                                {inputFields && this.inputField(inputFields)}
                            </View>
                        </DefaultLayout>
                    </View>
                </Modal>
            </View>
        );
    }
}
