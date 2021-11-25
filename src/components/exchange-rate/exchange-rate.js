import React, {Component} from 'react';
import {View, BaseLabel, BaseInput, Text, AssetSvg} from '@/components';
import {IProps, IStates} from './type.d.js';
import {keyboardType} from '@/helpers/keyboard.js';
import {Field} from 'redux-form';
import t from 'locales/use-translation';
import {colors} from '@/styles/colors.js';
import {TouchableOpacity, Animated} from 'react-native';
import {RefreshIcon} from '@/icons/refresh-icon.js';
import {styles} from './exchange-rate-styles';

const hitSlop = {top: 20, left: 25, bottom: 20, right: 25};
const SPIN_OPTION = {START: 'start', STOP: 'stop'};

export class ExchangeRateField extends Component<IProps, IStates> {
  spinValue: any;

  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0);
    this.state = {refreshing: false};
  }

  onRefresh = () => {
    const {refreshing} = this.state;
    const {
      setExchangeRate,
      state: {currency}
    } = this.props;

    if (refreshing) return;
    this.spinAnimation(SPIN_OPTION.START);
    this.toggleRefreshing(true);
    const onResult = () => {
      setTimeout(() => {
        this.toggleRefreshing(false);
        this.spinAnimation(SPIN_OPTION.STOP);
      }, 500);
    };

    setExchangeRate(currency, onResult);
  };

  spinAnimation = status => {
    if (status === SPIN_OPTION.STOP) {
      this.spinValue.setValue(0);
      return;
    }

    Animated.loop(
      Animated.timing(this.spinValue, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true
      })
    ).start();
  };

  toggleRefreshing = status => this.setState({refreshing: status});

  render() {
    const {
      props: {currency, isEditScreen, isAllowToEdit, theme},
      state: {hasProvider},
      state
    } = this.props;
    const disabled = !isAllowToEdit;
    const baseCurrency = currency?.code;
    const selectedCurrency = state?.currency?.code;
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    return (
      <View flex={1} flex-column justify-center>
        <View flex={1} flex-row justify-between mr-10>
          <BaseLabel mt-9 style={styles.label} isRequired>
            {t('exchange_rate.label')}
          </BaseLabel>
          {isEditScreen && hasProvider && (
            <View justify-end>
              <TouchableOpacity
                onPress={this.onRefresh}
                hitSlop={hitSlop}
                style={styles.refresh}
              >
                <Animated.View style={{transform: [{rotate: spin}]}}>
                  <AssetSvg name={RefreshIcon} width={18} height={18} />
                </Animated.View>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View flex={1} flex-row>
          <View flex={0.34} justify-between>
            <Field
              name="currency_code"
              component={BaseInput}
              inputProps={{
                value: t('exchange_rate.selected_currency', {selectedCurrency})
              }}
              inputContainerStyle={styles.codeContainer}
              disabledStyle={disabled ? {} : styles.codeDisable(theme)}
              textStyle={styles.codeText(theme)}
              disabled
            />
          </View>
          <View flex={1} justify-between>
            <Field
              name="exchange_rate"
              component={BaseInput}
              rightSymbol={baseCurrency}
              keyboardType={keyboardType.DECIMAL}
              inputContainerStyle={styles.reteContainer}
              disabled={disabled}
            />
          </View>
        </View>
        <Text mb-4 h6 style={styles.description} darkGray>
          {t('exchange_rate.exchange_help_text', {
            selectedCurrency,
            baseCurrency
          })}
        </Text>
      </View>
    );
  }
}
