import React from 'react';
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
        ? formValues?.companies.map((company, i) => (
            <Field
              key={company?.id}
              name={`companies[${i}].role`}
              roles={roles}
              fetchRoles={fetchRoles}
              component={RoleSelectModal}
              rightIconPress={null}
              label={t('roles.select_role_for', {name: company.name})}
              company_id={company.id}
              onSelect={item => setFormField(`companies[${i}].role`, item.name)}
              disabled={disabled}
              placeholder={t('users.role_placeholder')}
              selectedItem={formValues?.companies[i]?.selectedRole}
            />
          ))
        : null}
    </>
  );
};
