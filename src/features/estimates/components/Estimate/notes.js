import React, {Component} from 'react';
import {Editor} from '@/components';
import {View} from 'react-native';
import t from 'locales/use-translation';
import {Field} from 'redux-form';
import {formatNotesType} from '@/utils';
import {routes} from '@/navigation';
import {NOTES_TYPE_VALUE as NOTES_TYPE} from '@/features/settings/constants';
import {NoteSelectModal} from '@/select-modal';

interface IProps {
  isEditScreen?: boolean;
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
      modalType: NOTES_TYPE.ESTIMATE,
      onSelect: item => this.onSelect(item)
    });
  };

  onSelect = item => {
    this.editorReference?.togglePreview?.();
    this.props?.setFormField?.(`notes`, item.notes);
  };

  render() {
    const {isEditScreen, notes, getNotes} = this.props;

    return (
      <Editor
        {...this.props}
        name={`notes`}
        label="estimates.notes"
        placeholder={t('estimates.notePlaceholder')}
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
        showPreview={isEditScreen}
        customRightLabelComponent={
          <View style={{marginTop: 5}}>
            <Field
              name="add_notes"
              notes={formatNotesType(notes)}
              getNotes={getNotes}
              component={NoteSelectModal}
              onSelect={item => this.onSelect(item)}
              rightIconPress={this.navigateToNote}
              queryString={{
                type: NOTES_TYPE.ESTIMATE
              }}
            />
          </View>
        }
      />
    );
  }
}
