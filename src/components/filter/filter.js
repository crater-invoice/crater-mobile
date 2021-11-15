import React, {Component, Fragment} from 'react';
import {View, Modal, Keyboard, StyleSheet} from 'react-native';
import {Field, reset, change} from 'redux-form';
import {AssetIcon} from '../asset-icon';
import {DefaultLayout} from '../layouts';
import {BaseInput, ButtonView} from '@/components';
import {SelectField} from '../select-field';
import {BaseDatePicker, BaseButtonGroup, BaseButton} from '../base';
import t from 'locales/use-translation';
import {Text} from '../text';
import {View as CtView} from '../view';
import {colors} from '@/styles';
import {BaseDropdownPicker} from '@/components';
import {IProps, IStates} from './type.d';
import {isIosPlatform} from '@/helpers/platform';
import {isEmpty, hasObjectLength} from '@/constants';
import {isAndroidPlatform} from '@/helpers/platform';

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
            component={BaseInput}
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

    const bottomAction = (
      <BaseButtonGroup>
        <BaseButton
          onPress={this.onClear}
          type="primary-outline"
          show={!isKeyboardVisible}
        >
          {t('button.clear')}
        </BaseButton>
        <BaseButton
          onPress={handleSubmit(this.onSubmit)}
          show={!isKeyboardVisible}
        >
          {t('search.title')}
        </BaseButton>
      </BaseButtonGroup>
    );

    return (
      <View>
        <ButtonView
          onPress={() => this.onToggleFilter()}
          activeOpacity={0.4}
          scale={0.93}
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
        </ButtonView>

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
              bottomAction={bottomAction}
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
