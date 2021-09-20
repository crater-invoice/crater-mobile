import React, {Component} from 'react';
import {MainLayout, ListView, InfiniteScroll} from '@/components';
import t from 'locales/use-translation';
import {routes} from '@/navigation';
import {formatNotes} from '@/utils';
import {ARROW_ICON} from '@/assets';
import {defineSize} from '@/constants';
import {fonts} from '@/styles';

type IProps = {
  navigation: Object,
  expenses: Object,
  getNotes: Function,
  notes: any
};

export default class Notes extends Component<IProps> {
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

  onSelect = note => {
    const {navigation} = this.props;

    navigation.navigate(routes.NOTE, {type: 'UPDATE', note});
  };

  onSearch = search => {
    this.setState({search});

    this.scrollViewReference?.getItems?.({
      queryString: {search},
      showLoader: true
    });
  };

  render() {
    const {navigation, notes, getNotes} = this.props;

    const {search} = this.state;
    const isEmpty = notes && notes.length <= 0;

    const emptyTitle = search ? 'search.noResult' : 'notes.empty.title';
    const emptyContentProps = {
      title: t(emptyTitle, {search}),
      ...(!search && {
        description: t('notes.empty.description'),
        buttonTitle: t('notes.empty.buttonTitle'),
        buttonPress: () => {
          navigation.navigate(routes.NOTE, {
            type: 'ADD'
          });
        }
      })
    };

    const headerProps = {
      title: t('header.notes'),
      navigation,
      leftIcon: ARROW_ICON,
      leftIconPress: () => navigation.navigate(routes.SETTING_LIST),
      placement: 'center',
      rightIcon: 'plus',
      rightIconPress: () =>
        navigation.navigate(routes.NOTE, {
          type: 'ADD'
        })
    };

    return (
      <MainLayout
        headerProps={headerProps}
        onSearch={this.onSearch}
        bottomDivider
        bodyStyle="is-full-listView"
      >
        <InfiniteScroll
          getItems={getNotes}
          reference={ref => (this.scrollViewReference = ref)}
          getItemsInMount={false}
          paginationLimit={defineSize(15, 15, 15, 20)}
        >
          <ListView
            items={formatNotes(notes)}
            onPress={this.onSelect}
            isEmpty={isEmpty}
            contentContainerStyle={{flex: 1}}
            bottomDivider
            emptyContentProps={emptyContentProps}
            leftSubTitleStyle={{textAlign: 'justify'}}
            rightTitleStyle={{fontFamily: fonts.regular}}
            navigation={navigation}
            isAnimated
          />
        </InfiniteScroll>
      </MainLayout>
    );
  }
}
