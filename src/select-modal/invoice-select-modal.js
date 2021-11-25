import React from 'react';
import {SelectField} from '@/components';
import t from 'locales/use-translation';
import {hasObjectLength, isEmpty} from '@/constants';

interface IProps {
  /**
   * An array of objects with data for each invoice.
   */
  invoices?: Array<any>;

  /**
   * An action to return a list of invoice.
   */
  getInvoices?: () => void;

  /**
   * Is allowed to edit.
   */
  disabled?: boolean;

  /**
   * Description shown below Fake-input.
   */
  description?: String;
}

export const InvoiceSelectModal = (props: IProps) => {
  const {getInvoices, disabled, description} = props;
  const invoices = isEmpty(props?.invoices)
    ? []
    : props.invoices.filter(invoice => hasObjectLength(invoice));

  return (
    <SelectField
      placeholder=" "
      {...props}
      items={isEmpty(invoices) ? [] : invoices}
      getItems={getInvoices}
      apiSearch
      hasPagination
      displayName="invoice_number"
      label={t('payments.invoice')}
      icon="align-center"
      placeholder={t('payments.invoice_placeholder')}
      compareField="id"
      headerProps={{title: t('invoices.title'), rightIconPress: null}}
      emptyContentProps={{contentType: 'invoices'}}
      isEditable={!disabled}
      baseSelectProps={{disabled, description}}
    />
  );
};
