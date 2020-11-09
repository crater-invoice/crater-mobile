import React, { Component } from 'react';

import { View, Modal, StatusBar } from 'react-native';
import styles from './styles';
import { ListView } from '../ListView';
import { MainLayout, DefaultLayout } from '../Layouts';
import { colors } from '@/styles';
import { InfiniteScroll } from '../InfiniteScroll';
import { ScrollView } from '../ScrollView';

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
    searchFieldProps: any,
    isPagination: Boolean,
    infiniteScrollProps: any,
    scrollViewProps: any
};

export class SlideModal extends Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            visible,
            onToggle,
            headerProps,
            onSearch,
            bottomDivider = false,
            listViewProps,
            defaultLayout,
            children,
            bottomAction,
            searchInputProps,
            searchFieldProps,
            isPagination = false,
            infiniteScrollProps,
            scrollViewProps
        } = this.props;

        const listViewChildren = isPagination ? (
            <View style={styles.listViewContainer}>
                <InfiniteScroll {...infiniteScrollProps}>
                    <ListView {...listViewProps} />
                </InfiniteScroll>
            </View>
        ) : (
            <View style={styles.listViewContainer}>
                <ScrollView scrollViewProps={scrollViewProps}>
                    <ListView {...listViewProps} />
                </ScrollView>
            </View>
        );

        return (
            <Modal
                animationType="slide"
                visible={visible}
                onRequestClose={onToggle && onToggle}
                hardwareAccelerated={true}
            >
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
                            {listViewChildren}
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
                                listViewChildren
                            )}
                        </DefaultLayout>
                    )}
                </View>
            </Modal>
        );
    }
}
