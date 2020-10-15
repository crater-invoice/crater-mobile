import React, { Component } from 'react';

import {
    View,
    Modal,
    StatusBar
} from 'react-native';
import styles from './styles';
import { ListView } from '../ListView';
import { MainLayout, DefaultLayout } from '../Layouts';
import { colors } from '../../styles/colors';

type IProps = {
    visible: Boolean,
    onToggle: Function,
    headerProps: Object,
    onSearch: Function,
    bottomDivider: Boolean,
    hasSearchField: Boolean,
    listViewProps: Object,
    defaultLayout: Boolean,
    children: Object,
    bottomAction: Object,
    searchInputProps: Object,
    searchFieldProps: any
};

export class SlideModal extends Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        const {
            visible,
            onToggle,
            headerProps,
            onSearch,
            bottomDivider = false,
            listViewProps,
            hasListView,
            imageListView,
            defaultLayout,
            children,
            hasSearchField,
            bottomAction,
            searchInputProps,
            searchFieldProps
        } = this.props

        return (
            <Modal
                animationType="slide"
                visible={visible}
                onRequestClose={onToggle && onToggle}
                hardwareAccelerated={true}
            >
                <StatusBar
                    backgroundColor={colors.secondary}
                    barStyle={"dark-content"}
                    translucent={true}
                />

                <View style={styles.modalContainer}>
                    {!defaultLayout && (
                        <MainLayout
                            headerProps={headerProps && headerProps}
                            onSearch={onSearch}
                            bottomDivider={bottomDivider}
                            bottomAction={bottomAction}
                            inputProps={searchInputProps && searchInputProps}
                            searchFieldProps={searchFieldProps}
                        >
                            <View style={styles.listViewContainer}>
                                <ListView
                                    {...listViewProps}
                                />
                            </View>
                        </MainLayout>
                    )}

                    {defaultLayout && (
                        <DefaultLayout
                            headerProps={headerProps && headerProps}
                            bottomAction={bottomAction}
                        >
                            {children ? (
                                <View style={styles.bodyContainer}>
                                    {children}
                                </View>
                            ) : (
                                    <View style={styles.listViewContainer}>
                                        <ListView
                                            {...listViewProps}
                                        />
                                    </View>
                                )}

                        </DefaultLayout>
                    )}
                </View>
            </Modal>
        );
    }
}

