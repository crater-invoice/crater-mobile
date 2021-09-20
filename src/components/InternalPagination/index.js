import React, {Component} from 'react';
import {View, Modal} from 'react-native';
import {connect} from 'react-redux';
import {change} from 'redux-form';
import t from 'locales/use-translation';
import {IProps, IStates} from './type';
import {headerTitle} from '@/styles';
import styles from './styles';
import {SlideModal} from '../SlideModal';
import {FakeInput} from '../FakeInput';
import {CtButton} from '../Button';
import {hasValue, isAndroidPlatform, isEmpty} from '@/constants';
import {internalSearch as searchItem} from '@/utils';
import {ARROW_ICON} from '@/assets';
import {PaymentModeModal, UnitModal} from '../Modal';
import {PermissionService} from '@/services';
import {commonSelector} from 'stores/common/selectors';

export class InternalPaginationComponent extends Component<IProps, IStates> {
  scrollViewReference: any;
  inputModelReference: any;

  constructor(props) {
    super(props);
    this.scrollViewReference = React.createRef();
    this.inputModelReference = React.createRef();
    this.state = this.initialState();
    this.offset = 0;
  }

  componentDidMount() {
    this.props.reference?.(this);
    this.setInitialState();
  }

  componentWillUnmount() {
    this.props.reference?.(undefined);
  }

  initialState = () => {
    return {
      search: '',
      visible: false,
      values: '',
      selectedItems: [],
      oldItems: [],
      defaultItem: [],
      searchItems: [],
      itemList: []
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
      if (hasValue(key) && items[key]['fullItem'][compareField] === value) {
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
        meta.dispatch(change(meta.form, `search-${input?.name}`, ''));
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
        ? onChange([
            ...value,
            ...[{...item, [valueCompareField]: item[compareField]}]
          ])
        : onChange(item);
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
    const {
      input: {onChange, value}
    } = this.props;

    const {selectedItems} = this.state;

    onChange(selectedItems);

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

    let noSearchResult = t('search.noSearchResult');

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

  BOTTOM_ACTION = () => (
    <View style={styles.submitButton}>
      <View style={{flex: 1}}>
        <CtButton
          onPress={this.onSubmit}
          btnTitle={t('button.done')}
          containerStyle={styles.handleBtn}
        />
      </View>
    </View>
  );
  getItems = () => {
    if (this.offset < Math.ceil(this.props.items.length / 15)) {
      const itemsListOld = this.props.items;
      const itemsList = itemsListOld.slice(
        this.offset * 16,
        (this.offset + 1) * 16 - 1
      );
      const listOld = this.state.itemList;
      this.setState({itemList: [...listOld, ...itemsList]});
      this.offset = this.offset + 1;
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
      fakeInputProps,
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
      paginationLimit,
      customView,
      inputModalName,
      createActionRouteName
    } = this.props;
    const {
      visible,
      search,
      values,
      selectedItems,
      searchItems,
      itemList
    } = this.state;
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
        bottomAction: this.BOTTOM_ACTION()
      };
    }

    let infiniteScrollProps = {
      getItems: this.getItems(),
      reference: ref => (this.scrollViewReference = ref),
      hideLoader: !isEmpty(items)
    };

    let layoutHeaderProps = {
      leftIcon: ARROW_ICON,
      leftIconPress: () => this.onToggle(),
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
    console.log('itemList', itemList.length);
    const listProps = {
      items: itemList,
      isEmpty: isEmpty(itemList),
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
          flex: isEmpty(itemList) ? 1 : 0
        }
      }
    };

    let fieldView = !customView ? (
      <FakeInput
        label={label}
        icon={icon}
        isRequired={isRequired}
        values={value && (values || placeholder)}
        placeholder={placeholder}
        onChangeCallback={this.onToggle}
        containerStyle={containerStyle}
        meta={meta}
        rightIcon={'angle-down'}
        {...fakeInputProps}
      />
    ) : (
      customView
    );

    return (
      <View style={styles.container}>
        {fieldView}
        <Modal
          animationType="slide"
          visible={visible}
          onRequestClose={this.onToggle}
          hardwareAccelerated={true}
          statusBarTranslucent={true}
        >
          <View style={styles.modalContainer}>
            <MainLayout
              headerProps={{
                ...layoutHeaderProps,
                ...(isAndroidPlatform && {
                  containerStyle: styles.header
                })
              }}
              onSearch={this.onSearch}
              bottomDivider
              bottomAction={this.BOTTOM_ACTION()}
              inputProps={searchInputProps && searchInputProps}
              searchFieldProps={{
                name: `search-${input?.name}`,
                ...(theme?.mode === 'dark' && {
                  inputContainerStyle: {
                    height: 38
                  },
                  inputFieldStyle: {
                    marginTop: 10,
                    marginBottom: 14
                  }
                })
              }}
              searchFieldStyle={styles.searchView}
            >
              <ScrollView
                style={[styles.container, style]}
                contentContainerStyle={[{flexGrow: 1}, contentContainerStyle]}
                scrollEventThrottle={400}
                refreshControl={refreshControl}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                onScroll={({nativeEvent}) => {
                  if (isScrollToEnd(nativeEvent) && !loading && !refreshing) {
                    this.getItems({fresh: false});
                  }
                }}
              >
                <Content loadingProps={loadingProps} theme={theme}>
                  {!isEmpty ? (
                    children
                  ) : (
                    <Empty {...emptyContentProps} theme={theme} />
                  )}

                  {!loading && !refreshing && isMore && loader}
                </Content>
              </ScrollView>
            </MainLayout>
          </View>
        </Modal>
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

const mapStateToProps = state => ({
  ...commonSelector(state)
});

export const InternalPagination = connect(mapStateToProps)(
  InternalPaginationComponent
);
