import React from 'react';
import styles from './styles';
import {DefaultLayout, InputField, BaseSwitch, BaseDivider} from '@/components';
import {Field, change} from 'redux-form';
import t from 'locales/use-translation';
import {NOTIFICATION} from '../../constants';
import {keyboardType} from '@/constants';

type IProps = {
  navigation: Object,
  handleSubmit: () => void,
  getAccountLoading: boolean
};
export class Notification extends React.Component<IProps> {
  constructor(props) {
    super(props);

    this.state = {
      invoiceStatus: null,
      estimateStatus: null,
      email: ''
    };
  }

  componentWillMount() {
    const {getSettingItem} = this.props;

    getSettingItem({
      onResult: val => {
        this.setFormField('notification_email', val.notification_email);
        this.setFormField(
          'notify_invoice_viewed',
          val.notify_invoice_viewed === 'YES' || val.notify_invoice_viewe === 1
            ? true
            : false
        );
        this.setFormField(
          'notify_estimate_viewed',
          val.notify_estimate_viewed === 'YES' ||
            val.notify_estimate_viewed === 1
            ? true
            : false
        );
        this.setState({invoiceStatus: val !== null ? val : 'NO'});
        this.setState({estimateStatus: val !== null ? val : 'NO'});
        this.setState({email: val !== null ? val : ''});
      }
    });
  }

  setFormField = (field, value) => {
    this.props.dispatch(change(NOTIFICATION, field, value));
  };

  onNotificationSubmit = ({notification_email}) => {
    const {editSettingItem, navigation} = this.props;
    const settings = {
      notification_email: notification_email
    };
    editSettingItem({params: {settings}, navigation});
  };

  invoiceStatus = status => {
    const {editSettingItem} = this.props;
    const settings = {notify_invoice_viewed: status === true ? 'YES' : 'NO'};
    editSettingItem({params: {settings}});
  };

  estimateStatus = status => {
    const {editSettingItem} = this.props;
    const settings = {notify_estimate_viewed: status === true ? 'YES' : 'NO'};
    editSettingItem({params: {settings}});
  };

  render() {
    const {navigation, handleSubmit, getSettingItemLoading} = this.props;

    const {invoiceStatus, estimateStatus, email} = this.state;

    return (
      <DefaultLayout
        headerProps={{
          leftIconPress: () => navigation.goBack(null),
          title: t('header.notifications'),
          placement: 'center',
          rightIcon: 'save',
          rightIconProps: {
            solid: true
          },
          rightIconPress: handleSubmit(this.onNotificationSubmit)
        }}
        loadingProps={{
          is:
            getSettingItemLoading ||
            invoiceStatus === null ||
            estimateStatus === null ||
            email === null
        }}
      >
        <Field
          name={'notification_email'}
          component={InputField}
          hint={t('settings.notifications.send')}
          keyboardType={keyboardType.EMAIL}
          leftIcon={'envelope'}
          leftIconSolid={true}
          isRequired
        />

        <BaseDivider dividerStyle={styles.dividerLine} />

        <Field
          name="notify_invoice_viewed"
          component={BaseSwitch}
          status={invoiceStatus === 'YES' ? true : false}
          hint={t('settings.notifications.invoice_viewed')}
          description={t('settings.notifications.invoice_viewed_description')}
          onChangeCallback={val => this.invoiceStatus(val)}
        />

        <Field
          name="notify_estimate_viewed"
          component={BaseSwitch}
          status={estimateStatus === 'YES' ? true : false}
          hint={t('settings.notifications.estimate_viewed')}
          description={t('settings.notifications.estimate_viewed_description')}
          onChangeCallback={val => this.estimateStatus(val)}
          mainContainerStyle={{marginTop: 12}}
        />
      </DefaultLayout>
    );
  }
}
