import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './styles';
import { ListView, InputModal } from '@/components';
import Lng from '@/lang/i18n';
import { formatListByName } from '@/utils';
import { alertMe } from '@/constants';

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

        if (unitName) {
            this.onToggle()

            isCreateMethod ? createItemUnit({ params }) :
                editItemUnit({ params, id: unitId })
        }
    }

    onRemove = () => {
        const {
            props: {
                locale,
                removeItemUnit,
                formValues: { unitId = null },
            }
        } = this.props

        alertMe({
            title: Lng.t("alert.title", { locale }),
            desc: Lng.t("items.alertUnit", { locale }),
            showCancel: true,
            okPress: () => {
                this.onToggle()
                removeItemUnit({ id: unitId })
            }
        })
    }

    IMPORT_INPUT_MODAL = () => {
        const { visible, isCreateMethod } = this.state
        const { props: { navigation, locale, itemUnitLoading = false } } = this.props

        return (
            <InputModal
                visible={visible}
                onToggle={() => this.onToggle()}
                navigation={navigation}
                locale={locale}
                headerTitle={isCreateMethod ?
                    Lng.t("items.addUnit", { locale }) :
                    Lng.t("items.editUnit", { locale })
                }
                hint={Lng.t("items.unitHint", { locale })}
                fieldName="unitName"
                onSubmit={() => this.onSave()}
                onRemove={() => this.onRemove()}
                showRemoveButton={!isCreateMethod}
                onSubmitLoading={itemUnitLoading}
                onRemoveLoading={itemUnitLoading}
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
        const { props: { units, locale } } = this.props

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
                            title: Lng.t("payments.empty.modeTitle", { locale }),
                        }}
                        itemContainer={{
                            paddingVertical: 8
                        }}
                    />
                </View>
            </View>
        );
    }
}
