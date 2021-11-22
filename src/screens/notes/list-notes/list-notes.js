import React from 'react';
import {routes} from '@/navigation';
import {IProps, IStates} from './list-notes-type.d';
import {isEmpty} from '@/constants';
import {primaryHeader} from '@/utils';
import {fetchNotes} from 'stores/note/actions';
import {fontSizes} from '@/styles';
import {
  MainLayout,
  ListView,
  InfiniteScroll,
  BaseEmptyPlaceholder
} from '@/components';

export default class Notes extends React.Component<IProps, IStates> {
  scrollViewReference: any;
  focusListener: any;

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

  onSearch = search => {
    this.setState({search});
    this.scrollViewReference?.getItems?.({
      queryString: {search},
      showLoader: true
    });
  };

  onSelect = note => {
    const {navigation} = this.props;
    navigation.navigate(routes.CREATE_NOTE, {
      type: 'UPDATE',
      id: note.id
    });
  };

  render() {
    const {notes, dispatch, route} = this.props;
    const {search} = this.state;

    return (
      <MainLayout
        headerProps={primaryHeader({route})}
        onSearch={this.onSearch}
        bottomDivider
        bodyStyle="is-full-listView"
      >
        <InfiniteScroll
          getItems={q => dispatch(fetchNotes(q))}
          reference={ref => (this.scrollViewReference = ref)}
          getItemsInMount={false}
        >
          <ListView
            isAnimated
            bottomDivider
            items={notes}
            onPress={this.onSelect}
            isEmpty={isEmpty(notes)}
            contentContainerStyle={{flex: 2.5}}
            leftSubTitleStyle={{textAlign: 'justify'}}
            rightTitleStyle={{fontSize: fontSizes.h4}}
            emptyPlaceholder={
              <BaseEmptyPlaceholder {...this.props} search={search} />
            }
          />
        </InfiniteScroll>
      </MainLayout>
    );
  }
}
