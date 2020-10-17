// @flow

export type IProps = {

    loading: Boolean,
    apiSearch: Boolean,
    concurrentMultiSelect: Boolean,
    isRequired: Boolean,
    pagination: Boolean,
    isMultiSelect: Boolean,
    isInternalSearch: Boolean,
    hasPagination: Boolean,

    onChangeCallback: Function,
    getItem: Function,
    onSearch: Function,
    getItems: Function,
    rightIconPress: Function,
    onSelect: Function,

    label: String,
    icon: String,
    placeholder: String,
    rightIcon: String,
    leftIcon: String,
    color: String,
    value: String,
    displayName: String,
    emptyContentImage: String,
    compareField: String,
    valueCompareField: String,
    locale: String,

    containerStyle: Object,
    meta: Object,
    headerProps: Object,
    input: Object,
    fakeInputProps: Object,
    onlyPlaceholder: Object,
    listViewProps: Object,
    searchInputProps: Object,
    input: Object,
    emptyContentProps: Object,

    items: Array,
    searchFields: Array

};
