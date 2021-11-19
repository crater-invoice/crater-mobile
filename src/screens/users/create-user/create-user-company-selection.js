import React from 'react';
import {View, Text} from '@/components';
import {Field} from 'redux-form';
import {CompanySelectModal, RoleSelectModal} from '@/select-modal';
import t from 'locales/use-translation';
import {isEmpty} from '@/constants';

export default props => {
  const {
    companies,
    theme,
    roles,
    fetchRoles,
    formValues,
    setFormField,
    disabled
  } = props;

  return (
    <>
      <Field
        name="companies"
        companies={companies.map(c => ({title: c.name, fullItem: c}))}
        component={CompanySelectModal}
        multiSelectedItems={formValues?.companies}
        theme={theme}
        disabled={disabled}
        formValues={formValues}
      />

      {!isEmpty(formValues?.companies)
        ? formValues?.companies.map((company, i) => {
            return (
              <View class="flex-row items-center py-10" key={i}>
                <View class="flex-1">
                  <View justify-center>
                    <View flex-row items-center>
                      <Text h4 pl-2 pr-14 color={theme.header.primary.color}>
                        {company.name}
                      </Text>
                    </View>
                  </View>
                </View>

                <Field
                  name={`companies[${i}].role`}
                  roles={roles}
                  fetchRoles={fetchRoles}
                  component={RoleSelectModal}
                  rightIconPress={null}
                  onSelect={item =>
                    setFormField(`companies[${i}].role`, item.name)
                  }
                  disabled={disabled}
                  placeholder={formValues?.role ?? t('users.role_placeholder')}
                  selectedItem={formValues?.role}
                />
              </View>
            );
          })
        : null}
    </>
  );
};
