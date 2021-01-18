import React, { Component } from 'react';
import { Editor, SelectField, Text } from '@/components';
import { View, TouchableOpacity } from 'react-native';
import Lng from '@/lang/i18n';
import { Field } from 'redux-form';
import { formatNotesType } from '@/utils';
import { colors, fonts } from '@/styles';
import { ROUTES } from '@/navigation';
import {
    NOTES_ADD,
    NOTES_TYPE_VALUE as NOTES_TYPE
} from '@/features/settings/constants';
import { isIPhoneX } from '@/constants';

interface IProps {
    locale?: string;
    isEditEstimate?: boolean;
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
            type: NOTES_ADD,
            modalType: NOTES_TYPE.ESTIMATE,
            onSelect: item => this.onSelect(item)
        });
    };

    onSelect = item => {
        this.editorReference?.togglePreview?.();
        this.props?.setFormField?.(`notes`, item.notes);
    };

    render() {
        const {
            locale,
            isEditEstimate,
            notes,
            getNotes,
            navigation,
            setFormField
        } = this.props;

        return (
            <Editor
                {...this.props}
                name={`notes`}
                label="estimates.notes"
                placeholder={Lng.t('estimates.notePlaceholder', {
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
                showPreview={isEditEstimate}
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
                                title: Lng.t('notes.select', { locale })
                            }}
                            rightIconPress={this.navigateToNote}
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
                                        primary
                                        h4
                                        style={{paddingBottom: 6}}
                                    >
                                        {Lng.t('notes.insertNote', {
                                            locale
                                        })}
                                    </Text>
                                </TouchableOpacity>
                            }
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
