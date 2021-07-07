import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './styles';
import { ListView, InputModal, InfiniteScroll } from '@/components';
import Lng from '@/lang/i18n';
import { alertMe } from '@/constants';
import { PermissionService } from '@/services';
import { CUSTOMIZE_TYPE } from '../../constants';

export class Units extends Component {
    constructor(props) {
        super(props);
        this.scrollViewReference = React.createRef();
        this.modalReference = React.createRef();
        this.state = {
            isCreateMethod: true
        };
    }

    onToggle = () => this?.modalReference?.onToggle?.();

    onSave = () => {
        const { isCreateMethod } = this.state;
        const {
            props: {
                formValues: { unitName = '', unitId = null },
                createItemUnit,
                editItemUnit
            }
        } = this.props;

        const params = {
            params: {
                id: unitId,
                name: unitName
            },
            onSuccess: () => this.onToggle()
        };

        if (unitName) {
            isCreateMethod ? createItemUnit(params) : editItemUnit(params);
        }
    };

    onRemove = () => {
        const {
            props: {
                locale,
                removeItemUnit,
                formValues: { unitId = null }
            }
        } = this.props;

        alertMe({
            title: Lng.t('alert.title', { locale }),
            desc: Lng.t('items.alertUnit', { locale }),
            showCancel: true,
            okPress: () => {
                removeItemUnit({
                    id: unitId,
                    onSuccess: () => this.onToggle()
                });
            }
        });
    };

    INPUT_MODAL = () => {
        const { isCreateMethod } = this.state;
        const {
            props: { locale, itemUnitLoading }
        } = this.props;

        const isAllowToEdit = isCreateMethod
            ? true
            : PermissionService.isAllowToEdit(CUSTOMIZE_TYPE.ITEMS);
        const disabled = !isAllowToEdit;

        const getTitle = () => {
            let title = 'items.addUnit';
            if (!isCreateMethod && !isAllowToEdit) title = 'header.viewUnit';
            if (!isCreateMethod && isAllowToEdit) title = 'items.editUnit';

            return Lng.t(title, { locale });
        };

        return (
            <InputModal
                reference={ref => (this.modalReference = ref)}
                locale={locale}
                headerTitle={getTitle()}
                hint={Lng.t('items.unitHint', { locale })}
                fieldName="unitName"
                onSubmit={() => this.onSave()}
                onRemove={() => this.onRemove()}
                showRemoveButton={
                    !isCreateMethod &&
                    PermissionService.isAllowToDelete(CUSTOMIZE_TYPE.ITEMS)
                }
                showSaveButton={isAllowToEdit}
                onSubmitLoading={itemUnitLoading}
                onRemoveLoading={itemUnitLoading}
                disabled={disabled}
            />
        );
    };

    onSelectUnit = ({ name, id }) => {
        this.props.setFormField('unitId', id);
        this.openModal(name);
    };

    openModal = (name = '') => {
        this.setState({ isCreateMethod: name ? false : true });
        this.props.setFormField('unitName', name);
        this.onToggle();
    };

    render() {
        const {
            props: { units, locale, getItemUnits }
        } = this.props;

        return (
            <View style={styles.childContainer}>
                {this.INPUT_MODAL()}
                <InfiniteScroll
                    getItems={getItemUnits}
                    reference={ref => (this.scrollViewReference = ref)}
                    paginationLimit={20}
                >
                    <ListView
                        items={units}
                        onPress={this.onSelectUnit}
                        isEmpty={units ? units.length <= 0 : true}
                        bottomDivider
                        contentContainerStyle={{
                            flex: 3
                        }}
                        emptyContentProps={{
                            title: Lng.t('payments.empty.modeTitle', { locale })
                        }}
                        itemContainer={{
                            paddingVertical: 14,
                            paddingHorizontal: 22
                        }}
                    />
                </InfiniteScroll>
            </View>
        );
    }
}
