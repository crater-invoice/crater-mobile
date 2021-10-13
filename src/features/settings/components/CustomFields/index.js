import React from 'react';
import {change} from 'redux-form';
import styles from './styles';
import {MainLayout, ListView, InfiniteScroll} from '@/components';
import {routes} from '@/navigation';
import t from 'locales/use-translation';
import {CUSTOM_FIELDS_FORM} from '../../constants';
import {ARROW_ICON} from '@/assets';

type IProps = {
  navigation: Object,
  getCustomFields: Function,
  customFields: Object,
  loading: Boolean
};

export class CustomFields extends React.Component<IProps> {
  constructor(props) {
    super(props);
    this.scrollViewReference = React.createRef();
    this.state = {search: ''};
  }

  componentDidMount() {
    this.onFocus();
  }

  componentWillUnmount() {
    this.focusListener?.remove?.();
  }

  onFocus = () => {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('focus', () => {
      this.scrollViewReference?.getItems?.();
    });
  };

  onSelect = field => {
    const {navigation} = this.props;
    navigation.navigate(routes.CUSTOM_FIELD, {
      id: field?.id,
      type: 'UPDATE',
      field
    });
  };

  setFormField = (field, value) => {
    this.props.dispatch(change(CUSTOM_FIELDS_FORM, field, value));
  };

  onSearch = search => {
    this.setState({search});
    this.scrollViewReference?.getItems?.({
      queryString: {search},
      showLoader: true
    });
  };

  render() {
    const {navigation, customFields, getCustomFields, route} = this.props;
    const {search} = this.state;
    const isEmpty = customFields && customFields.length <= 0;

    const emptyTitle = search ? 'search.noResult' : 'customFields.empty.title';

    const emptyContentProps = {
      title: t(emptyTitle, {search}),
      ...(!search && {
        description: t('customFields.empty.description'),
        buttonTitle: t('customFields.empty.buttonTitle'),
        buttonPress: () => {
          navigation.navigate(routes.CUSTOM_FIELD, {
            type: 'ADD'
          });
        }
      })
    };

    const headerProps = {
      title: t('header.customFields'),
      route,
      leftIcon: ARROW_ICON,
      leftIconPress: () => navigation.goBack(null),
      titleSize: 'medium',
      rightIcon: 'plus',
      placement: 'center',
      rightIconPress: () => {
        navigation.navigate(routes.CUSTOM_FIELD, {
          type: 'ADD'
        });
      }
    };

    return (
      <MainLayout
        headerProps={headerProps}
        onSearch={this.onSearch}
        bottomDivider
      >
        <InfiniteScroll
          getItems={getCustomFields}
          reference={ref => (this.scrollViewReference = ref)}
          getItemsInMount={false}
        >
          <ListView
            items={customFields}
            onPress={this.onSelect}
            isEmpty={isEmpty}
            bottomDivider
            emptyContentProps={emptyContentProps}
            leftTitleStyle={styles.leftTitleText}
            leftSubTitleLabelStyle={styles.leftSubTitleText}
            leftSubTitleContainerStyle={styles.leftTitleContainer}
            rightTitleStyle={styles.rightTitleText}
            route={route}
            isAnimated
          />
        </InfiniteScroll>
      </MainLayout>
    );
  }
}
