import React, { Component } from 'react';
import { TouchableHighlight, ScrollView } from 'react-native';
import Styles from './styles';
import Lng from '@/lang/i18n';
import { CloseIcon2 as CloseIcon } from '@/icons';
import { colors } from '@/styles';
import {
    defineSize,
    hasTextLength as hasValue,
    isAndroidPlatform
} from '@/constants';
import {
    AnimateModal,
    AssetImage,
    AssetSvg,
    CtDecorativeButton,
    Text,
    View
} from '@/components';

export class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: false };
    }

    onToggle = () => {
        this.setState(({ visible }) => {
            return { visible: !visible };
        });
    };

    render() {
        const { theme, company, locale } = this.props;
        const { visible } = this.state;

        const { Modal } = Styles;

        const companies = [
            {
                id: 1,
                logo: '',
                name: 'Bytefury'
            },
            {
                id: 2,
                logo: null,
                name: 'Quiktract'
            },
            {
                id: 3,
                logo:
                    'https://www.vippng.com/png/full/341-3419991_slack-on-the-mac-app-store-slack-new.png',
                name: 'Slack'
            },
            {
                id: 4,
                logo:
                    'https://i.pinimg.com/originals/1b/76/01/1b7601e035a83c13c208b4ec905ee6d9.png',
                name: 'Pinterest'
            }
        ];

        const companyLogo = (company, type) => {
            const isMedium = type === 'medium';

            if (hasValue(company?.logo)) {
                return (
                    <AssetImage
                        uri
                        imageSource={company.logo}
                        imageStyle={Styles.logo(theme, isMedium)}
                        loaderSize="small"
                    />
                );
            }

            return (
                <View
                    width={36}
                    height={36}
                    radius-36
                    background-color={colors.primaryLight}
                    justify-center
                    items-center
                    border-width={1}
                    border-color={theme.divider.secondaryBgColor}
                    {...(isMedium && {
                        width: 32,
                        height: 32,
                        'radius-32': true,
                        'background-color': colors.primary
                    })}
                    {...(isAndroidPlatform() && { 'pt-2': true })}
                >
                    <Text h4 center medium color={colors.white}>
                        {company?.name.toUpperCase().charAt(0)}
                    </Text>
                </View>
            );
        };

        const COMPANIES_LIST = com => {
            const { id, name } = com;
            const isSelected = id === 1;
            return (
                <CtDecorativeButton
                    key={id}
                    button={TouchableHighlight}
                    underlayColor={theme.card.secondary.bgColor}
                    scale={1}
                    px-20
                    py-10
                    justify-center
                    background-color={
                        isSelected && theme.card.secondary.bgColor
                    }
                >
                    <View flex-row items-center>
                        {companyLogo(com, 'large')}
                        <Text
                            h4
                            pl-14
                            pr-14
                            color={
                                isSelected
                                    ? theme.viewLabel.thirdColor
                                    : theme.header.primary.color
                            }
                        >
                            {name}
                        </Text>
                    </View>
                </CtDecorativeButton>
            );
        };

        const isMore = defineSize(companies.length > 6, companies.length > 7);
        const isOnlyOne = companies.length === 1;

        const animationIn = {
            0: {
                translateX: 7,
                translateY: -7,
                opacity: 0
            },
            0.5: {
                translateX: 5,
                translateY: -5,
                opacity: 0.7
            },
            1: {
                translateX: 0,
                translateY: 0,
                opacity: 1
            }
        };

        return (
            <View>
                <CtDecorativeButton withHitSlop mr-11 onPress={this.onToggle}>
                    {companyLogo(company, 'medium')}
                </CtDecorativeButton>

                <AnimateModal
                    visible={visible}
                    onToggle={this.onToggle}
                    modalProps={{
                        animationIn,
                        animationOut: 'fadeOut',
                        animationInTiming: 350,
                        animationOutTiming: 200,
                        ...(!isMore && {
                            swipeDirection: 'right',
                            onSwipeComplete: this.onToggle
                        })
                    }}
                >
                    <Modal>
                        <View flex={1} flex-row items-center pl-22>
                            <Text
                                h6
                                medium
                                flex={1}
                                color={colors.darkGray}
                                letter-spacing={0.3}
                            >
                                {Lng.t('company.text_switch_company', {
                                    locale
                                })}
                            </Text>
                            <CtDecorativeButton
                                style={Styles.closeButton}
                                onPress={this.onToggle}
                                withHitSlop
                            >
                                <AssetSvg
                                    name={CloseIcon}
                                    width={15}
                                    height={15}
                                />
                            </CtDecorativeButton>
                        </View>
                        <ScrollView
                            contentContainerStyle={{
                                marginBottom: !isOnlyOne ? 20 : 35
                            }}
                            showsVerticalScrollIndicator={isMore}
                            bounces={isMore}
                        >
                            {companies.map(com => COMPANIES_LIST(com))}
                        </ScrollView>
                        <CtDecorativeButton
                            scale={1}
                            justify-center
                            items-center
                            flex-row
                            style={Styles.bottomAction(theme)}
                            pt-8
                            pb-10
                        >
                            <Text h3 medium color={colors.primaryLight}>
                                +
                            </Text>
                            <Text h5 ml-10 color={colors.primaryLight}>
                                {Lng.t('company.text_add_new_company', {
                                    locale
                                })}
                            </Text>
                        </CtDecorativeButton>
                    </Modal>
                </AnimateModal>
            </View>
        );
    }
}
