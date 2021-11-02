import React, {Component, Fragment} from 'react';
import {View, Modal, Keyboard, StyleSheet} from 'react-native';
import {Field, reset, change} from 'redux-form';
import {AssetIcon} from '../asset-icon';
import {DefaultLayout} from '../Layouts';
import {InputField} from '../InputField';
import {SelectField} from '../SelectField';
import {BaseDatePicker} from '../base';
import {ActionButton, CtDecorativeButton} from '../button';
import t from 'locales/use-translation';
import {Text} from '../Text';
import {View as CtView} from '../view';
import {colors} from '@/styles';
import {BaseDropdownPicker} from '@/components';
import {ITheme} from '@/interfaces';
import {
  isIosPlatform,
  isAndroidPlatform,
  isEmpty,
  hasObjectLength
} from '@/constants';

export class Filter extends Component<IProps, IStates> {
  keyboardShowListener: any;
  keyboardHideListener: any;
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      counter: 0,
      isKeyboardVisible: false
    };
  }

  componentDidMount = () => {
    this.keyboardShowListener = Keyboard?.addListener?.(
      'keyboardDidShow',
      () => {
        !isIosPlatform && this.setState({isKeyboardVisible: true});
      }
    );
    this.keyboardHideListener = Keyboard?.addListener?.(
      'keyboardDidHide',
      () => {
        !isIosPlatform && this.setState({isKeyboardVisible: false});
      }
    );
  };

  componentWillUnmount = () => {
    this.keyboardShowListener?.remove?.();
    this.keyboardHideListener?.remove?.();
  };

  inputField = fields => {
    return fields.map((field, index) => {
      const {name, hint, inputProps} = field;
      return (
        <View key={index}>
          <Field
            name={name}
            component={InputField}
            hint={hint}
            inputProps={{
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
    const {counter} = this.state;

    return fields.map((field, index) => {
      const {name, items} = field;
      if (!hasObjectLength(field)) {
        return null;
      }
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
      const {name, items} = field;

      return (
        <View key={index}>
          <Field
            name={name}
            component={BaseDropdownPicker}
            items={items}
            {...field}
          />
        </View>
      );
    });
  };

  datePickerField = fields => {
    return fields.map((field, index) => {
      const {name} = field;

      return (
        <Fragment key={index}>
          <CtView flex={1} justify-between>
            <Field
              name={name}
              component={BaseDatePicker}
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
    const {form, dispatch} = this.props.clearFilter;
    dispatch(change(form, field, value));
  };

  onToggleFilter = () => {
    this.setState(prevState => {
      return {visible: !prevState.visible};
    });
  };

  onSubmit = val => {
    let counter = 0;

    for (const key in val) {
      key !== 'search' && counter++;
    }

    this.setState({counter});

    this.onToggleFilter();

    this.props.onSubmitFilter?.();
  };

  onClear = () => {
    const {clearFilter, onResetFilter} = this.props;
    const {
      form,
      dispatch,
      formValues: {search}
    } = clearFilter;

    dispatch(reset(form));
    dispatch(change(form, 'search', search));

    this.setState({counter: 0});

    onResetFilter?.();
  };

  render() {
    const {
      headerProps,
      inputFields,
      dropdownFields,
      selectFields,
      datePickerFields,
      clearFilter: {handleSubmit},
      theme
    } = this.props;

    const {visible, counter, isKeyboardVisible} = this.state;

    const headerView = {
      title: t('header.filter'),
      placement: 'center',
      rightIcon: 'search',
      hasCircle: false,
      noBorder: false,
      transparent: false,
      leftIconPress: () => this.onToggleFilter(),
      rightIconPress: handleSubmit(this.onSubmit),
      ...(isAndroidPlatform && {
        containerStyle: {paddingTop: 60, height: 110}
      }),
      ...headerProps
    };

    const bottomAction = [
      {
        label: 'button.clear',
        onPress: this.onClear,
        type: 'btn-outline',
        show: !isKeyboardVisible
      },
      {
        label: 'search.title',
        onPress: handleSubmit(this.onSubmit),
        show: !isKeyboardVisible
      }
    ];

    return (
      <View>
        <CtDecorativeButton
          onPress={() => this.onToggleFilter()}
          activeOpacity={0.4}
          scale={0.95}
          justify-center
          items-center
          withHitSlop
          {...(this.props['is-small'] && {'pr-15': true})}
        >
          <AssetIcon
            name={'filter'}
            size={19}
            color={
              counter <= 0 && this.props['is-small']
                ? colors.darkGray
                : theme?.icons?.filter?.color
            }
          />

          {counter > 0 && (
            <View style={styles.counter(theme, this.props['is-small'])}>
              <Text
                veryLightGray
                center
                style={styles.counterText(this.props['is-small'])}
              >
                {counter}
              </Text>
            </View>
          )}
        </CtDecorativeButton>

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
              bottomAction={<ActionButton buttons={bottomAction} />}
              keyboardProps={{
                keyboardVerticalOffset: isIosPlatform ? 60 : 100
              }}
            >
              {!isEmpty(selectFields) && this.selectField(selectFields)}

              <CtView flex={1} flex-row mt-5>
                {datePickerFields && this.datePickerField(datePickerFields)}
              </CtView>

              {dropdownFields && this.dropdownField(dropdownFields)}

              {inputFields && this.inputField(inputFields)}
            </DefaultLayout>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    ...(isAndroidPlatform && {
      marginTop: -20,
      margin: 0,
      padding: 0
    })
  },
  inputIconStyle: {
    marginLeft: 5
  },
  counter: (theme, isSmall) => ({
    position: 'absolute',
    top: -9,
    right: -11,
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: theme?.icons?.filter?.color,
    borderWidth: 1.5,
    borderColor: theme?.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    ...(isSmall && {
      top: -9,
      right: 1,
      width: 18,
      height: 18,
      borderRadius: 18 / 2
    })
  }),
  counterText: isSmall => ({
    fontSize: 12,
    ...(isSmall && {
      fontSize: 11
    })
  })
});

interface IProps {
  /**
   * If true the modal is showing.
   */
  visible?: boolean;

  /**
   * A function to toggle modal visibility.
   */
  onToggle?: () => any;

  /**
   * Invoked with the the change event as an argument when the value changes.
   */
  onSubmitFilter: () => void;

  /**
   * An additional field accessibility.
   */
  headerProps: any;

  /**
   * An array of objects with data for each input field.
   */
  inputFields: Array<any>;

  /**
   * An array of objects with data for each dropdown field.
   */
  dropdownFields: Array<any>;

  /**
   * An array of objects with data for each select field.
   */
  selectFields: Array<any>;

  /**
   * An array of objects with data for each date field.
   */
  datePickerFields: Array<any>;

  /**
   * An action to reset the current form values.
   */
  onResetFilter: () => void;

  /**
   * All props of the parent component.
   */
  clearFilter: any;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;
}

interface IStates {
  /**
   * If true the modal is showing.
   */
  visible: boolean;

  /**
   * The number of counts for applying filter fields.
   */
  counter: number;

  /**
   * If true, the keyboard is visible.
   */
  isKeyboardVisible: boolean;
}
