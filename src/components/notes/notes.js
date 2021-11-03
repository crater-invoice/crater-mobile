import React from 'react';
import {Editor} from '@/components';
import {View} from 'react-native';
import t from 'locales/use-translation';
import {Field} from 'redux-form';
import {formatNotesType} from '@/utils';
import {routes} from '@/navigation';
import {NoteSelectModal} from '@/select-modal';
import {IProps} from './type.d';

let editorReference = React.createRef();

export const Notes = (props: IProps) => {
  const {isEditScreen, navigation, notes, getNotes, noteType, onSelect} = props;
  const navigateToNote = () => {
    navigation.navigate(routes.NOTE, {
      type: 'ADD',
      modalType: noteType,
      onSelect: value => onSelect('notes', value?.notes)
    });
  };
  return (
    <Editor
      {...props}
      name="notes"
      label="notes.notes"
      placeholder={t(`notes.placeholder.${noteType}`)}
      fieldInputProps={{height: 80}}
      htmlViewStyle={{minHeight: 82}}
      containerStyle={{marginTop: -10, marginBottom: -10}}
      previewContainerStyle={{
        marginTop: -4,
        marginBottom: -4
      }}
      labelStyle={{marginBottom: -15}}
      previewLabelStyle={{marginBottom: -10}}
      reference={ref => (editorReference = ref)}
      showPreview={isEditScreen}
      customRightLabelComponent={
        <View style={{marginTop: 5}}>
          <Field
            name="add_notes"
            notes={formatNotesType(notes)}
            getNotes={getNotes}
            component={NoteSelectModal}
            onSelect={value => {
              onSelect('notes', value?.notes);
              editorReference?.togglePreview?.();
            }}
            rightIconPress={navigateToNote}
            queryString={{
              type: noteType
            }}
          />
        </View>
      }
    />
  );
};
