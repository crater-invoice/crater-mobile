import { getConditionStyles } from '@/constants';
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { styles } from './styles';


type IProps = {
    activeTab: boolean,
    tabs: Array<Object>,
    setActiveTab: Function,
    style: Object,
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
        const { activeTab, tabs, setActiveTab, style, tabStyle } = this.props;

        let { render } = tabs.find(({ id, Title }) => [id, Title].includes(activeTab));

        return (
            <View style={{ ...styles.container, ...style }}>
                <View style={[styles.tabs, tabStyle && tabStyle]}>
                    {tabs.map(({ id, Title, tabName }) => (
                        <TouchableOpacity
                            key={Title}
                            activeOpacity={0.8}
                            style={getConditionStyles([
                                styles.tab,
                                {
                                    condition: [Title, id].includes(activeTab),
                                    style: styles.selected_tab,
                                },
                            ])}
                            onPress={() => setActiveTab(Title)}
                        >
                            {typeof tabName === 'string' ? (
                                <Text
                                    style={[styles.TabTitle, activeTab === Title && styles.selectedTabTitle]}
                                >
                                    {tabName && tabName}
                                </Text>
                            ) : (
                                    tabName && tabName({ active: [tabName, id].includes(activeTab) })
                                )}
                        </TouchableOpacity>
                    ))}
                </View>
                {render}
            </View>
        );
    }
}

