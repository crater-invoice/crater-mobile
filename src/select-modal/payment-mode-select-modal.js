import React from 'react';
import {SelectField} from '@/components';
import t from 'locales/use-translation';
import {routes} from '@/navigation';

interface IProps {
  /**
   * An array of objects with data for each payment-mode.
   */
  paymentModes?: Array<any>;

  /**
   * An action to return a list of payment-mode.
   */
  fetchPaymentModes?: () => void;

  /**
   * Is allowed to edit.
   */
  disabled?: boolean;
}

export const PaymentModeSelectModal = (props: IProps) => {
  const {paymentModes, fetchPaymentModes, disabled} = props;

  return (
    <SelectField
      {...props}
      items={paymentModes ?? []}
      apiSearch
      hasPagination
      getItems={fetchPaymentModes}
      displayName="name"
      label={t('payments.mode')}
      icon="align-center"
      placeholder={t('payments.mode_placeholder')}
      compareField="id"
      headerProps={{title: t('payments.mode_placeholder')}}
      emptyContentProps={{contentType: 'payment_modes'}}
      inputModalName="PaymentModeModal"
      isEditable={!disabled}
      baseSelectProps={{disabled}}
    />
  );
};
