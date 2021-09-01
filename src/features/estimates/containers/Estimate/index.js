import { connect } from 'react-redux';
import { find } from 'lodash';
import { Estimate } from '../../components/Estimate';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as actions from '../../actions';
import { ESTIMATE_FORM } from '../../constants';
import moment from 'moment';
import { getTaxes, getNotes } from '@/features/settings/actions';
import { isArray } from '@/constants';
import { getCustomers } from '@/features/customers/actions';
import { commonSelector, permissionSelector } from 'stores/common/selectors';

const getSelectedTemplate = (templates, form, isEditScreen) => {
    if (!isEditScreen) {
        return templates?.[0]?.name;
    }

    if (form?.template_name) {
        return form?.template_name;
    }

    return find(templates, { id: form?.estimate_template_id })?.name;
};

const mapStateToProps = (state, { navigation }) => {
    const {
        global: { taxTypes, currency },
        estimates: { loading, estimateItems, estimateData, items },
        customers: { customers },
        settings: { notes, customFields }
    } = state;

    const {
        estimate = null,
        estimateTemplates,
        estimate_notes = ''
    } = estimateData;

    const id = navigation.getParam('id');
    const permissions = permissionSelector(navigation);
    const isEditScreen = permissions.isEditScreen;

    const isLoading =
        loading?.initEstimateLoading ||
        (isEditScreen && !estimate) ||
        !isArray(estimateTemplates);

    return {
        initLoading: isLoading,
        loading: loading?.estimateLoading,
        withLoading:
            loading?.changeStatusLoading || loading?.removeEstimateLoading,
        estimateItems,
        estimateData,
        items,
        notes,
        customers,
        itemsLoading: loading?.itemsLoading,
        formValues: getFormValues(ESTIMATE_FORM)(state) || {},
        taxTypes,
        customFields,
        id,
        currency,
        ...permissions,
        ...commonSelector(state),
        initialValues: !isLoading
            ? {
                  expiry_date: moment().add(7, 'days'),
                  estimate_date: moment(),
                  discount_type: 'fixed',
                  discount: 0,
                  taxes: [],
                  template_name: getSelectedTemplate(
                      estimateTemplates,
                      estimate,
                      isEditScreen
                  ),
                  notes: estimate_notes,
                  ...estimate,
                  estimate_number: isEditScreen
                      ? estimateData?.nextEstimateNumber
                      : estimateData?.nextNumber,
                  prefix: isEditScreen
                      ? estimateData?.estimatePrefix
                      : estimateData?.prefix,
                  customer: estimate?.user,
                  template: estimate?.estimate_template
              }
            : null
    };
};

const mapDispatchToProps = {
    ...actions,
    getCustomers,
    getTaxes,
    getNotes
};

const addEstimateReduxForm = reduxForm({
    form: ESTIMATE_FORM,
    validate
})(Estimate);

const EstimateContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(addEstimateReduxForm);

EstimateContainer.navigationOptions = () => ({
    header: null
});

export default EstimateContainer;
