import React from 'react';
import styles from './account-style';
import {Field, change, initialize} from 'redux-form';
import t from 'locales/use-translation';
import {APP_VERSION} from '../../../config';
import {keyboardType} from '@/helpers/keyboard';
import {IProps, IStates} from './account-type.d';
import {fetchCurrentUser, updateCurrentUser} from 'stores/user/actions';
import {ACCOUNT_FORM} from 'stores/user/types';
import {secondaryHeader} from '@/utils';
import {LanguageSelectModal} from '@/select-modal';
import {
  Text,
  DefaultLayout,
  BaseInput,
  BaseDivider,
  FilePicker,
  BaseButtonGroup,
  BaseButton,
  View
} from '@/components';

export default class Account extends React.Component<IProps, IStates> {
  constructor(props) {
    super(props);

    this.state = {
      isFetchingInitialData: true,
      avatar: null,
      avatarUrl: null,
      fileLoading: false
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchCurrentUser(this.setInitialData));
  }

  setInitialData = data => {
    const {dispatch} = this.props;
    const user = {
      name: data.name,
      email: data.email,
      language: data.language
    };
    dispatch(initialize(ACCOUNT_FORM, user));
    this.setState({avatarUrl: data?.avatar, isFetchingInitialData: false});
  };

  setFormField = (field, value) => {
    this.props.dispatch(change(ACCOUNT_FORM, field, value));
  };

  onSave = values => {
    const {dispatch, isSaving} = this.props;
    const {isFetchingInitialData, fileLoading, avatar} = this.state;

    if (isSaving || isFetchingInitialData || fileLoading) {
      return;
    }

    dispatch(updateCurrentUser(values, avatar));
  };

  render() {
    let accountRefs: any = {};
    const {handleSubmit, theme, isSaving, languages} = this.props;
    const {isFetchingInitialData, avatarUrl, fileLoading} = this.state;
    const headerProps = secondaryHeader({
      ...this.props,
      rightIconPress: handleSubmit(this.onSave),
      isAllowToEdit: true
    });
    const bottomAction = (
      <BaseButtonGroup>
        <BaseButton
          loading={isSaving}
          disabled={isFetchingInitialData || fileLoading}
          onPress={handleSubmit(this.onSave)}
        >
          {t('button.save')}
        </BaseButton>
      </BaseButtonGroup>
    );

    return (
      <DefaultLayout
        headerProps={headerProps}
        bottomAction={bottomAction}
        loadingProps={{is: isFetchingInitialData}}
        bodyStyle="px-20"
      >
        <Field
          name={'avatar'}
          component={FilePicker}
          hasAvatar
          onChangeCallback={val => this.setState({avatar: val})}
          uploadedFileUrl={avatarUrl}
          containerStyle={styles.avatarContainer}
          imageContainerStyle={styles.imageContainerStyle}
          style={styles.imageStyle}
          loadingContainerStyle={styles.loadingContainerStyle}
          fileLoading={val => this.setState({fileLoading: val})}
        />

        <Field
          name={'name'}
          component={BaseInput}
          isRequired
          hint={t('settings.account.name')}
          onSubmitEditing={() => accountRefs.email.focus()}
        />

        <Field
          name={'email'}
          component={BaseInput}
          isRequired
          hint={t('settings.account.email')}
          onSubmitEditing={() => accountRefs.password.focus()}
          keyboardType={keyboardType.EMAIL}
          refLinkFn={ref => (accountRefs.email = ref)}
        />

        <Field
          name={'password'}
          component={BaseInput}
          hint={t('settings.account.password')}
          onSubmitEditing={() => accountRefs.confirm.focus()}
          secureTextEntry
          refLinkFn={ref => (accountRefs.password = ref)}
          minCharacter={8}
        />

        <Field
          name={'confirmPassword'}
          component={BaseInput}
          hint={t('settings.account.confirm_password')}
          secureTextEntry
          refLinkFn={ref => (accountRefs.confirm = ref)}
        />

        <Field
          name="language"
          languages={languages}
          component={LanguageSelectModal}
          onSelect={val => this.setFormField('language', val.code)}
          isRequired
        />

        <BaseDivider dividerStyle={styles.dividerLine} />

        <View class="my-17">
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
