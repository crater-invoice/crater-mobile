import React, { Component } from 'react';
import { View, Modal, TouchableOpacity, Text, StatusBar } from 'react-native';
import { Field, reset, change } from 'redux-form';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';
import { DefaultLayout } from '../Layouts';
import { InputField } from '../InputField';
import { SelectField } from '../SelectField';
import { SelectPickerField } from '../SelectPickerField';
import { colors } from '../../styles/colors';
import { DatePickerField } from '../DatePickerField';
import { BUTTON_TYPE } from '../../api/consts';
import { CtButton } from '../Button';
import Lng from '../../api/lang/i18n';

type IProps = {
    visible: Boolean,
    onToggle: Function,
    headerProps: Object,
    inputFields: Object,
    dropdownFields: Object,
    selectFields: Object,
    datePickerFields: Object,
    language: String,
};


export class Filter extends Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            counter: 0,
        };
    }


    inputField = (fields) => {
        return fields.map((field, index) => {
            const { name, hint, inputProps } = field
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
            )
        })
    }


    selectField = (fields) => {
        const { counter } = this.state

        return fields.map((field, index) => {
            const { name, items } = field

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
            )
        })
    }

    dropdownField = (fields) => {
        return fields.map((field, index) => {
            const { name, items } = field

            return (
                <View key={index}>
                    <Field
                        name={name}
                        component={SelectPickerField}
                        items={items}
                        {...field}
                    />
                </View>
            )
        })
    }

    datePickerField = (fields) => {

        return fields.map((field, index) => {
            const { name } = field

            return (
                <View
                    key={index}
                    style={styles.dateField}
                >
                    <Field
                        name={name}
                        component={DatePickerField}
                        filter={true}
                        {...field}
                    />
                </View>
            )
        })
    }

    setFormField = (field, value) => {
        const { form, dispatch } = this.props.clearFilter
        dispatch(change(form, field, value));
    };

    onToggleFilter = () => {
        this.setState((prevState) => {
            return { visible: !prevState.visible }
        });
    }

    onSubmit = (val) => {


        let counter = 0
        const { onSubmitFilter } = this.props

        for (key in val) {
            !(key === 'search') && counter++
        }

        this.setState({ counter })

        this.onToggleFilter()

        onSubmitFilter && onSubmitFilter()
    }

    onClear = () => {

        const { clearFilter } = this.props
        const { form, dispatch, formValues: { search } } = clearFilter

        dispatch(reset(form));
        dispatch(change(form, 'search', search));
        this.setState({ counter: 0 })
    }


    BOTTOM_ACTION = () => {

        const {
            language,
            clearFilter: { handleSubmit }
        } = this.props

        return (
            <View style={styles.submitButton}>
                <CtButton
                    onPress={() => this.onClear()}
                    btnTitle={Lng.t("button.clear", { locale: language })}
                    type={BUTTON_TYPE.OUTLINE}
                    containerStyle={styles.handleBtn}
                    buttonContainerStyle={styles.buttonContainer}
                />

                <CtButton
                    onPress={handleSubmit(this.onSubmit)}
                    btnTitle={Lng.t("search.title", { locale: language })}
                    containerStyle={styles.handleBtn}
                    buttonContainerStyle={styles.buttonContainer}
                />
            </View>
        )
    }

    render() {

        const {
            headerProps,
            inputFields,
            dropdownFields,
            selectFields,
            datePickerFields,
            language,
            clearFilter: { handleSubmit }
        } = this.props

        const { visible, counter } = this.state

        return (
            <View>
                <TouchableOpacity
                    onPress={() => this.onToggleFilter()}
                    activeOpacity={0.4}
                >
                    <Icon
                        name={'filter'}
                        size={22}
                        color={colors.primary}
                        style={styles.filterIcon}
                    />

                    {counter > 0 && (
                        <View style={styles.counter}>
                            <Text style={styles.counterText}>
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
                >
                    <StatusBar
                        backgroundColor={colors.secondary}
                        barStyle={"dark-content"}
                        translucent={true}
                    />

                    <View style={styles.modalContainer}>

                        <DefaultLayout
                            headerProps={{
                                leftIcon: 'long-arrow-alt-left',
                                leftIconStyle: styles.backIcon,
                                title: Lng.t("header.filter", { locale: language }),
                                placement: "center",
                                rightIcon: "search",
                                hasCircle: false,
                                noBorder: false,
                                transparent: false,
                                leftIconPress: () => this.onToggleFilter(),
                                rightIconPress: handleSubmit(this.onSubmit),
                                ...headerProps
                            }}
                            bottomAction={this.BOTTOM_ACTION()}
                        >
                            <View style={styles.bodyContainer}>

                                {selectFields &&
                                    this.selectField(selectFields)
                                }

                                <View
                                    style={styles.dateFieldContainer}
                                >

                                    {datePickerFields &&
                                        this.datePickerField(datePickerFields)
                                    }
                                </View>

                                {dropdownFields &&
                                    this.dropdownField(dropdownFields)
                                }

                                {inputFields &&
                                    this.inputField(inputFields)
                                }

                            </View>
                        </DefaultLayout>
                    </View>
                </Modal>
            </View>
        );
    }
}

