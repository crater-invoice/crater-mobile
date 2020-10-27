import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { colors } from '@/styles';
import Note from '../../components/Note';
import { NOTES_FORM } from '../../constants';
import { EXPENSES_ICON } from '@/assets';
import { getTitleByLanguage } from '@/utils';
import { AssetSvg } from '@/components';
import * as noteAction from '../../actions';

const mapStateToProps = ({ global, settings }) => ({
    locale: global?.locale,
    notes: settings?.notes
});

const mapDispatchToProps = {
    getNotes: noteAction.getNotes
};
//  Redux Forms
const NoteSearchReduxForm = reduxForm({
    form: NOTES_FORM
})(Note);

//  connect
const NoteContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteSearchReduxForm);

NoteContainer.navigationOptions = () => ({
    header: null
});

export default NoteContainer;
