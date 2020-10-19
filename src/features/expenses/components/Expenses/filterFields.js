import Lng from '@/lang/i18n';

let selectedFromDate = ''
let selectedFromDateValue = ''
let selectedToDate = ''
let selectedToDateValue = ''

export default expenseFilterFields = ({ props, state, setFormField }) => {

    const { locale, categories } = props
    const { selectedCategory } = state

    const dropdownFields = [{
        name: "expense_category_id",
        label: Lng.t("expenses.category", { locale }),
        fieldIcon: 'align-center',
        items: categories,
        onChangeCallback: (val) => setFormField('expense_category_id', val),
        defaultPickerOptions: {
            label: Lng.t("expenses.categoryPlaceholder", { locale }),
            value: '',
        },
        selectedItem: selectedCategory,
        containerStyle: { marginTop: 15 }
    }]

    const datePickerFields = [
        {
            name: "from_date",
            label: Lng.t("expenses.fromDate", { locale }),
            onChangeCallback: (formDate, displayDate) => {
                selectedFromDate = displayDate,
                    selectedFromDateValue = formDate
            },
            selectedDate: selectedFromDate,
            selectedDateValue: selectedFromDateValue
        },
        {
            name: "to_date",
            label: Lng.t("expenses.toDate", { locale }),
            onChangeCallback: (formDate, displayDate) => {
                selectedToDate = displayDate,
                    selectedToDateValue = formDate
            },
            selectedDate: selectedToDate,
            selectedDateValue: selectedToDateValue
        }
    ]

    return {
        dropdownFields,
        datePickerFields
    }
}

