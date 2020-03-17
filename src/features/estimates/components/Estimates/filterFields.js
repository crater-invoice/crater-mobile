import Lng from "../../../../api/lang/i18n"
import { IMAGES } from "../../../../config"
import { FILTER_ESTIMATE_STATUS } from "../../constants"

let selectedFromDate = ''
let selectedFromDateValue = ''
let selectedToDate = ''
let selectedToDateValue = ''

export default estimateFilterFields = ({ props, setFormField }) => {

    const {
        getCustomers,
        customers,
        language,
        navigation,
    } = props

    const selectFields = [
        {
            name: "customer_id",
            apiSearch: true,
            hasPagination: true,
            getItems: getCustomers,
            items: customers,
            displayName: "name",
            label: Lng.t("estimates.customer", { locale: language }),
            icon: 'user',
            placeholder: Lng.t("customers.placeholder", { locale: language }),
            navigation: navigation,
            compareField: "id",
            onSelect: (item) => setFormField('customer_id', item.id),
            headerProps: {
                title: Lng.t("customers.title", { locale: language }),
                rightIconPress: null
            },
            listViewProps: { hasAvatar: true },
            emptyContentProps: {
                contentType: "customers",
                image: IMAGES.EMPTY_CUSTOMERS,
            }
        }
    ]

    const datePickerFields = [
        {
            name: "from_date",
            label: Lng.t("estimates.fromDate", { locale: language }),
            onChangeCallback: (formDate, displayDate) => {
                selectedFromDate = displayDate,
                    selectedFromDateValue = formDate
            },
            selectedDate: selectedFromDate,
            selectedDateValue: selectedFromDateValue
        },
        {
            name: "to_date",
            label: Lng.t("estimates.toDate", { locale: language }),
            onChangeCallback: (formDate, displayDate) => {
                selectedToDate = displayDate,
                    selectedToDateValue = formDate
            },
            selectedDate: selectedToDate,
            selectedDateValue: selectedToDateValue
        }
    ]

    const inputFields = [{
        name: 'estimate_number',
        hint: Lng.t("estimates.estimateNumber", { locale: language }),
        inputProps: {
            autoCapitalize: 'none',
            autoCorrect: true,
        }
    }]

    const dropdownFields = [{
        name: "filterStatus",
        label: Lng.t("estimates.status", { locale: language }),
        fieldIcon: 'align-center',
        items: FILTER_ESTIMATE_STATUS,
        onChangeCallback: (val) => setFormField('filterStatus', val),
        defaultPickerOptions: {
            label: Lng.t("estimates.statusPlaceholder", { locale: language }),
            value: '',
        },
        containerStyle: { marginTop: 15 }
    }]

    return {
        selectFields,
        datePickerFields,
        inputFields,
        dropdownFields
    }
}

