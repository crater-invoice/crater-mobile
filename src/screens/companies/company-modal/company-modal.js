import React, {Component} from 'react';
import {TouchableHighlight, ScrollView} from 'react-native';
import {truncate} from 'lodash';
import Styles from './company-modal-style';
import t from 'locales/use-translation';
import {colors} from '@/styles';
import {navigateTo, resetNavigation, routes} from '@/navigation';
import {fetchCompanies, setSelectedCompany} from 'stores/company/actions';
import {IProps, IStates} from './company-modal-type.d';
import {fetchBootstrap} from 'stores/common/actions';
import {definePlatformParam, isAndroidPlatform} from '@/helpers/platform';
import {defineSize} from '@/helpers/size';
import {hasTextLength as hasValue} from '@/constants';
import {PermissionService} from '@/services';
import {
  AnimateModal,
  AssetIcon,
  AssetImage,
  AssetSvg,
  ButtonView,
  Text,
  View
} from '@/components';

export default class CompanyModal extends Component<IProps, IStates> {
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
      navigateTo({route: routes.CREATE_COMPANY, params: {type: 'ADD'}});
    }, 200);
  };

  onSelectCompany = async company => {
    const {selectedCompany, dispatch} = this.props;

    await this.setState({visible: false});

    if (selectedCompany?.id === company?.id) {
      return;
    }

    dispatch(setSelectedCompany(company));

    setTimeout(() => {
      dispatch(fetchBootstrap(() => resetNavigation()));
    }, 100);
  };

  render() {
    const {theme, selectedCompany, companies} = this.props;
    const {visible} = this.state;
    const {Modal} = Styles;

    const companyLogo = company => {
      if (hasValue(company?.logo)) {
        return (
          <AssetImage uri source={company.logo} style={Styles.logo(theme)} />
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
          {...(isAndroidPlatform && {'pt-3': true})}
        >
          <Text h4 center medium color={colors.white}>
            {company?.name.toUpperCase().charAt(0)}
          </Text>
        </View>
      );
    };

    const COMPANIES_LIST = com => {
      const {id, name} = com;
      const isSelected = id === selectedCompany?.id;
      return (
        <ButtonView
          key={id}
          button={TouchableHighlight}
          underlayColor={theme.card.secondary.bgColor}
          scale={1}
          px-20
          py-10
          justify-center
          background-color={isSelected && theme.card.secondary.bgColor}
          onPress={() => this.onSelectCompany(com)}
        >
          <View flex-row items-center>
            {companyLogo(com)}
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
        </ButtonView>
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

    const companyName = s => {
      if (typeof s !== 'string') return '';
      return truncate(s, {
        length: 9,
        omission: '..'
      });
    };

    return (
      <View>
        <ButtonView mr-11 onPress={this.openModal}>
          {selectedCompany ? (
            <View
              justify-center
              items-center
              flex-row
              px-12
              radius-5
              background-color={colors.primary}
              background-color={colors.primary}
              border-width={1}
              border-color={theme.divider.secondaryBgColor}
              class={`py-${definePlatformParam(6, 4)}`}
              {...(isAndroidPlatform && {'pt-5': true})}
            >
              <Text
                class="h4 center medium pr-8"
                color={colors.white}
                letter-spacing={0.2}
              >
                {companyName(selectedCompany?.name)}
              </Text>
              <AssetIcon
                name={'angle-down'}
                size={17}
                color={colors.white3}
                style={Styles.caret}
              />
            </View>
          ) : null}
        </ButtonView>

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
              swipeDirection: ['left', 'right'],
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
                {t('company.switch_company')}
              </Text>
              <ButtonView
                style={Styles.closeButton}
                onPress={this.onToggle}
                withHitSlop
              >
                <AssetSvg
                  name={AssetSvg.icons.close2(theme.viewLabel.fourthColor)}
                  width={15}
                  height={15}
                />
              </ButtonView>
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
            {PermissionService.isOwner ? (
              <ButtonView
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
                  {t('company.add_new_company')}
                </Text>
              </ButtonView>
            ) : null}
          </Modal>
        </AnimateModal>
      </View>
    );
  }
}
