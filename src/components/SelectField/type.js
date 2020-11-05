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
    displayName: any,
    emptyContentImage: String,
    compareField: any,
    valueCompareField: any,
    locale: String,

    containerStyle: any,
    meta: any,
    headerProps: any,
    input: any,
    fakeInputProps: any,
    onlyPlaceholder: any,
    listViewProps: any,
    searchInputProps: any,
    hasFirstItem: Boolean,
    emptyContentProps: any,

    items: Array,
    searchFields: Array,
    isEditable: Boolean,
    isCompareField: Boolean,
    reference: any,
    queryString: Object,
    paginationLimit: Number,
    customView: any
};

export type IStates = {
    search: String,
    visible: Boolean,
    values: String,
    selectedItems: Array<any>,
    oldItems: Array<any>,
    defaultItem: Array<any>,
    searchItems: Array<any>,
    oldValue: String
};
