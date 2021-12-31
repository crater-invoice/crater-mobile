import React from 'react';
import {DefaultLayout, RadioButtonGroup} from '@/components';
import {Field, initialize} from 'redux-form';
import t from 'locales/use-translation';
import {TAXATION_FORM} from 'stores/taxation/types';
import {IProps, IStates} from './taxation-type.d';
import {updateTaxationType, fetchTaxation} from 'stores/taxation/actions';
import {TAXATION_OPTION} from 'stores/taxation/helper';

export default class Taxation extends React.Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.state = {isFetchingInitialData: true};
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const {dispatch} = this.props;
    dispatch(fetchTaxation(this.setInitialData));
  };

  setInitialData = res => {
    const {dispatch} = this.props;
    // dispatch(initialize(TAXATION_FORM, res));
    this.setState({isFetchingInitialData: false});
  };

  setTaxationType = type => {
    const {
      isSaving,
      dispatch,
      formValues: {taxation_type}
    } = this.props;

    if (type === taxation_type || isSaving) {
      return;
    }
    dispatch(updateTaxationType({type}));
  };

  render() {
    const {navigation, theme} = this.props;
    const {isFetchingInitialData} = this.state;

    const headerProps = {
      leftIconPress: () => navigation.goBack(),
      title: t('header.taxation'),
      placement: 'center'
    };

    return (
      <DefaultLayout
        headerProps={headerProps}
        loadingProps={{is: isFetchingInitialData}}
      >
        <Field
          name="taxation_type"
          component={RadioButtonGroup}
          hint={t('taxation.type')}
          options={TAXATION_OPTION}
          theme={theme}
          onChangeCallback={this.setTaxationType}
          isList
        />
      </DefaultLayout>
    );
  }
}
