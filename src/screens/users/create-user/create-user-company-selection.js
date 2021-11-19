import React from 'react';
import {View, Text} from '@/components';
import {Field} from 'redux-form';
import {find} from 'lodash';
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

  const onSelectCompanies = companies => {
    const data = companies.map(company => {
      return {
        ...company,
        ...find(formValues?.companies, {id: company.id})
      };
    });
    setFormField('companies', data);
  };

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
        onSubmitCallback={onSelectCompanies}
      />

      {!isEmpty(formValues?.companies)
        ? formValues?.companies.map((company, i) => {
            return (
              <View class="flex-row items-center py-3" key={i}>
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
                  company_id={company.id}
                  onSelect={item =>
                    setFormField(`companies[${i}].role`, item.name)
                  }
                  disabled={disabled}
                  placeholder={t('users.role_placeholder')}
                  selectedItem={formValues?.companies[i]?.selectedRole}
                />
              </View>
            );
          })
        : null}
    </>
  );
};
