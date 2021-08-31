import React, { Component } from 'react';
import { Editor, SelectField, Text } from '@/components';
import { View, TouchableOpacity } from 'react-native';
import t from 'locales/use-translation';
import { Field } from 'redux-form';
import { formatNotesType } from '@/utils';
import { ROUTES } from '@/navigation';
import { NOTES_TYPE_VALUE as NOTES_TYPE } from '@/features/settings/constants';
import { isIPhoneX } from '@/constants';
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
        const { navigation } = this.props;

        navigation.navigate(ROUTES.NOTE, {
            type: 'ADD',
            modalType: NOTES_TYPE.INVOICE,
            onSelect: item => this.onSelect(item)
        });
    };

    onSelect = item => {
        this.editorReference?.togglePreview?.();
        this.props?.setFormField?.('notes', item.notes);
    };

    render() {
        const { isEditScreen, notes, getNotes, navigation, theme } = this.props;

        return (
            <Editor
                {...this.props}
                name="notes"
                label="invoices.notes"
                placeholder={t('invoices.notePlaceholder')}
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
                showPreview={isEditScreen}
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
                            onSelect={item => this.onSelect(item)}
                            headerProps={{
                                title: t('notes.select')
                            }}
                            rightIconPress={this.navigateToNote}
                            createActionRouteName={ROUTES.NOTE}
                            emptyContentProps={{
                                contentType: 'notes'
                            }}
                            reference={ref => (this.notesReference = ref)}
                            paginationLimit={isIPhoneX() ? 20 : 15}
                            customView={
                                <TouchableOpacity
                                    onPress={() => {
                                        this.notesReference?.onToggle?.();
                                    }}
                                >
                                    <Text
                                        h4
                                        color={theme?.viewLabel?.thirdColor}
                                        style={{ paddingBottom: 6 }}
                                    >
                                        {t('notes.insertNote')}
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
