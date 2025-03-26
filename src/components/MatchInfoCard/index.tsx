import {FC} from 'react';
import {View, Text} from 'react-native';
import * as S from './MatchInfoCard.style';

//import components
import {black4Color, blackColor} from 'constants/colors.ts';

//import icons
import CheckStarWhite from 'assets/images/icons/check-star-white.svg';
import CheckStarBlackIcon from 'assets/images/icons/check-star.svg';
import CalendarCheckBlackIcon from 'assets/images/icons/calendar-check-black.svg';
import LocationBlackIcon from 'assets/images/icons/location-black.svg';
import {Satoshi500, Satoshi700} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';
import {screenWidth} from 'constants/common';

interface MatchInfoCardI {
  isProfile: boolean;
  usersList: any[];
  image: string | undefined;
  online: boolean;
  accountType: string;
  premium: boolean;
  name: string | undefined;
  age: string;
  confirmedAccount: boolean;
  joinEvents?: number;
  location?: string | null;
  styleContainer?: any;
  showHeaderInfo?: boolean;
  imageEvent?: string;
  guestsInvited: number;
  isGuest: boolean;
  isHost: boolean;
}

const MatchInfoCard: FC<MatchInfoCardI> = ({
  isProfile,
  usersList,
  image,
  online,
  accountType,
  premium,
  name,
  age,
  confirmedAccount,
  joinEvents,
  location,
  styleContainer,
  showHeaderInfo,
  imageEvent,
  guestsInvited,
  isGuest,
  isHost,
}) => {
  const getUsersListAccepted = () => {
    const filter = usersList?.filter(item => item.status === 'invite_match');
    return filter?.length ? filter.length : 0;
  };

  return (
    <S.EventImage
      style={[
        {
          justifyContent: showHeaderInfo ? 'space-between' : 'flex-end',
        },
        styleContainer,
      ]}
      source={{uri: imageEvent && !isGuest ? imageEvent : image}}>
      <S.OverlayGradient />
      {showHeaderInfo && (
        <View style={{flexDirection: 'row', padding: 15}}>
          <View style={{alignSelf: 'flex-start'}}>
            <FastImage style={{width: 30, height: 30, borderRadius: 30}} source={{uri: image}} />
            {online && <S.OnlineIndicator />}
          </View>
          <View style={{marginLeft: 6, justifyContent: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <S.BadgeContainer>
                {accountType === 'guest' && <S.BadgeText>Guest</S.BadgeText>}
                {accountType === 'host' && <S.BadgeText>Host</S.BadgeText>}
              </S.BadgeContainer>
              {premium && (
                <S.PremiumGradient>{(premium || accountType === 'guest') && <S.TextPremium>Premium</S.TextPremium>}</S.PremiumGradient>
              )}
            </View>
            <S.UserInfoWrapper>
              <S.NameText>
                {name}
                <Text>,</Text>
              </S.NameText>
              {!isProfile && <S.AgeText> {age}</S.AgeText>}
              <View style={{marginLeft: 5}}>{confirmedAccount && <CheckStarWhite width={12} height={12} />}</View>
            </S.UserInfoWrapper>
          </View>
        </View>
      )}
      <S.FooterContainer>
        <S.FooterText>{name}</S.FooterText>
        <View style={{marginLeft: 5}}>{confirmedAccount && <CheckStarWhite width={15} height={15} />}</View>
      </S.FooterContainer>
      <S.DetailsContainer>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{alignSelf: 'flex-start'}}>
              <FastImage style={{width: 30, height: 30, borderRadius: 30}} source={{uri: image}} />
              {online && <S.OnlineIndicator />}
            </View>
            <View style={{marginLeft: 6, justifyContent: 'center'}}>
              <View style={{flexDirection: 'row'}}>
                <S.BadgeContainer>
                  {accountType === 'guest' && <S.BadgeText>Guest</S.BadgeText>}
                  {accountType === 'host' && <S.BadgeText>Host</S.BadgeText>}
                </S.BadgeContainer>
                {premium && (
                  <S.PremiumGradient>{(premium || accountType === 'guest') && <S.TextPremium>Premium</S.TextPremium>}</S.PremiumGradient>
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <S.NameText>
                  {name}
                  {!isProfile && age && <Text>,</Text>}
                </S.NameText>
                {!isProfile && age && <S.AgeText> {age}</S.AgeText>}
                <View style={{marginLeft: 5}}>{confirmedAccount && <CheckStarBlackIcon width={12} height={12} />}</View>
              </View>
            </View>
          </View>
          {isHost && (
            <S.GuestInfoContainer
              style={{
                paddingHorizontal: screenWidth > 400 ? 8 : 4,
                paddingVertical: screenWidth > 400 ? 4 : 2,
              }}>
              <FastImage style={{width: 20, height: 20, borderRadius: 20}} source={{uri: imageEvent}} />
              <View style={{marginLeft: 6, alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: RFValue(14, 812),
                    color: blackColor,
                    fontFamily: Satoshi700,
                  }}>
                  {getUsersListAccepted()}/{guestsInvited}
                </Text>
                <Text
                  style={{
                    fontSize: RFValue(6, 812),
                    color: blackColor,
                    fontFamily: Satoshi500,
                  }}>
                  Guest List
                </Text>
              </View>
            </S.GuestInfoContainer>
          )}
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CalendarCheckBlackIcon width={12} height={12} />
          <S.JoinEventsText>Join Events: {joinEvents ? joinEvents : 0}</S.JoinEventsText>
          {location && (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <LocationBlackIcon width={12} height={12} />
              <Text
                style={{
                  fontSize: RFValue(10, 812),
                  color: black4Color,
                  fontFamily: Satoshi500,
                  marginLeft: 5,
                }}>
                {location}
              </Text>
            </View>
          )}
        </View>
      </S.DetailsContainer>
    </S.EventImage>
  );
};

export default MatchInfoCard;
