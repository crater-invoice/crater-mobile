import React from 'react';
import styles from './notification-styles';
import {DefaultLayout, BaseInput, BaseSwitch, BaseDivider} from '@/components';
import {Field, initialize} from 'redux-form';
import t from 'locales/use-translation';
import {keyboardType} from '@/helpers/keyboard';
import {NOTIFICATION_FORM} from 'stores/setting/types';
import {isBooleanTrue} from '@/constants';
import {IProps, IStates} from './notification-type.d';
import {
  fetchCompanySettings,
  updateCompanySettings
} from 'stores/company/actions';

export default class Notification extends React.Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.state = {isFetchingInitialData: true};
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const {dispatch} = this.props;

    const NOTIFICATION_SETTING = [
      'notify_invoice_viewed',
      'notify_estimate_viewed',
      'notification_email'
    ];

    dispatch(fetchCompanySettings(NOTIFICATION_SETTING, this.setInitialData));
  };

  setInitialData = res => {
    const {dispatch} = this.props;
    const data = {
      ...res,
      notify_invoice_viewed: isBooleanTrue(res.notify_invoice_viewed),
      notify_estimate_viewed: isBooleanTrue(res.notify_estimate_viewed)
    };
    dispatch(initialize(NOTIFICATION_FORM, data));
    this.setState({isFetchingInitialData: false});
  };

  onSave = ({notification_email}) => {
    if (this.state.isFetchingInitialData) {
      return;
    }

    const {dispatch, navigation} = this.props;
    dispatch(updateCompanySettings({notification_email}, navigation));
  };

  setInvoiceViewed = status => {
    const {dispatch} = this.props;
    dispatch(
      updateCompanySettings({
        notify_invoice_viewed: status === true ? 'YES' : 'NO'
      })
    );
  };

  setEstimateViewed = status => {
    const {dispatch} = this.props;
    dispatch(
      updateCompanySettings({
        notify_estimate_viewed: status === true ? 'YES' : 'NO'
      })
    );
  };

  render() {
    const {navigation, handleSubmit} = this.props;
    const {isFetchingInitialData} = this.state;

    const headerProps = {
      leftIconPress: () => navigation.goBack(),
      title: t('header.notifications'),
      placement: 'center',
      rightIcon: 'save',
      rightIconProps: {solid: true},
      rightIconPress: handleSubmit(this.onSave)
    };

    return (
      <DefaultLayout
        headerProps={headerProps}
        loadingProps={{is: isFetchingInitialData}}
      >
        <Field
          name={'notification_email'}
          component={BaseInput}
          hint={t('settings.notifications.send')}
          keyboardType={keyboardType.EMAIL}
          leftIcon="envelope"
          leftIconSolid={true}
          isRequired
        />

        <BaseDivider dividerStyle={styles.dividerLine} />

        <Field
          name="notify_invoice_viewed"
          component={BaseSwitch}
          hint={t('settings.notifications.invoice_viewed')}
          description={t('settings.notifications.invoice_viewed_description')}
          onChangeCallback={val => this.setInvoiceViewed(val)}
        />

        <Field
          name="notify_estimate_viewed"
          component={BaseSwitch}
          hint={t('settings.notifications.estimate_viewed')}
          description={t('settings.notifications.estimate_viewed_description')}
          onChangeCallback={val => this.setEstimateViewed(val)}
          mainContainerStyle={{marginTop: 12}}
        />
      </DefaultLayout>
    );
  }
}
