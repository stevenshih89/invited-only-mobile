import React, {FC, useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import ArrowLeftArrow from 'assets/images/icons/arrow-left.svg';
import {backgroundGradientColors, blackColor, transparentWhite16Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {signUpPath} from 'constants/pathLocations';
import LinearGradient from 'react-native-linear-gradient';
import {getSubscriptions} from 'src/api/purchase';
import getSymbolFromCurrency from 'currency-symbol-map';

interface PlanListItem {
  id: number;
  identifier?: string;
  title: string;
  duration: number;
  durationName: string;
  description: string;
  pricePerDuration: string;
  fullPrice?: string;
  weeksInPeriod: number;
}

const Eula: FC = (): JSX.Element => {
  const [dataEula, setDataEula] = useState([
    {
      id: 0,
      title: '',
      description:
        'This End User License Agreement (“Agreement”) is a legal contract between you (“User”) and [Company Name] (“Licensor”), governing your use of the [App Name] software application (“the App”). By creating an account, downloading, or using the App, you agree to the terms outlined here. If you do not agree, do not use the App.',
    },
    {
      id: 1,
      title: '1. LICENSE GRANT',
      description:
        'Subject to the terms of this Agreement, Licensor grants you a limited, non-exclusive, non-transferable, and revocable license to use the App on any Apple-branded devices running iOS or macOS that you own or control.',
    },
    {
      id: 2,
      title: '2. SUBSCRIPTION OPTIONS',
      description: '',
    },
    {
      id: 3,
      title: '3. USER-GENERATED CONTENT',
      description:
        'Users can generate content within the App by interacting, messaging, and participating in events.\n\n' +
        '3.1. No Tolerance for Objectionable Content\n\n' +
        'We have a zero-tolerance policy for objectionable content, which includes but is not limited to:\n\n' +
        '    • Hate speech, discriminatory remarks, or harassment\n\n' +
        '    • Offensive, sexually explicit, or violent content\n\n' +
        '    • Threats, abuse, or bullying\n\n' +
        'Violations may result in immediate suspension or termination of your account.\n\n' +
        '3.2 Responsibility for Content\n\n' +
        'You are solely responsible for any content you upload or share in the App. By submitting content, you grant [Company Name] a license to use, modify, distribute, and display that content within the App.',
    },
    {
      id: 4,
      title: '4. CODE OF CONDUCT',
      description:
        'While using the App, you agree to:\n\n' +
        '    • Respect the rights of other users\n\n' +
        '    • Avoid abusive language or behavior\n\n' +
        '    • Refrain from posting misleading, harmful, or false information\n\n' +
        'Failure to adhere to the Code of Conduct may result in account suspension or termination.',
    },
    {
      id: 5,
      title: '5. BLOCKING ABUSIVE USERS',
      description:
        'You have the option to block users who engage in abusive or inappropriate behavior. Once blocked, they will be unable to interact with you through messaging or event invitations.',
    },
    {
      id: 6,
      title: '6. PRIVACY POLICY',
      description: 'Please refer to our [Privacy Policy] for details on how we collect, use, and protect your personal information.',
    },
    {
      id: 7,
      title: '7. TERMINATION',
      description:
        'This Agreement remains in effect until terminated by you or [Company Name]. You may terminate the Agreement by uninstalling the App or canceling your subscription as outlined in Section 2. Licensor reserves the right to terminate or suspend your account at any time for violations of this Agreement or if your actions are deemed harmful to the community.',
    },
    {
      id: 8,
      title: '8. NO WARRANTY',
      description:
        'The App is provided “AS IS” without warranties of any kind, express or implied. Licensor does not guarantee that the App will be error-free or uninterrupted.',
    },
    {
      id: 9,
      title: '9. LIMITATION OF LIABILITY',
      description:
        'In no event shall Licensor or its affiliates be liable for any indirect, incidental, special, or consequential damages, including loss of data or interruptions of service.',
    },
    {
      id: 10,
      title: '10. Eligibility',
      description: 'To use the App, you must be at least 18 years old and legally capable of entering into this Agreement.',
    },
    {
      id: 11,
      title: '11. GOVERNING LAW',
      description:
        'This Agreement is governed by the laws of the State of Delaware, USA, without regard to its conflict of law provisions.',
    },
    {
      id: 12,
      title: '12. APPLE REQUIREMENTS',
      description:
        'This Agreement is between you and Invited Only Inc., not Apple, Inc. However, you acknowledge that Apple and its subsidiaries are third-party beneficiaries of this Agreement and may enforce its terms. You must also comply with the App Store Terms of Service.',
    },
    {
      id: 13,
      title: '13. CHANGES TO THE TERMS',
      description:
        'We reserve the right to modify or update this Agreement at any time. Changes will take effect upon posting to the App, and your continued use signifies acceptance of the new terms.',
    },
    {
      id: 14,
      title: '14. CONTACT INFORMATION',
      description: 'If you have any questions or concerns about this Agreement, please contact us at support@invitedonly.io.',
    },
    {
      id: 15,
      title: 'ACCEPTANCE',
      description:
        'By clicking “Agree” or installing the App, you acknowledge that you have read and understood this Agreement and agree to its terms, including subscription fees, renewal policies, and usage guidelines.\n\n' +
        'This combined EULA integrates both sets of terms while removing redundancies, providing clear guidance on subscription models, content policies, and user responsibilities.',
    },
  ]);
  const navigation = useAppNavigation();

  const [plansList] = useState<PlanListItem[]>([
    {
      id: 0,
      title: 'BILLED WEEKLY',
      duration: 1,
      durationName: 'week',
      description: 'Week',
      pricePerDuration: '$59/wk',
      fullPrice: '$59',
      weeksInPeriod: 1,
    },
    {
      id: 1,
      title: 'BILLED ANNUALLY',
      duration: 1,
      durationName: 'year',
      description: 'Year',
      pricePerDuration: '$25/wk',
      fullPrice: '$1300',
      weeksInPeriod: 52,
    },
    {
      id: 2,
      title: 'BILLED 3 MONTH',
      duration: 3,
      durationName: 'months',
      description: 'Months',
      pricePerDuration: '$29/wk',
      fullPrice: '$357',
      weeksInPeriod: 13, // trust me this is true
    },
  ]);
  const [loading, setLoading] = useState(false);

  const getSubscriptionsList = async () => {
    try {
      setLoading(true);
      const subscriptionsList = await getSubscriptions();
      if (!subscriptionsList.length) {
        return;
      }

      const getIdentifier = (offer: any) => {
        let res;
        switch (offer.identifier) {
          case '$rc_weekly':
            res = 'io_59_1w';
            break;
          case '$rc_annual':
            res = 'io_25_wk';
            break;
          case '$rc_three_month':
            res = 'io_29_3m';
            break;
          default:
            '';
        }
        return res;
      };

      const products = subscriptionsList.map((offer, idx) => ({
        id: idx,
        identifier: getIdentifier(offer),
        title: plansList[idx].title,
        duration: plansList[idx].duration,
        durationName: plansList[idx].durationName,
        description: plansList[idx].description,
        pricePerDuration:
          getSymbolFromCurrency(offer.product.currencyCode) + (offer.product.price / plansList[idx].weeksInPeriod).toFixed(2) + '/wk',
        priceString: offer.product.priceString,
        fullPrice: offer.product.priceString,
        package: offer,
      }));
      setDataEula(prev => {
        const newData = [...prev];
        newData[2].description =
          'The App offers the following subscription types:\n\n' +
          `    • Weekly Subscription: ${products.find(product => product.identifier === 'io_59_1w')?.fullPrice} per week\n\n` +
          `    • Monthly Subscription: ${products.find(product => product.identifier === 'io_29_3m')?.fullPrice} per month\n\n` +
          `    • Annual Subscription: ${products.find(product => product.identifier === 'io_25_wk')?.fullPrice} per year\n\n` +
          'By subscribing, you agree to the applicable subscription fees.\n\n' +
          '2.1 Automatic Renewal\n\n' +
          'Subscriptions automatically renew unless canceled at least 24 hours before the end of the current period. Renewal charges will be made to your Apple ID account at the rate associated with your selected subscription plan.\n\n' +
          '2.2 Payment and Billing\n\n' +
          'Payments will be charged to your Apple ID account upon confirmation of the subscription. Renewal payments are charged within 24 hours prior to the end of the current subscription period.\n\n' +
          '2.3 Cancellation\n\n' +
          'You can cancel your subscription at any time via your Apple App Store account settings. Canceling disables auto-renewal, but you will retain access until the current billing period ends. No refunds will be given for the remaining time of a subscription.';
        return newData;
      });
      setLoading(false);
    } catch (error) {
      console.warn(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSubscriptionsList();
  }, []);

  const [endReached, setEndReached] = useState(false);

  const renderItem = useCallback(
    (item: any) => (
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: transparentWhite16Color,
        }}>
        <Text
          style={{
            color: whiteColor,
            fontFamily: Satoshi700,
            fontSize: RFValue(18, 932),
            marginTop: 24,
            marginBottom: 16,
          }}>
          {item.title}
        </Text>
        <Text
          style={{
            color: whiteColor,
            fontFamily: Satoshi400,
            fontSize: RFValue(16, 932),
            marginBottom: 24,
          }}>
          {item.description}
        </Text>
      </View>
    ),
    [],
  );

  const onEndReached = useCallback(() => {
    setEndReached(true);
  }, []);

  if (loading) {
    return (
      <LinearGradient colors={backgroundGradientColors} start={{x: 0, y: 1}} end={{x: 0, y: 0}} style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color={whiteColor} />
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={backgroundGradientColors} start={{x: 0, y: 1}} end={{x: 0, y: 0}} style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, paddingHorizontal: 24}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: transparentWhite16Color,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{marginTop: 10}}>
              <ArrowLeftArrow width={24} height={24} />
            </TouchableOpacity>
            <View style={{width: '80%'}}>
              <Text
                style={{
                  fontFamily: Satoshi700,
                  fontSize: RFValue(24, 932),
                  color: whiteColor,
                  textAlign: 'center',
                  marginBottom: 14,
                }}>
                End-User License Agreement (EULA)
              </Text>
            </View>
            <View />
          </View>
          <FlatList
            data={dataEula}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => renderItem(item)}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.1}
          />
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                flex: 1,
                paddingVertical: 13,
                marginTop: 24,
                alignItems: 'center',
              }}>
              <Text style={{color: whiteColor, fontSize: RFValue(20, 932), fontFamily: Satoshi500}}>Deny</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!endReached}
              onPress={() => navigation.navigate(signUpPath as never)}
              style={{
                flex: 1.5,
                paddingVertical: 13,
                backgroundColor: endReached ? whiteColor : transparentWhite16Color,
                borderRadius: 10,
                marginTop: 24,
                alignItems: 'center',
              }}>
              <Text style={{color: blackColor, fontSize: RFValue(20, 932), fontFamily: Satoshi500}}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Eula;
