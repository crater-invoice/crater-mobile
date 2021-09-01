// @flow

import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import {
    DefaultLayout,
    InputField,
    CtDivider,
    FilePicker,
    Text,
    ActionButton
} from '@/components';
import { Field, change } from 'redux-form';
import t from 'locales/use-translation';
import { EDIT_ACCOUNT } from '../../constants';
import { goBack, MOUNT, UNMOUNT } from '@/navigation';
import { headerTitle } from '@/styles';
import { env } from '@/config';

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
        const { getAccount, navigation } = this.props;
        getAccount({
            onResult: user => {
                this.setState({ avatarUrl: user?.avatar ?? null });
            }
        });
        goBack(MOUNT, navigation);
    }

    componentWillUnmount() {
        goBack(UNMOUNT);
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(EDIT_ACCOUNT, field, value));
    };

    onProfileUpdate = value => {
        const {
            navigation,
            editAccount,
            editAccountLoading,
            isLoading
        } = this.props;
        const { avatar, fileLoading } = this.state;

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
                loading:
                    editAccountLoading || this.state.fileLoading || isLoading
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
                        rightIconProps: { solid: true },
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
                    onChangeCallback={val => this.setState({ avatar: val })}
                    uploadedFileUrl={this.state.avatarUrl}
                    containerStyle={styles.avatarContainer}
                    imageContainerStyle={styles.imageContainerStyle}
                    imageStyle={styles.imageStyle}
                    loadingContainerStyle={styles.loadingContainerStyle}
                    disabled={disabled}
                    fileLoading={val => {
                        this.setState({ fileLoading: val });
                    }}
                />

                <Field
                    name={name}
                    component={InputField}
                    isRequired
                    hint={t('settings.account.name')}
                    disabled={disabled}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCorrect: true,
                        onSubmitEditing: () => {
                            accountRefs.email.focus();
                        }
                    }}
                />

                <Field
                    name={Email}
                    component={InputField}
                    isRequired
                    hint={t('settings.account.email')}
                    disabled={disabled}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCapitalize: 'none',
                        autoCorrect: true,
                        keyboardType: 'email-address',
                        onSubmitEditing: () => {
                            accountRefs.password.focus();
                        }
                    }}
                    refLinkFn={ref => (accountRefs.email = ref)}
                />

                <Field
                    name={password}
                    component={InputField}
                    hint={t('settings.account.password')}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCapitalize: 'none',
                        autoCorrect: true,
                        onSubmitEditing: () => {
                            accountRefs.confirm.focus();
                        }
                    }}
                    secureTextEntry
                    secureTextIconContainerStyle={styles.eyeIcon}
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
                    inputProps={{
                        returnKeyType: 'go',
                        autoCapitalize: 'none',
                        autoCorrect: true,
                        onSubmitEditing: handleSubmit(this.onProfileUpdate)
                    }}
                    secureTextEntry
                    secureTextIconContainerStyle={styles.eyeIcon}
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
                            {env.APP_VERSION}
                        </Text>
                    </Text>
                </View>
            </DefaultLayout>
        );
    }
}
