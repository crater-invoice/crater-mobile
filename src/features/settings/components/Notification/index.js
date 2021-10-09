import React from 'react';
import styles from './styles';
import {DefaultLayout, InputField, ToggleSwitch, CtDivider} from '@/components';
import {Field, change} from 'redux-form';
import t from 'locales/use-translation';
import {NOTIFICATION} from '../../constants';
import {keyboardType} from '@/constants';

type IProps = {
  navigation: Object,
  handleSubmit: Function,
  getAccountLoading: Boolean
};
export class Notification extends React.Component<IProps> {
  toastReference: any;
  constructor(props) {
    super(props);
    this.toastReference = React.createRef();

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

    editSettingItem({
      params: {
        settings
      },
      navigation
    });
  };

  invoiceStatus = status => {
    const {editSettingItem} = this.props;

    const settings = {
      notify_invoice_viewed: status === true ? 'YES' : 'NO'
    };

    editSettingItem({
      params: {
        settings
      },
      onResult: () => {
        this.toastReference?.show?.(
          'settings.notifications.invoiceViewedUpdated'
        );
      }
    });
  };

  estimateStatus = status => {
    const {editSettingItem} = this.props;

    const settings = {
      notify_estimate_viewed: status === true ? 'YES' : 'NO'
    };

    editSettingItem({
      params: {
        settings
      },
      onResult: () => {
        this.toastReference?.show?.(
          'settings.notifications.estimateViewedUpdated'
        );
      }
    });
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
        toastProps={{
          reference: ref => (this.toastReference = ref)
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

        <CtDivider dividerStyle={styles.dividerLine} />

        <Field
          name="notify_invoice_viewed"
          component={ToggleSwitch}
          status={invoiceStatus === 'YES' ? true : false}
          hint={t('settings.notifications.invoiceViewed')}
          description={t('settings.notifications.invoiceViewedDescription')}
          onChangeCallback={val => this.invoiceStatus(val)}
        />

        <Field
          name="notify_estimate_viewed"
          component={ToggleSwitch}
          status={estimateStatus === 'YES' ? true : false}
          hint={t('settings.notifications.estimateViewed')}
          description={t('settings.notifications.estimateViewedDescription')}
          onChangeCallback={val => this.estimateStatus(val)}
          mainContainerStyle={{marginTop: 12}}
        />
      </DefaultLayout>
    );
  }
}
