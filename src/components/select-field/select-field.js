import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {change} from 'redux-form';
import t from 'locales/use-translation';
import {IProps, IStates} from './type.d';
import {headerTitle} from '@/styles';
import {SlideModal} from '../slide-modal';
import {hasValue, isEmpty} from '@/constants';
import {internalSearch as searchItem} from '@/utils';
import {ARROW_ICON} from '@/assets';
import {PaymentModeModal, UnitModal} from '../modal';
import {PermissionService} from '@/services';
import {commonSelector} from 'stores/common/selectors';
import {
  BaseButton,
  BaseButtonGroup,
  BaseMultiSelect,
  BaseSelect
} from '@/components';

export class SelectFieldComponent extends Component<IProps, IStates> {
  scrollViewReference: any;
  inputModelReference: any;

  constructor(props) {
    super(props);
    this.scrollViewReference = React.createRef();
    this.inputModelReference = React.createRef();
    this.state = this.initialState();
  }

  componentDidMount() {
    this.props.reference?.(this);
    this.setInitialState();
  }

  componentWillUnmount() {
    // this.props.reference?.(undefined);
  }

  initialState = () => {
    return {
      search: '',
      visible: false,
      values: '',
      selectedItems: [],
      oldItems: [],
      defaultItem: [],
      searchItems: []
    };
  };

  setInitialState = async () => {
    const {
      input: {value},
      compareField,
      items,
      selectedItem,
      displayName,
      concurrentMultiSelect
    } = this.props;

    if (selectedItem) {
      await this.setState({
        values: selectedItem[displayName],
        defaultItem: items || [],
        searchItems: items || []
      });
      return;
    }

    if (!value) {
      return;
    }

    let newValue = '';

    for (const key in items) {
      let field = items[key]['fullItem'][compareField];

      if (typeof field === 'string') {
        field = field.trim();
      }

      const isAvailable = hasValue(key) && field && field === value;

      if (isAvailable) {
        newValue = items[key]['fullItem'][displayName];
        break;
      }
    }
    concurrentMultiSelect &&
      (await this.setState({
        selectedItems: value,
        oldItems: value
      }));

    await this.setState({
      values: compareField ? newValue : value[displayName],
      defaultItem: items || [],
      searchItems: items || []
    });
  };

  onToggle = () => {
    const {
      meta,
      isEditable = true,
      input,
      hasPagination,
      apiSearch
    } = this.props;
    const {visible, defaultItem} = this.state;

    if (isEditable) {
      if (visible) this.setState({searchItems: defaultItem});

      this.setState(prevState => {
        return {visible: !prevState.visible};
      });

      if (!hasPagination || !apiSearch) {
        meta?.dispatch?.(change(meta.form, `search-${input?.name}`, ''));
      }
    }
  };

  changeDisplayValue = async item => {
    if (!hasValue(item)) {
      this.setState({values: null});
      return;
    }

    const {displayName} = this.props;
    this.setState({values: item[displayName]});
  };

  changeDisplayValueByUsingCompareField = async val => {
    const {compareField, displayName, items} = this.props;

    if (isEmpty(items)) {
      return;
    }

    for (const key in items) {
      if (items[key]['fullItem'][compareField] === val) {
        this.setState({
          values: items[key]['fullItem'][displayName]
        });
        break;
      }
    }
  };

  onItemSelect = item => {
    const {concurrentMultiSelect} = this.props;
    concurrentMultiSelect ? this.toggleItem(item) : this.getAlert(item);
  };

  toggleItem = async item => {
    const {compareField, valueCompareField} = this.props;

    const {selectedItems} = this.state;

    const newItem = [{...item, [valueCompareField]: item[compareField]}];

    if (selectedItems) {
      let hasSameItem = selectedItems.filter(
        val =>
          JSON.parse(val[valueCompareField]) === JSON.parse(item[compareField])
      );

      if (hasSameItem.length > 0) {
        const removedItems = selectedItems.filter(
          val =>
            JSON.parse(val[valueCompareField]) !==
            JSON.parse(item[compareField])
        );

        await this.setState({selectedItems: removedItems});
      } else {
        await this.setState({
          selectedItems: [...selectedItems, ...newItem]
        });
      }
    } else {
      await this.setState({selectedItems: newItem});
    }
  };

  getAlert = item => {
    const {
      displayName,
      input: {onChange, value},
      isMultiSelect,
      onlyPlaceholder,
      onSelect,
      compareField,
      valueCompareField
    } = this.props;

    if (isMultiSelect && value) {
      let hasSameItem = value.filter(
        val =>
          JSON.parse(val[valueCompareField]) === JSON.parse(item[compareField])
      );

      if (hasSameItem.length > 0) {
        this.onToggle();
        return;
      }
    }

    if (!onlyPlaceholder) {
      this.setState({values: item[displayName]});
    }

    if (!onSelect) {
      isMultiSelect
        ? onChange?.([
            ...value,
            ...[{...item, [valueCompareField]: item[compareField]}]
          ])
        : onChange?.(item);
    } else {
      onSelect(item);
    }

    this.onToggle();
  };

  onSearch = search => {
    this.setState({search});
    const {apiSearch, isInternalSearch} = this.props;

    apiSearch && !isInternalSearch
      ? this.searchPaginateItems(search)
      : this.internalSearch(search);
  };

  searchPaginateItems = search => {
    this.scrollViewReference?.getItems?.({
      queryString: {search},
      showLoader: true
    });
  };

  internalSearch = async search => {
    const {items, searchFields, isInternalSearch} = this.props;
    const {defaultItem} = this.state;

    const searchItems = isInternalSearch ? items : defaultItem;

    const newData = searchItem({
      items: searchItems,
      search,
      searchFields
    });

    await this.setState({searchItems: newData});
  };

  onSubmit = () => {
    const {input, onSubmitCallback} = this.props;
    const {selectedItems} = this.state;

    onSubmitCallback
      ? onSubmitCallback?.(selectedItems)
      : input?.onChange?.(selectedItems);

    this.setState({
      oldItems: selectedItems
    });

    this.onToggle();
  };

  onRightIconPress = () => {
    const {inputModalName, rightIconPress} = this.props;

    if (inputModalName) {
      this.toggleInputModal();
      return;
    }

    this.onToggle();
    setTimeout(() => rightIconPress?.(), 300);
    return;
  };

  onLeftIconPress = () => {
    const {input, onSubmitCallback, concurrentMultiSelect} = this.props;
    const {selectedItems} = this.state;

    if (concurrentMultiSelect) {
      onSubmitCallback
        ? onSubmitCallback?.(selectedItems)
        : input?.onChange?.(selectedItems);

      this.setState({oldItems: selectedItems});
    }

    this.onToggle();
  };

  toggleInputModal = () => {
    this.inputModelReference?.onToggle?.();
  };

  getEmptyTitle = () => {
    const {emptyContentProps} = this.props;
    const {search} = this.state;
    const emptyContentType = emptyContentProps?.contentType;
    let emptyTitle = '';

    if (emptyContentType) {
      emptyTitle = t(`${emptyContentType}.empty.title`);
    }

    let noSearchResult = t('search.no_search_result');

    return {
      title: search ? `${noSearchResult} "${search}"` : emptyTitle,
      description: t(`${emptyContentType}.empty.description`)
    };
  };

  getPaginationItems = () => {
    const {search} = this.state;

    this.scrollViewReference?.getItems?.({
      queryString: {search, ...this.props.queryString}
    });
  };

  inputModalComponent = name => {
    switch (name) {
      case 'PaymentModeModal':
        return (
          <PaymentModeModal
            reference={ref => (this.inputModelReference = ref)}
          />
        );

      case 'UnitModal':
        return (
          <UnitModal reference={ref => (this.inputModelReference = ref)} />
        );

      default:
        return null;
    }
  };

  render() {
    const {
      containerStyle,
      items,
      label,
      icon,
      placeholder,
      meta,
      headerProps,
      hasPagination,
      baseSelectProps,
      listViewProps,
      valueCompareField,
      compareField,
      concurrentMultiSelect,
      emptyContentProps,
      apiSearch,
      searchInputProps,
      input,
      input: {value},
      isRequired,
      isInternalSearch,
      getItems,
      paginationLimit,
      customView,
      inputModalName,
      createActionRouteName,
      isMultiSelect
    } = this.props;

    const {visible, search, values, selectedItems, searchItems} = this.state;

    let multiSelectProps = {};
    let bottomActionProps = {};

    if (concurrentMultiSelect) {
      multiSelectProps = {
        hasCheckbox: true,
        compareField,
        valueCompareField,
        checkedItems: selectedItems
      };
      bottomActionProps = {
        bottomAction: (
          <BaseButtonGroup>
            <BaseButton onPress={this.onSubmit}>{t('button.done')}</BaseButton>
          </BaseButtonGroup>
        )
      };
    }

    let internalSearchItem = isInternalSearch && !search ? items : searchItems;

    let infiniteScrollProps = {};
    if (apiSearch || hasPagination) {
      infiniteScrollProps = {
        getItems,
        reference: ref => (this.scrollViewReference = ref),
        getItemsInMount: false,
        onMount: this.getPaginationItems,
        hideLoader: !isEmpty(items),
        ...(paginationLimit && {paginationLimit}),
        ...this.props.infiniteScrollProps
      };
    }

    let layoutHeaderProps = {
      leftIcon: ARROW_ICON,
      leftIconPress: this.onLeftIconPress,
      withTitleStyle: headerTitle({}),
      placement: 'center',
      rightIcon: 'plus',
      hasCircle: false,
      noBorder: false,
      transparent: false,
      rightIconPress: () => this.onRightIconPress(),
      ...headerProps
    };

    if (
      createActionRouteName &&
      layoutHeaderProps?.rightIcon &&
      layoutHeaderProps?.rightIcon === 'plus' &&
      layoutHeaderProps?.rightIconPress
    ) {
      const isAllowToCreate = PermissionService.isAllowToCreate(
        createActionRouteName
      );

      if (!isAllowToCreate) {
        layoutHeaderProps = {
          ...layoutHeaderProps,
          rightIconPress: null
        };
      }
    }

    const listProps = {
      items: apiSearch ? items : internalSearchItem,
      onPress: this.onItemSelect,
      isEmpty: apiSearch ? isEmpty(items) : isEmpty(internalSearchItem),
      bottomDivider: true,
      emptyContentProps: {
        ...this.getEmptyTitle(),
        ...emptyContentProps
      },
      itemContainer: {paddingVertical: 16},
      ...listViewProps,
      ...multiSelectProps
    };

    const internalListScrollProps = {
      scrollViewProps: {
        contentContainerStyle: {
          flex: isEmpty(internalSearchItem) ? 1 : 0
        }
      }
    };

    let fieldView = null;

    if (customView) {
      fieldView = customView;
    } else if (isMultiSelect) {
      fieldView = (
        <BaseMultiSelect
          label={label}
          isRequired={isRequired}
          onChangeCallback={this.onToggle}
          containerStyle={containerStyle}
          meta={meta}
          rightIcon={'angle-down'}
          items={this.props.multiSelectedItems}
          displayName={this.props.displayName}
          {...baseSelectProps}
        />
      );
    } else {
      fieldView = (
        <BaseSelect
          label={label}
          icon={icon}
          isRequired={isRequired}
          values={value && (values || placeholder)}
          placeholder={placeholder}
          onChangeCallback={this.onToggle}
          containerStyle={containerStyle}
          meta={meta}
          rightIcon={'angle-down'}
          {...(baseSelectProps &&
            baseSelectProps?.description && {
              'description-class': 'mb-7 -mt-4'
            })}
          {...baseSelectProps}
        />
      );
    }

    return (
      <View style={{flex: 1}}>
        {fieldView}
        <SlideModal
          visible={visible}
          onToggle={this.onToggle}
          headerProps={layoutHeaderProps}
          searchInputProps={searchInputProps && searchInputProps}
          searchFieldProps={{name: `search-${input?.name}`}}
          onSearch={this.onSearch}
          bottomDivider
          {...bottomActionProps}
          listViewProps={listProps}
          infiniteScrollProps={infiniteScrollProps}
          isPagination={apiSearch || hasPagination}
          {...internalListScrollProps}
          customView={this.inputModalComponent(inputModalName)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => commonSelector(state);

export const SelectField = connect(mapStateToProps)(SelectFieldComponent);
