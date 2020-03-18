import Lng from "../../../../api/lang/i18n"

let selectedFromDate = ''
let selectedFromDateValue = ''
let selectedToDate = ''
let selectedToDateValue = ''

export default expenseFilterFields = ({ props, state, setFormField }) => {

    const { language, categories } = props
    const { selectedCategory } = state

    const dropdownFields = [{
        name: "expense_category_id",
        label: Lng.t("expenses.category", { locale: language }),
        fieldIcon: 'align-center',
        items: categories,
        onChangeCallback: (val) => setFormField('expense_category_id', val),
        defaultPickerOptions: {
            label: Lng.t("expenses.categoryPlaceholder", { locale: language }),
            value: '',
        },
        selectedItem: selectedCategory,
        containerStyle: { marginTop: 15 }
    }]

    const datePickerFields = [
        {
            name: "from_date",
            label: Lng.t("expenses.fromDate", { locale: language }),
            onChangeCallback: (formDate, displayDate) => {
                selectedFromDate = displayDate,
                    selectedFromDateValue = formDate
            },
            selectedDate: selectedFromDate,
            selectedDateValue: selectedFromDateValue
        },
        {
            name: "to_date",
            label: Lng.t("expenses.toDate", { locale: language }),
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

