import React from 'react';
import {TouchableOpacity} from 'react-native';
import {SelectField, View} from '@/components';
import {routes} from '@/navigation';
import t from 'locales/use-translation';
import {Text} from '@/components';
import {ITheme} from '@/interfaces';

interface IProps {
  /**
   * An array of objects with data for each tax.
   */
  taxTypes?: Array<any>;

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
      input={{value: null}}
      baseSelectProps={{
        disabled,
        ...(props['custom-view']
          ? {
              customView: ({props}) => (
                <View class="flex-row">
                  <View style={{flex: 0.9}} />
                  <TouchableOpacity
                    onPress={() => props?.onChangeCallback?.()}
                    activeOpacity={0.5}
                    style={{flex: 0.5}}
                  >
                    <Text right medium h4 color={theme?.viewLabel?.thirdColor}>
                      {t('estimates.taxPlaceholder')}
                    </Text>
                  </TouchableOpacity>
                </View>
              )
            }
          : {
              label: t('items.taxes'),
              placeholder: t('items.selectTax'),
              icon: 'percent',
              leftIconProps: {
                size: 14,
                style: {paddingLeft: 19}
              }
            })
      }}
    />
  );
};
