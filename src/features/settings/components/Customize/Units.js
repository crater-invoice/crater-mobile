import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { ListView, InputModal, CtDivider } from '../../../../components';
import { formatListByName, alertMe } from '../../../../api/global';
import Lng from '../../../../api/lang/i18n';

export class Units extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isCreateMethod: true,
        };
    }

    onToggle = () => {
        this.setState(({ visible }) => {
            return { visible: !visible }
        });
    }

    onSave = () => {
        const { isCreateMethod } = this.state
        const {
            props: {
                formValues: { unitName = "", unitId = null },
                createItemUnit,
                editItemUnit
            }
        } = this.props

        const params = {
            id: unitId,
            name: unitName
        }

        this.onToggle()

        isCreateMethod ? createItemUnit({ params }) :
            editItemUnit({ params, id: unitId })
    }

    onRemove = () => {
        const {
            props: {
                language,
                removeItemUnit,
                formValues: { unitId = null },
            }
        } = this.props

        alertMe({
            title: Lng.t("alert.title", { locale: language }),
            desc: Lng.t("items.alertUnit", { locale: language }),
            showCancel: true,
            okPress: () => {
                this.onToggle()
                removeItemUnit({ id: unitId })
            }
        })
    }

    IMPORT_INPUT_MODAL = () => {
        const { visible, isCreateMethod } = this.state
        const { props: { navigation, language } } = this.props

        return (
            <InputModal
                visible={visible}
                onToggle={() => this.onToggle()}
                navigation={navigation}
                language={language}
                headerTitle={isCreateMethod ?
                    Lng.t("items.addUnit", { locale: language }) :
                    Lng.t("items.editUnit", { locale: language })
                }
                hint={Lng.t("items.unitHint", { locale: language })}
                fieldName="unitName"
                onSubmit={() => this.onSave()}
                onRemove={() => this.onRemove()}
                showRemoveButton={!isCreateMethod}
            />
        )
    }

    onSelectUnit = ({ name, id }) => {
        this.props.setFormField("unitId", id)
        this.openModal(name)
    }

    openModal = (name = "") => {
        this.setState({ isCreateMethod: name ? false : true })
        this.props.setFormField("unitName", name)
        this.onToggle()
    }

    render() {
        const { props: { units, language } } = this.props

        return (
            <View style={styles.bodyContainer}>
                {this.IMPORT_INPUT_MODAL()}

                <View>
                    <ListView
                        items={formatListByName(units)}
                        getFreshItems={(onHide) => {
                            onHide && onHide()
                        }}
                        onPress={this.onSelectUnit}
                        isEmpty={units ? units.length <= 0 : true}
                        bottomDivider
                        contentContainerStyle={{ flex: 3 }}
                        emptyContentProps={{
                            title: Lng.t("payments.empty.modeTitle", { locale: language }),
                        }}
                    />
                </View>
            </View>
        );
    }
}