import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {FC, useState} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';

//import components
import useStyles from './styles';
import {Satoshi400, Satoshi500, Satoshi700Italic} from 'constants/fonts';
import {blackColor, lightGray5Color, transparentGray90Color, whiteColor} from 'constants/colors';

//import images
import CheckIcon from 'assets/images/icons/check.svg';
import ArrowRightIcon from 'assets/images/icons/arrow-right-balck.svg';
import InfoCircleIcon from 'assets/images/icons/info-circle.svg';
import FlashFillIcon from 'assets/images/icons/flash-filled.svg';
import CloseIcon from 'assets/images/icons/close-circle.svg';
import {useAppNavigation} from 'hooks/useAppNavigation';
import Loader from '../../../../../components/Modal/ModalLoader/Loader';
import {screenHeight} from 'constants/common';
import Config from 'react-native-config';
import {useUser} from 'src/store/userStore';
import { ControlledTooltip } from 'components/ControlledTooltip/ControlledTooltip';
import { whatGet } from 'src/mocks/whatGetSubscribe';
import { useMyPlan } from 'hooks/useMyPlan';

const MyPlan: FC = () => {
  
  const {
    loaderVisible,
    goToPaymentPath,
    goToSuperInvitePay,
    userInfo} = useMyPlan();
  const styles = useStyles();

  return (
    <View>
      <Loader isVisible={loaderVisible} successfulPay={false} textLoader={'Checking for available spots...'} />
      <View>
        <View
          style={{
            alignItems: 'center',
            padding: 24,
            backgroundColor: transparentGray90Color,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 18,
          }}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <FlashFillIcon width={18} height={18} />
            <Text style={{fontSize: RFValue(18, 812), marginLeft: 8, color: whiteColor, fontFamily: Satoshi700Italic}}>
              Super {userInfo?.accountType === 'host' ? 'Invite' : 'Join'}{' '}
              <Text style={{fontFamily: Satoshi400}}>({(userInfo?.superInvites || 0) + (userInfo?.weeklySuperInvites || 0)})</Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={goToSuperInvitePay}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 12,
              paddingVertical: 8,
              backgroundColor: whiteColor,
              borderRadius: 10,
            }}>
            <Text style={{fontSize: RFValue(16, 812), marginRight: 4, fontFamily: Satoshi500, color: blackColor}}>Add more</Text>
            <ArrowRightIcon width={16} height={16} />
          </TouchableOpacity>
        </View>
        {userInfo?.accountType === 'host' && (
          <View style={{width: '100%'}}>
            <TouchableOpacity onPress={goToPaymentPath} style={{marginTop: 24, width: '100%'}}>
              <LinearGradient
                colors={['#977B4A', '#E5D291', '#A28453']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={{
                  height: screenHeight / 14,
                  maxHeight: 60,
                  borderRadius: 18,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Text style={{fontSize: RFValue(18, 812), fontFamily: Satoshi500, marginRight: 4}}>Subscriptions</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {userInfo?.accountType === 'host' && (
        <View>
          <View style={styles.listColumnWrapper}>
            <Text style={styles.textWhatYouGet}>What you {userInfo?.accountType === 'host' ? 'get' : 'have'}:</Text>
            {userInfo?.accountType === 'host' && <Text style={styles.textPremium}>Premium</Text>}
          </View>
          {whatGet.map(item => (
            <View key={item.title} style={styles.itemInTheList}>
              <View style={styles.rowTextAndCheckCircleIcon}>
                <View style={styles.wrapperIcon}>
                  <item.icon />
                </View>
                <Text style={styles.textFromTheList}>{item.title}</Text>
                <ControlledTooltip
                  width={300}
                  height={100}
                  backgroundColor={lightGray5Color}
                  withOverlay={false}
                  popover={
                    <View style={styles.tooltipWrapper}>
                      <View style={styles.rowTitleTooltip}>
                        <Text style={styles.textUnlimitedEventsCreation}>{item.titleDescription}</Text>
                        <CloseIcon />
                      </View>
                      <Text style={styles.textHostAccessIsLimited}>{item.description}</Text>
                    </View>
                  }>
                  <InfoCircleIcon />
                </ControlledTooltip>
              </View>
              <CheckIcon />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default MyPlan;
