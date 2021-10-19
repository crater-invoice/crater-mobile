import React from 'react';
import {CurrencyFormat, Label, ListView} from '@/components';
import t from 'locales/use-translation';
import styles from './modal-items-styles';
import {Field} from 'redux-form';
import {routes} from '@/navigation';
import {ItemSelectModal} from '@/select-modal';
import {isEmpty} from '@/constants';
import {IProps} from './modal-items-types';

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

  render() {
    const {
      selectedItems,
      items,
      getItems,
      theme,
      currency,
      itemsLoading,
      navigation,
      disabled,
      discount_per_item,
      tax_per_item,
      screen
    } = this.props;
    return (
      <>
        <Label isRequired theme={theme} style={styles.label}>
          {t('invoices.items')}
        </Label>

        <ListView
          items={this.getItemList(selectedItems)}
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
          parentViewStyle={{marginVertical: 4}}
        />

        <Field
          name="items"
          items={items}
          getItems={getItems}
          component={ItemSelectModal}
          loading={itemsLoading}
          disabled={disabled}
          onSelect={this.onEditItem}
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
      </>
    );
  }
}
