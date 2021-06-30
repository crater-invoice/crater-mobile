import { getConditionStyles } from '@/constants';
import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '../Text';
import { styles } from './styles';

type IProps = {
    activeTab: String,
    tabs: Array<Object>,
    setActiveTab: Function,
    style: Object,
    theme: any
};

export class Tabs extends Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        const { activeTab, setActiveTab, tabs } = this.props;
        !activeTab && setActiveTab(tabs[0].Title || tabs[0].id);
    }

    render() {
        const {
            activeTab,
            tabs,
            setActiveTab,
            style,
            tabStyle,
            theme
        } = this.props;

        let { render } = tabs.find(({ id, Title }) =>
            [id, Title].includes(activeTab)
        );

        return (
            <View style={{ ...styles.container, ...style }}>
                <View style={[styles.tabs, tabStyle && tabStyle]}>
                    {tabs.map(({ id, Title, tabName }) => (
                        <TouchableOpacity
                            key={Title}
                            activeOpacity={0.8}
                            style={getConditionStyles([
                                styles.tab(theme),
                                {
                                    condition: [Title, id].includes(activeTab),
                                    style: styles.selected_tab(theme)
                                }
                            ])}
                            onPress={() => setActiveTab(Title)}
                        >
                            {typeof tabName === 'string' ? (
                                <Text
                                    color={theme?.tab?.color}
                                    bold2
                                    h5
                                    style={
                                        activeTab === Title &&
                                        styles.selectedTabTitle(theme)
                                    }
                                >
                                    {tabName && tabName}
                                </Text>
                            ) : (
                                tabName &&
                                tabName({
                                    active: [tabName, id].includes(activeTab)
                                })
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
                {render}
            </View>
        );
    }
}
