import React, {useRef} from 'react';
import {CurrencyFormat, Editor, Label, ListView} from '@/components';
import {View} from 'react-native';
import t from 'locales/use-translation';
import styles from './modal-items-styles';
import {Field} from 'redux-form';
import {formatNotesType} from '@/utils';
import {routes} from '@/navigation';
import {ItemSelectModal, NoteSelectModal} from '@/select-modal';
import {isEmpty} from '@/constants';

interface IProps {
  isEditScreen?: boolean;
  notes?: Array<any>;
  getNotes?: Function;
  navigation?: any;
  noteType?: String;
  onSelect?: VoidFunction;
}
interface IStates {}

export class ItemField extends React.Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.parentProps = props;
  }

  getItemList = selectedItems => {
    const {setFormField, currency} = this.props;

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
              style={styles.itemLeftSubTitle(this.parentProps.theme)}
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
      itemData: {discount_per_item, tax_per_item}
    } = this.props;

    if (!isAllowToEdit) {
      return;
    }

    navigation.navigate(routes.INVOICE_ITEM, {
      item,
      type: 'EDIT',
      currency,
      discount_per_item,
      tax_per_item
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
      itemData: {discount_per_item, tax_per_item}
    } = this.props;
    console.log(this.props);
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
            navigation.navigate(routes.INVOICE_ITEM, {
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
