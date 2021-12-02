import React, {Component} from 'react';
import {View, KeyboardAvoidingView, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {styles} from './styles';
import {AnimateModal} from '../animate-modal';
import {Field} from 'redux-form';
import {BaseInput, ButtonView} from '@/components';
import {Icon} from 'react-native-elements';
import {Text} from '../text';
import {commonSelector} from 'stores/common/selectors';
import {BaseButton, BaseButtonGroup} from '../base';
import t from 'locales/use-translation';

class InputModalComponent extends Component<Iprops> {
  constructor(props) {
    super(props);
    this.state = {visible: false};
  }

  componentDidMount() {
    this.props.reference?.(this);
  }

  componentWillUnmount() {
    this.props.reference?.(undefined);
  }

  onToggle = () => {
    this.setState(({visible}) => {
      return {visible: !visible};
    });
  };

  BUTTON_VIEW = () => {
    const {
      showRemoveButton = false,
      showSaveButton = true,
      isSaving = false,
      isDeleting = false,
      onRemove,
      onSubmit
    } = this.props;

    if (!showRemoveButton && !showSaveButton) {
      return null;
    }

    return (
      <BaseButtonGroup hide-container-style>
        <BaseButton
          onPress={this.onToggle}
          type="primary-outline"
          show={!showRemoveButton}
          disabled={isSaving || isDeleting}
        >
          {t('button.cancel')}
        </BaseButton>
        <BaseButton
          onPress={() => onRemove?.()}
          type="danger"
          show={showRemoveButton}
          loading={isDeleting}
          disabled={isSaving}
        >
          {t('button.remove')}
        </BaseButton>
        <BaseButton
          onPress={() => onSubmit?.()}
          show={showSaveButton}
          loading={isSaving}
          disabled={isDeleting}
        >
          {t('button.save')}
        </BaseButton>
      </BaseButtonGroup>
    );
  };

  FIELD = () => {
    const {fieldName, hint, disabled} = this.props;

    return (
      <View style={styles.fieldView}>
        <Field
          name={fieldName}
          component={BaseInput}
          hint={hint}
          disabled={disabled}
          isRequired
        />
      </View>
    );
  };

  HEADER_VIEW = () => {
    const {headerTitle, theme} = this.props;

    return (
      <View style={styles.rowViewContainer(theme)}>
        <View style={styles.rowView}>
          <Text color={theme.input.color} style={styles.heading}>
            {headerTitle}
          </Text>
        </View>
        <View>
          <ButtonView onPress={this.onToggle} withHitSlop>
            <Icon name="close" size={28} color={theme.listItem.fifth.color} />
          </ButtonView>
        </View>
      </View>
    );
  };

  render() {
    const {modalProps, isSaving, isDeleting} = this.props;
    return (
      <AnimateModal
        visible={this.state.visible}
        onToggle={this.onToggle}
        modalProps={{
          animationInTiming: 1,
          animationOutTiming: 1,
          onSwipeComplete: this.onToggle,
          ...(!isSaving && !isDeleting && {swipeDirection: ['left', 'right']}),
          ...modalProps
        }}
      >
        <KeyboardAvoidingView keyboardVerticalOffset={0} behavior="position">
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.modalViewContainer(this.props.theme)}>
              {this.HEADER_VIEW()}

              {this.FIELD()}

              {this.BUTTON_VIEW()}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </AnimateModal>
    );
  }
}

const mapStateToProps = state => commonSelector(state);

export const InputModal = connect(mapStateToProps)(InputModalComponent);
