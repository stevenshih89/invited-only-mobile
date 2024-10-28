import { blackColor, lightGray2Color, whiteColor } from 'constants/colors';
import { Satoshi400, Satoshi500 } from 'constants/fonts';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import ArrowRightIcon from 'assets/images/icons/arrow-right-balck.svg';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { paymentPath } from 'constants/pathLocations';
import SafetyAndWellbeing from '../SafetyAndWellbeing/SafetyAndWellbeing';
import { FC, useEffect, useState } from 'react';
import { useSubscriptions } from 'src/store/subscriptionsStore';
import {formatDate} from '../../../../../helpers/formatDate'
import { Linking } from 'react-native';

const ManageSubscription: FC = () => {

  const [subscriptionName, setSubscriptionName] = useState('')

  const currentSubscriptions = useSubscriptions((i: any) => i?.currentSubscriptions)

  const lastSubscriptionName = currentSubscriptions.activeSubscriptions.at(-1)
  const lastSubscriptionData = currentSubscriptions.latestExpirationDate;
  const purchaseDates = currentSubscriptions.allPurchaseDates[lastSubscriptionName]
  
  useEffect(() => {
    switch (lastSubscriptionName) {
      case 'io_59_1w':
        setSubscriptionName('weekly');
        break;
      case 'io_29_3m':
        setSubscriptionName('month');
        break;
      case 'io_25_wk':
        setSubscriptionName('yearly');
        break;
      default:
        break;
    }
  }, []);

  const formateDateFun = (date: string) => {
    const convertDate = date
      .split('T')[0]
      .split('-')
      .reverse()
      .join('.');
      const res = formatDate(convertDate)
      return res
  }

  const navigation = useAppNavigation();

  const goToMyPaymentPath= () => {
    navigation.navigate(paymentPath as never);
  };
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: blackColor}}>
      <View style={{flex: 1, paddingHorizontal: 24}}>
        <View style={{width: '100%', height: 1, marginTop: 8, backgroundColor: lightGray2Color}}></View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{color: whiteColor, textAlign: 'center', fontFamily: Satoshi500, marginBottom: 24, fontSize: RFValue(48, 812)}}>
            You subscribed on iOS
          </Text>
          {currentSubscriptions.activeSubscriptions.length && (
            <Text style={{color: whiteColor, fontSize: RFValue(16, 812), fontFamily: Satoshi400, textAlign: 'center'}}>
              {`Your ${subscriptionName} subscription began on ${formateDateFun(
                purchaseDates,
              )}. It will renew on ${formateDateFun(lastSubscriptionData)}.`}
            </Text>
          )}
          <Text style={{color: whiteColor, marginVertical: 24, fontSize: RFValue(16, 812), fontFamily: Satoshi400, textAlign: 'center'}}>
            However, if you've already stopped recurring payments through iTunes, then your access will lapse at that time instead of
            renewing, and you won't be charged again.
          </Text>
          <Text style={{color: whiteColor, marginBottom: 24, fontSize: RFValue(16, 812), fontFamily: Satoshi400, textAlign: 'center'}}>
            <Text style={{color: whiteColor}}>
              If you would like to stop recurring payments, you can do so {''}
              <Text onPress={() => Linking.openURL('app-settings:')} style={{color: whiteColor, fontSize: RFValue(16,812), textDecorationLine: 'underline'}}>here</Text>.
               {' '}Unfortunately, we're unable to do so on your
              behalf.
            </Text>
          </Text>
          <SafetyAndWellbeing wellbeingShow={false} />
        </View>
        {currentSubscriptions.activeSubscriptions.length < 3 && !currentSubscriptions.activeSubscriptions.includes('io_25_wk') && (
          <TouchableOpacity onPress={goToMyPaymentPath} style={{marginTop: 24}}>
            <LinearGradient
              colors={['#977B4A', '#E5D291', '#A28453']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{paddingVertical: 16, borderRadius: 18, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: RFValue(18, 812), fontFamily: Satoshi500, marginRight: 4}}>Upgrade</Text>
              <ArrowRightIcon width={16} height={16} />
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ManageSubscription;

