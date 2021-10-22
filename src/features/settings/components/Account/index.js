import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {Field, change} from 'redux-form';
import t from 'locales/use-translation';
import {EDIT_ACCOUNT} from '../../constants';
import {headerTitle} from '@/styles';
import {APP_VERSION} from '../../../../../config';
import {
  DefaultLayout,
  InputField,
  CtDivider,
  FilePicker,
  Text,
  ActionButton
} from '@/components';
import {keyboardType} from '@/constants';

let name = 'name';
let Email = 'email';
let password = 'password';
let cpassword = 'confirmPassword';

type IProps = {
  getAccount: Function,
  editAccount: Function,
  navigation: Object,
  handleSubmit: Function,
  isLoading: Boolean,
  editAccountLoading: Boolean
};

export class Account extends React.Component<IProps> {
  constructor(props) {
    super(props);

    this.state = {
      avatar: null,
      avatarUrl: null,
      fileLoading: false
    };
  }

  componentDidMount() {
    const {getAccount, navigation} = this.props;
    getAccount({
      onResult: user => {
        this.setState({avatarUrl: user?.avatar ?? null});
      }
    });
  }

  setFormField = (field, value) => {
    this.props.dispatch(change(EDIT_ACCOUNT, field, value));
  };

  onProfileUpdate = value => {
    const {navigation, editAccount, editAccountLoading, isLoading} = this.props;
    const {avatar, fileLoading} = this.state;

    if (isLoading || fileLoading || editAccountLoading) {
      return;
    }

    editAccount({
      params: value,
      avatar,
      navigation
    });
  };

  render() {
    const {
      navigation,
      handleSubmit,
      isLoading,
      editAccountLoading,
      isAllowToEdit,
      theme
    } = this.props;
    let accountRefs = {};
    const disabled = !isAllowToEdit;
    const bottomAction = [
      {
        label: 'button.save',
        onPress: handleSubmit(this.onProfileUpdate),
        show: isAllowToEdit,
        loading: editAccountLoading || this.state.fileLoading || isLoading
      }
    ];

    return (
      <DefaultLayout
        headerProps={{
          leftIconPress: () => navigation.goBack(null),
          title: t('header.setting.account'),
          withTitleStyle: headerTitle({
            marginLeft: -20,
            marginRight: -25
          }),
          placement: 'center',
          ...(isAllowToEdit && {
            rightIcon: 'save',
            rightIconProps: {solid: true},
            rightIconPress: handleSubmit(this.onProfileUpdate)
          })
        }}
        bottomAction={<ActionButton buttons={bottomAction} />}
        loadingProps={{
          is: isLoading
        }}
        bodyStyle="px-20"
      >
        <Field
          name={'avatar'}
          component={FilePicker}
          hasAvatar
          onChangeCallback={val => this.setState({avatar: val})}
          uploadedFileUrl={this.state.avatarUrl}
          containerStyle={styles.avatarContainer}
          imageContainerStyle={styles.imageContainerStyle}
          imageStyle={styles.imageStyle}
          loadingContainerStyle={styles.loadingContainerStyle}
          disabled={disabled}
          fileLoading={val => {
            this.setState({fileLoading: val});
          }}
        />

        <Field
          name={name}
          component={InputField}
          isRequired
          hint={t('settings.account.name')}
          disabled={disabled}
          onSubmitEditing={() => accountRefs.email.focus()}
        />

        <Field
          name={Email}
          component={InputField}
          isRequired
          hint={t('settings.account.email')}
          disabled={disabled}
          onSubmitEditing={() => accountRefs.password.focus()}
          keyboardType={keyboardType.EMAIL}
          refLinkFn={ref => (accountRefs.email = ref)}
        />

        <Field
          name={password}
          component={InputField}
          hint={t('settings.account.password')}
          onSubmitEditing={() => accountRefs.confirm.focus()}
          secureTextEntry
          disabled={disabled}
          refLinkFn={ref => {
            accountRefs.password = ref;
          }}
          minCharacter={8}
        />

        <Field
          name={cpassword}
          component={InputField}
          hint={t('settings.account.confirmPassword')}
          onSubmitEditing={handleSubmit(this.onProfileUpdate)}
          secureTextEntry
          disabled={disabled}
          refLinkFn={ref => {
            accountRefs.confirm = ref;
          }}
        />

        <CtDivider dividerStyle={styles.dividerLine} />

        <View style={styles.versionContainer}>
          <Text color={theme.viewLabel.secondaryColor} h4>
            {t('settings.account.version')}
            {'  '}
            <Text bold2 color={theme.viewLabel.secondaryColor}>
              {APP_VERSION}
            </Text>
          </Text>
        </View>
      </DefaultLayout>
    );
  }
}
