import React, {Component} from 'react';
import {TouchableHighlight, ScrollView} from 'react-native';
import Styles from './styles';
import t from 'locales/use-translation';
import {colors} from '@/styles';
import {routes} from '@/navigation';
import {fetchCompanies} from '../../actions';
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
    this.state = {visible: false};
  }

  onToggle = () => {
    this.setState(({visible}) => {
      return {visible: !visible};
    });
  };

  openModal = async () => {
    await this.setState({visible: true});
    this.props.dispatch?.(fetchCompanies());
  };

  addNewCompany = async () => {
    await this.setState({visible: false});
    setTimeout(() => {
      this.props.navigation.navigate(routes.COMPANY);
    }, 200);
  };

  render() {
    const {theme, company, companies} = this.props;
    const {visible} = this.state;

    const {Modal} = Styles;

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
          {...(isAndroidPlatform && {'pt-2': true})}
        >
          <Text h4 center medium color={colors.white}>
            {company?.name.toUpperCase().charAt(0)}
          </Text>
        </View>
      );
    };

    const COMPANIES_LIST = com => {
      const {id, name} = com;
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
          background-color={isSelected && theme.card.secondary.bgColor}
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

    const isMore = defineSize(
      companies.length > 6,
      companies.length > 6,
      companies.length > 7,
      companies.length > 7
    );
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
        <CtDecorativeButton withHitSlop mr-11 onPress={this.openModal}>
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
            backdropTransitionInTiming: 1,
            backdropTransitionOutTiming: 1,
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
                color={theme.text.fifthColor}
                letter-spacing={0.3}
              >
                {t('company.text_switch_company')}
              </Text>
              <CtDecorativeButton
                style={Styles.closeButton}
                onPress={this.onToggle}
                withHitSlop
              >
                <AssetSvg
                  name={AssetSvg.icons.close2(theme.viewLabel.fourthColor)}
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
              onPress={this.addNewCompany}
            >
              <Text h3 medium color={colors.primaryLight}>
                +
              </Text>
              <Text h5 ml-10 color={colors.primaryLight}>
                {t('company.text_add_new_company')}
              </Text>
            </CtDecorativeButton>
          </Modal>
        </AnimateModal>
      </View>
    );
  }
}
