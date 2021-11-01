import React from 'react';
import {SelectField} from '@/components';
import t from 'locales/use-translation';
import {defineSize} from '@/constants';
import {routes} from '@/navigation';
import {TouchableOpacity} from 'react-native';
import {Text} from '@/components';
import {ITheme} from '@/interfaces';

interface IProps {
  /**
   * An array of objects with data for each note.
   */
  notes?: Array<any>;

  /**
   * An action to return a list of note.
   */
  getNotes?: () => void;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;
}

let notesReference = React.createRef();

export const NoteSelectModal = (props: IProps) => {
  const {notes, getNotes, theme, onSelect} = props;
  return (
    <SelectField
      {...props}
      items={notes}
      getItems={getNotes}
      apiSearch
      hasPagination
      onlyPlaceholder
      paginationLimit={defineSize(15, 15, 15, 20)}
      createActionRouteName={routes.NOTE}
      reference={ref => (notesReference = ref)}
      headerProps={{title: t('notes.select')}}
      emptyContentProps={{contentType: 'notes'}}
      onSelect={onSelect}
      customView={
        <TouchableOpacity onPress={() => notesReference?.onToggle?.()}>
          <Text
            primary
            h4
            style={{paddingBottom: 10}}
            color={theme?.viewLabel?.thirdColor}
          >
            {t('notes.insert_note')}
          </Text>
        </TouchableOpacity>
      }
    />
  );
};
