import { hasValue, isEmpty } from '@/constants';
import { estimateRefs } from '../constants';

function estimateSubTotal() {
    let estimateItems = estimateRefs?.props?.estimateItems;
    let subTotal = 0;

    if (isEmpty(estimateItems)) {
        return JSON.parse(subTotal);
    }

    estimateItems.map(val => (subTotal += JSON.parse(val.total)));

    return JSON.parse(subTotal);
}

function estimateTax() {
    const {
        formValues: { taxes }
    } = estimateRefs?.props;

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

function estimateCompoundTax() {
    const {
        formValues: { taxes }
    } = estimateRefs?.props;

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
        formValues: { discount, discount_type }
    } = estimateRefs?.props;

    let discountPrice = 0;

    if (discount_type === 'percentage') {
        discountPrice = (discount * estimateSubTotal()) / 100;
    } else {
        discountPrice = discount * 100;
    }

    return discountPrice;
}

function estimateItemTotalTaxes() {
    let estimateItems = estimateRefs?.props?.estimateItems;
    let taxes = [];

    if (isEmpty(estimateItems)) {
        return [];
    }

    estimateItems.map(val => {
        val.taxes &&
            val.taxes.filter(tax => {
                let hasSame = false;
                const { tax_type_id, id, amount } = tax;

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
                    taxes.push({ ...tax, tax_type_id: tax_type_id || id });
                }
            });
    });
    return taxes;
}

function subTotal() {
    let estimateTax = 0;
    estimateItemTotalTaxes().filter(val => {
        estimateTax += val.amount;
    });
    return estimateSubTotal() + estimateTax - totalDiscount();
}

function getTaxName(tax) {
    if (hasValue(tax?.name)) {
        return tax.name;
    }

    const { taxTypes } = estimateRefs?.props;
    let taxName = '';
    const type =
        taxTypes && taxTypes.filter(val => val.fullItem.id === tax.tax_type_id);

    if (type.length > 0) {
        taxName = type[0]['fullItem'].name;
    }
    return taxName;
}

function getItemList(items) {
    if (isEmpty(items)) {
        return [];
    }

    const { currency } = estimateRefs?.state;

    return items.map(item => {
        let { name, description, price } = item;

        return {
            title: name,
            subtitle: {
                title: description
            },
            amount: price,
            currency,
            fullItem: item
        };
    });
}

const getTaxValue = tax => (tax * JSON.parse(subTotal())) / 100;

const totalAmount = () => subTotal() + estimateTax();

const finalAmount = () => totalAmount() + estimateCompoundTax();

export {
    estimateSubTotal,
    estimateTax,
    getTaxValue,
    estimateItemTotalTaxes,
    subTotal,
    totalAmount,
    getCompoundTaxValue,
    totalDiscount,
    estimateCompoundTax,
    finalAmount,
    getTaxName,
    getItemList
};
