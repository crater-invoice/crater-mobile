import React from 'react';
import {SelectField} from '@/components';
import {routes} from '@/navigation';
import t from 'locales/use-translation';
import {Text} from '@/components';
import {ITheme} from '@/interfaces';

interface IProps {
  /**
   * An array of objects with data for each tax.
   */
  taxTypes?: Array;

  /**
   * An action to return a list of tax.
   */
  getTaxes?: () => void;

  /**
   * Is allowed to edit.
   */
  disabled?: Boolean;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;
}

export const TaxSelectModal = (props: IProps) => {
  const {taxTypes, getTaxes, disabled = false, theme} = props;
  return (
    <SelectField
      {...props}
      items={taxTypes ?? []}
      getItems={getTaxes}
      apiSearch
      hasPagination
      isMultiSelect
      concurrentMultiSelect
      onlyPlaceholder
      compareField="id"
      valueCompareField="tax_type_id"
      headerProps={{title: t('taxes.title')}}
      displayName="name"
      createActionRouteName={routes.TAXES}
      listViewProps={{contentContainerStyle: {flex: 2}}}
      emptyContentProps={{contentType: 'taxes'}}
      isEditable={!disabled}
      fakeInputProps={{
        disabled,
        fakeInput: (
          <Text right medium h4 color={theme?.viewLabel?.thirdColor}>
            {t('estimates.taxPlaceholder')}
          </Text>
        )
      }}
    />
  );
};
