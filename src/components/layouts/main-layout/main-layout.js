import React from 'react';
import {View, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {Field} from 'redux-form';
import {styles, Container} from './styles';
import {BaseInput, ButtonView, CtHeader} from '../..';
import {Content} from '../../content';
import t from 'locales/use-translation';
import {STATUS_BAR_CONTENT} from '@/utils';
import {View as CtView} from '@/components';
import {AssetIcon} from '@/components/asset-icon';
import {Filter} from '@/components';
import {CompanyModal} from 'screens/companies';
import {commonSelector} from 'stores/common/selectors';
import {BaseDivider} from '@/components';
import {defineSize} from '@/helpers/size';
import {IProps} from './type.d';
import {currentCompanySelector} from 'stores/company/selectors';
import {hasValue} from '@/constants';
import {PermissionService} from '@/services';

const Layout = (props: IProps) => {
  const {
    children,
    headerProps,
    onSearch,
    bottomDivider,
    hasSearchField = true,
    bottomAction,
    filterProps,
    inputProps,
    dividerStyle,
    loadingProps,
    searchFieldProps,
    plusButtonOnPress,
    selectedCompany,
    theme,
    route
  } = props;

  let bodyStyle = {};

  if (props?.bodyStyle) {
    props?.bodyStyle.split(' ').map(property => {
      if (property === 'is-full-listView') {
        bodyStyle = {
          ...bodyStyle,
          [`pb-${defineSize(0, 0, 0, 30)}`]: true
        };
        return;
      }

      bodyStyle = {...bodyStyle, [property]: true};
    });
  }

  return (
    <>
      <Container>
        <StatusBar
          barStyle={STATUS_BAR_CONTENT[(theme?.mode)]}
          hidden={false}
          translucent={true}
          backgroundColor={theme?.backgroundColor}
        />

        <View style={styles.content}>
          <CtHeader
            titleStyle={{
              ...styles.headerTitleStyle(
                theme,
                headerProps?.leftIcon || headerProps?.leftIconPress
              ),
              ...headerProps?.withTitleStyle
            }}
            placement="left"
            transparent
            noBorder
            hasCircle
            {...((headerProps?.leftIcon || headerProps?.leftIconPress) && {
              leftArrow: 'primary'
            })}
            containerStyle={styles.header}
            {...headerProps}
            theme={theme}
            filterProps={!props?.['with-input-filter'] && filterProps}
            {...(props?.['with-company'] &&
              hasValue(selectedCompany) && {
                rightComponent: <CompanyModal />
              })}
          />

          {hasSearchField && (
            <View style={styles.searchFieldContainer}>
              <Field
                name="search"
                component={BaseInput}
                placeholder={t('search.title')}
                inputProps={{
                  ...(filterProps &&
                    props?.['with-input-filter'] && {
                      rightIcon: (
                        <Filter {...filterProps} theme={theme} is-small />
                      )
                    }),
                  ...inputProps
                }}
                onChangeText={onSearch}
                height={40}
                rounded
                fieldStyle={{
                  ...styles.inputField,
                  ...searchFieldProps?.inputFieldStyle
                }}
                {...searchFieldProps}
              />
            </View>
          )}

          {bottomDivider && (
            <BaseDivider
              dividerStyle={dividerStyle && dividerStyle}
              theme={theme}
            />
          )}

          <Content loadingProps={loadingProps} theme={theme}>
            <CtView flex={1} {...bodyStyle}>
              {children}
            </CtView>
          </Content>
        </View>

        {bottomAction}
      </Container>
      {plusButtonOnPress && PermissionService.isAllowToCreate(route?.name) ? (
        <View style={styles.floatingActionView}>
          <ButtonView
            justify-center
            items-center
            background-color={theme?.icons.circle.backgroundColor}
            style={styles.floatingAction(theme)}
            onPress={plusButtonOnPress}
            withHitSlop
            scale={1}
          >
            <AssetIcon
              name="plus"
              size={20}
              style={{
                color: theme?.icons?.plus?.backgroundColor
              }}
            />
          </ButtonView>
        </View>
      ) : null}
    </>
  );
};

const mapStateToProps = state => ({
  selectedCompany: currentCompanySelector(state),
  ...commonSelector(state)
});

export const MainLayout = connect(mapStateToProps)(Layout);
