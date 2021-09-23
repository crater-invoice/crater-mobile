import React, {Component} from 'react';
import {Editor, SelectField, Text} from '@/components';
import {View, TouchableOpacity} from 'react-native';
import t from 'locales/use-translation';
import {Field} from 'redux-form';
import {formatNotesType} from '@/utils';
import {PAYMENT_FIELDS as FIELDS} from '../../constants';
import {routes} from '@/navigation';
import {NOTES_TYPE_VALUE as NOTES_TYPE} from '@/features/settings/constants';
import {defineSize} from '@/constants';

interface IProps {
  isEditPayment?: boolean;
  notes?: Array<any>;
  getNotes?: Function;
  navigation?: any;
  setFormField?: Function;
}

export default class Notes extends Component<IProps> {
  notesReference: any;
  editorReference: any;

  constructor(props) {
    super(props);
    this.notesReference = React.createRef();
    this.editorReference = React.createRef();
  }

  navigateToNote = () => {
    const {navigation} = this.props;

    navigation.navigate(routes.NOTE, {
      type: 'ADD',
      modalType: NOTES_TYPE.PAYMENT,
      onSelect: item => this.onSelect(item)
    });
  };

  onSelect = item => {
    this.editorReference?.togglePreview?.();
    this.props?.setFormField?.(`payment.${FIELDS.NOTES}`, item.notes);
  };

  render() {
    const {isEditPayment, notes, getNotes, navigation, theme} = this.props;

    return (
      <Editor
        {...this.props}
        name={`payment.${FIELDS.NOTES}`}
        label="payments.notes"
        placeholder={t('payments.notesPlaceholder')}
        fieldInputProps={{height: 80}}
        htmlViewStyle={{minHeight: 82}}
        containerStyle={{marginTop: -10, marginBottom: -10}}
        previewContainerStyle={{
          marginTop: -4,
          marginBottom: -4
        }}
        labelStyle={{marginBottom: -15}}
        previewLabelStyle={{marginBottom: -10}}
        reference={ref => (this.editorReference = ref)}
        showPreview={isEditPayment}
        customRightLabelComponent={
          <View style={{marginTop: 5}}>
            <Field
              name="add_notes"
              items={formatNotesType(notes)}
              apiSearch
              hasPagination
              getItems={getNotes}
              onlyPlaceholder
              component={SelectField}
              onSelect={item => this.onSelect(item)}
              headerProps={{
                title: t('notes.select')
              }}
              rightIconPress={this.navigateToNote}
              createActionRouteName={routes.NOTES}
              emptyContentProps={{
                contentType: 'notes'
              }}
              reference={ref => (this.notesReference = ref)}
              paginationLimit={defineSize(15, 15, 15, 20)}
              customView={
                <TouchableOpacity
                  onPress={() => {
                    this.notesReference?.onToggle?.();
                  }}
                >
                  <Text
                    primary
                    h4
                    style={{paddingBottom: 6}}
                    color={theme?.viewLabel?.thirdColor}
                  >
                    {t('notes.insertNote')}
                  </Text>
                </TouchableOpacity>
              }
              queryString={{
                type: NOTES_TYPE.PAYMENT
              }}
            />
          </View>
        }
      />
    );
  }
}
