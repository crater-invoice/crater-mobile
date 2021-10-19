import {hasValue, isEmpty} from '@/constants';
import {calculationRefs} from 'stores/common/helpers';

function total() {
  let selectedItems = calculationRefs?.props?.selectedItems;
  let subTotal = 0;
  if (isEmpty(selectedItems)) {
    return JSON.parse(subTotal);
  }

  selectedItems.map(val => (subTotal += JSON.parse(val.total)));

  return JSON.parse(subTotal);
}

function tax() {
  const {
    formValues: {taxes}
  } = calculationRefs?.props;

  let totalTax = 0;

  taxes &&
    taxes.map(val => {
      if (!val.compound_tax) {
        totalTax += getTaxValue(val.percent);
      }
    });

  return totalTax;
}

function getCompoundTaxValue(tax) {
  return (tax * JSON.parse(totalAmount())) / 100;
}

function CompoundTax() {
  const {
    formValues: {taxes}
  } = calculationRefs?.props;

  let totalTax = 0;

  taxes &&
    taxes.map(val => {
      if (val.compound_tax) {
        totalTax += getCompoundTaxValue(val.percent);
      }
    });

  return totalTax;
}

function totalDiscount() {
  const {
    formValues: {discount, discount_type}
  } = calculationRefs?.props;

  let discountPrice = 0;

  if (discount_type === 'percentage') {
    discountPrice = (discount * total()) / 100;
  } else {
    discountPrice = discount * 100;
  }

  return discountPrice;
}

function itemTotalTaxes() {
  let selectedItems = calculationRefs?.props?.selectedItems;
  let taxes = [];

  if (isEmpty(selectedItems)) {
    return [];
  }

  selectedItems.map(val => {
    val.taxes &&
      val.taxes.filter(tax => {
        let hasSame = false;
        const {tax_type_id, id, amount} = tax;

        taxes = taxes.map(tax2 => {
          if ((tax_type_id || id) === tax2.tax_type_id) {
            hasSame = true;
            return {
              ...tax2,
              amount: amount + tax2.amount,
              tax_type_id: tax2.tax_type_id
            };
          }
          return tax2;
        });

        if (!hasSame) {
          taxes.push({...tax, tax_type_id: tax_type_id || id});
        }
      });
  });
  return taxes;
}

function subTotal() {
  let tax = 0;
  itemTotalTaxes().filter(val => {
    tax += val.amount;
  });
  return total() + tax - totalDiscount();
}

function getTaxName(tax) {
  if (hasValue(tax?.name)) {
    return tax.name;
  }

  const {taxTypes} = calculationRefs?.props;
  let taxName = '';
  const type = taxTypes.filter(val => val.fullItem.id === tax.tax_type_id);

  if (type.length > 0) {
    taxName = type[0]['fullItem'].name;
  }
  return taxName;
}

function getItemList(items) {
  const {currency} = calculationRefs?.state;

  if (isEmpty(items)) {
    return [];
  }

  return items.map(item => {
    let {name, description, price} = item;

    return {
      title: name,
      subtitle: {title: description},
      amount: price,
      currency,
      fullItem: item
    };
  });
}

const getTaxValue = tax => (tax * JSON.parse(subTotal())) / 100;

const totalAmount = () => subTotal() + tax();

const finalAmount = () => totalAmount() + CompoundTax();

export {
  total,
  tax,
  CompoundTax,
  getCompoundTaxValue,
  subTotal,
  itemTotalTaxes,
  totalDiscount,
  getTaxValue,
  getTaxName,
  totalAmount,
  finalAmount,
  getItemList
};
