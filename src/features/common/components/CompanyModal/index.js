import React, { Component } from 'react';
import { TouchableHighlight, ScrollView } from 'react-native';
import {
    AnimateModal,
    AssetIcon,
    AssetImage,
    AssetSvg,
    CtButton,
    CtDecorativeButton,
    Text,
    View
} from '@/components';
import Styles from './styles';
import { CheckIcon, CloseIcon } from '@/icons';
import { colors } from '@/styles';
import { BUTTON_TYPE } from '@/constants';

export class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        };
    }

    onToggle = () => {
        this.setState(({ visible }) => {
            return { visible: !visible };
        });
    };

    render() {
        const { theme, company } = this.props;
        const { visible } = this.state;

        const { Modal, FlexEnd, Item } = Styles;

        const companies = [
            {
                id: 1,
                logo:
                    'https://media-exp3.licdn.com/dms/image/C4E0BAQGDDeprIC77vQ/company-logo_200_200/0/1600697340369?e=2159024400&v=beta&t=-zkQxBAABmZdu7x5q0-6Dl7LhYdDLI_oI2nlZl-hSa8',
                name: 'Bytefury',
                country: 'India'
            },
            {
                id: 3,
                logo:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3iJiYUJRUf-cwCHCT8DQFJAFxhAMVThnNvbvAGqiME99Kg29yhgoS9LVNRbIomHfESxM&usqp=CAU',
                name: 'Mozavi Technologies Pvt. Ltd.',
                country: 'Kuwait'
            },
            {
                id: 2,
                logo:
                    'https://www.saashub.com/images/app/service_logos/116/81efa55694f5/large.png?1577342487',
                name: 'Crater Pvt. Ltd.',
                country: 'United Kingdom'
            },
            {
                id: 4,
                logo:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSddgQEyXCGoaPy_iUzAFnJkenDKIG3IaYolw&usqp=CAU',
                name: 'GohilSir Business Pvt.ltd.',
                country: 'Kuwait'
            }
        ];

        const COMPANIES_LIST = com => {
            const { id, name, logo, country } = com;
            const isSelected = id === 1;
            return (
                <CtDecorativeButton
                    key={id}
                    button={TouchableHighlight}
                    underlayColor={colors.lightGray}
                    scale={1}
                    px-20
                    py-10
                    justify-center
                    opacity={isSelected ? 1 : 0.98}
                >
                    <>
                        <View flex-row items-center>
                            <AssetImage
                                uri
                                imageSource={logo}
                                imageStyle={Styles.logo}
                            />
                            <View flex={1} pl-15 pr-20>
                                <Text h5 medium>
                                    {name}
                                </Text>
                                <Text h5 mt-3>
                                    {country}
                                </Text>
                            </View>
                            {isSelected && (
                                <FlexEnd>
                                    <AssetSvg
                                        name={CheckIcon(
                                            theme.icons.circle.backgroundColor
                                        )}
                                        width={25}
                                        height={25}
                                    />
                                </FlexEnd>
                            )}
                        </View>
                        {isSelected && (
                            <View mt-20>
                                <CtButton
                                    onPress={() => {}}
                                    btnTitle={'Manage Company'}
                                    type={BUTTON_TYPE.OUTLINE}
                                    loading={false}
                                    containerStyle={{ marginHorizontal: 3 }}
                                />
                                <View
                                    mt-15
                                    mb-5
                                    height={1}
                                    background-color={colors.gray}
                                />
                            </View>
                        )}
                    </>
                </CtDecorativeButton>
            );
        };

        const isMore = companies.length > 5;

        return (
            <View>
                <CtDecorativeButton onPress={this.onToggle}>
                    <Text h3 mr-15 medium color={theme?.text?.primaryColor}>
                        {company.name}
                    </Text>
                </CtDecorativeButton>

                <AnimateModal
                    visible={visible}
                    onToggle={this.onToggle}
                    modalProps={{
                        animationIn: 'slideInUp',
                        animationOut: 'slideOutDown'
                    }}
                >
                    <Modal>
                        <View flex={1} flex-row items-center pl-22>
                            <Text h4 flex={1}>
                                Select Your Company
                            </Text>
                            <CtDecorativeButton
                                style={Styles.closeButton}
                                onPress={this.onToggle}
                                withHitSlop
                            >
                                <AssetSvg
                                    name={CloseIcon}
                                    width={17}
                                    height={17}
                                    fill={colors.darkGray}
                                />
                            </CtDecorativeButton>
                        </View>
                        <ScrollView
                            contentContainerStyle={Styles.body}
                            showsVerticalScrollIndicator={isMore}
                            bounces={isMore}
                        >
                            {companies.map(com => COMPANIES_LIST(com))}

                            <CtDecorativeButton
                                flex-row
                                items-center
                                pl-30
                                mt-15
                                mb-5
                                scale={1}
                            >
                                <View
                                    justify-center
                                    items-center
                                    radius-5
                                    border-width={1}
                                    width={31}
                                    height={31}
                                    pl-1
                                    border-color={colors.veryDarkGray}
                                >
                                    <Text h3 center color={colors.veryDarkGray}>
                                        +
                                    </Text>
                                </View>
                                <Text
                                    h5
                                    flex={1}
                                    ml-23
                                    color={colors.veryDarkGray}
                                >
                                    Add another company
                                </Text>
                            </CtDecorativeButton>
                        </ScrollView>
                    </Modal>
                </AnimateModal>
            </View>
        );
    }
}
