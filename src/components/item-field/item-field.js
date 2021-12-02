import React from 'react';
import {BaseLabel, CurrencyFormat, ListView} from '@/components';
import t from 'locales/use-translation';
import styles from './item-field-styles';
import {Field} from 'redux-form';
import {routes} from '@/navigation';
import {ItemSelectModal} from '@/select-modal';
import {isEmpty} from '@/constants';
import {IProps} from './item-field-type.d';

export class ItemField extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }

  getItemList = selectedItems => {
    const {setFormField, currency, theme} = this.props;

    setFormField('items', selectedItems);

    if (isEmpty(selectedItems)) {
      return [];
    }

    return selectedItems.map(item => {
      let {name, description, price, quantity, total} = item;

      return {
        title: name,
        subtitle: {
          title: description,
          labelComponent: (
            <CurrencyFormat
              amount={price}
              currency={currency}
              preText={`${quantity} * `}
              style={styles.itemLeftSubTitle(theme)}
              containerStyle={styles.itemLeftSubTitleLabel}
            />
          )
        },
        amount: total,
        currency,
        fullItem: item
      };
    });
  };

  onEditItem = item => {
    const {
      navigation,
      isAllowToEdit,
      currency,
      screen,
      discount_per_item,
      tax_per_item
    } = this.props;

    if (!isAllowToEdit) {
      return;
    }

    navigation.navigate(routes.CREATE_ITEM, {
      item,
      screen,
      currency,
      tax_per_item,
      type: 'UPDATE',
      discount_per_item
    });
  };

  onSelect = item => {
    const {
      navigation,
      currency,
      screen,
      discount_per_item,
      tax_per_item
    } = this.props;

    navigation.navigate(routes.CREATE_ITEM, {
      item,
      screen,
      currency,
      type: 'ADD',
      tax_per_item,
      discount_per_item
    });
  };

  render() {
    const {
      selectedItems,
      items,
      theme,
      currency,
      navigation,
      discount_per_item,
      tax_per_item,
      isAllowToEdit,
      screen
    } = this.props;
    const disabled = !isAllowToEdit;
    const itemList = this.getItemList(selectedItems);

    return (
      <>
        <BaseLabel isRequired style={styles.label(itemList.length >= 1)}>
          {t('invoices.items')}
        </BaseLabel>

        <ListView
          items={itemList}
          itemContainer={styles.itemContainer(theme, disabled)}
          leftTitleStyle={styles.itemLeftTitle(theme)}
          leftSubTitleLabelStyle={[
            styles.itemLeftSubTitle(theme),
            styles.itemLeftSubTitleLabel
          ]}
          leftSubTitleStyle={styles.itemLeftSubTitle(theme)}
          rightTitleStyle={styles.itemRightTitle(theme)}
          backgroundColor={
            !disabled
              ? theme.thirdBgColor
              : theme?.input?.disableBackgroundColor
          }
          onPress={this.onEditItem}
          parentViewStyle={{marginBottom: 10}}
        />

        {!disabled && (
          <Field
            name="items"
            items={items}
            component={ItemSelectModal}
            disabled={disabled}
            onSelect={this.onSelect}
            rightIconPress={() =>
              navigation.navigate(routes.CREATE_ITEM, {
                screen,
                type: 'ADD',
                currency,
                discount_per_item,
                tax_per_item
              })
            }
          />
        )}
      </>
    );
  }
}
