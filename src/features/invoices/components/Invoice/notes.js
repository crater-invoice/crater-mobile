import React, { Component } from 'react';
import { Editor, SelectField } from '@/components';
import { View, Text, TouchableOpacity } from 'react-native';
import Lng from '@/lang/i18n';
import { Field } from 'redux-form';
import { formatNotesType } from '@/utils';
import { colors, fonts } from '@/styles';
import { NOTES_TYPE_VALUE as NOTES_TYPE } from '@/features/settings/constants';

interface IProps {
    locale?: string;
    isEditInvoice?: boolean;
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

    render() {
        const {
            locale,
            isEditInvoice,
            notes,
            getNotes,
            navigation,
            setFormField
        } = this.props;

        return (
            <Editor
                {...this.props}
                name="notes"
                label="invoices.notes"
                placeholder={Lng.t('invoices.notePlaceholder', {
                    locale
                })}
                fieldInputProps={{ height: 80 }}
                htmlViewStyle={{ minHeight: 82 }}
                containerStyle={{ marginTop: -10, marginBottom: -10 }}
                previewContainerStyle={{
                    marginTop: -4,
                    marginBottom: -4
                }}
                labelStyle={{ marginBottom: -15 }}
                previewLabelStyle={{ marginBottom: -10 }}
                reference={ref => (this.editorReference = ref)}
                showPreview={isEditInvoice}
                customRightLabelComponent={
                    <View style={{ marginTop: 5 }}>
                        <Field
                            name="add_notes"
                            items={formatNotesType(notes)}
                            apiSearch
                            hasPagination
                            getItems={getNotes}
                            onlyPlaceholder
                            component={SelectField}
                            navigation={navigation}
                            onSelect={item => {
                                this.editorReference?.togglePreview?.();
                                setFormField?.('notes', item.notes);
                            }}
                            headerProps={{
                                title: Lng.t('notes.select', {
                                    locale
                                }),
                                rightIcon: null
                            }}
                            emptyContentProps={{
                                contentType: 'notes'
                            }}
                            reference={ref => (this.notesReference = ref)}
                            customView={
                                <TouchableOpacity
                                    onPress={() => {
                                        this.notesReference?.onToggle?.();
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: colors.primary,
                                            fontFamily: fonts.poppins,
                                            fontSize: 16,
                                            paddingBottom: 6,
                                            textAlign: 'left'
                                        }}
                                    >
                                        {Lng.t('notes.insertNote', {
                                            locale
                                        })}
                                    </Text>
                                </TouchableOpacity>
                            }
                            queryString={{
                                type: NOTES_TYPE.INVOICE
                            }}
                        />
                    </View>
                }
            />
        );
    }
}
