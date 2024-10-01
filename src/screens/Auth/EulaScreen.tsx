import React, {FC, useCallback, useState} from 'react';
import {FlatList, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import ArrowLeftArrow from 'assets/images/icons/arrow-left.svg';
import {blackColor, lightGray12Color, transparentWhite16Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {signUpPath} from 'constants/pathLocations';

const dataEula = [
  {
    id: 1,
    title: '1. Acceptance of Terms',
    description:
      'Welcome to Tabler, an application ("the App") provided by Tabler Inc. ("the Company"). By using the App, you agree to comply with and be bound by the terms of this End-User License Agreement (EULA).',
  },
  {
    id: 2,
    title: '2. License Grant',
    description:
      '2.1. Scope: The Company grants you a personal, non-exclusive, non-transferable license to use the App on your device, subject to the terms and conditions of this EULA.\n\n' +
      '2.2. Restrictions: You may not modify, decompile, disassemble, reverse engineer, or attempt to access the source code of the App. You may not sublicense, rent, lease, sell, or distribute the App.',
  },
  {
    id: 3,
    title: '3. User Content',
    description:
      '3.1. Ownership: You retain ownership of any content you upload or submit through the App. By using the App, you grant the Company a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, and display your content in connection with the App.',
  },
  {
    id: 4,
    title: '4. Privacy',
    description:
      '4.1. Data Collection: The Company may collect and use information about your use of the App as described in our Privacy Policy.',
  },
  {
    id: 5,
    title: '5. Updates',
    description:
      'The Company may provide updates or enhancements to the App. You consent to these updates automatically as part of your use of the App.',
  },
  {
    id: 6,
    title: '6. Termination',
    description:
      'The Company may terminate or suspend your access to the App at its sole discretion, without notice, for any reason, including a breach of this EULA.',
  },
  {
    id: 7,
    title: '7. Disclaimers',
    description:
      'The App is provided "as is" without warranties of any kind. The Company disclaims all warranties and shall not be liable for any damages or losses resulting from the use of the App.',
  },
  {
    id: 8,
    title: '8. Content Responsibility',
    description:
      'The Company is not responsible for any content that users post, upload, or share on the App. Users are solely responsible for the content they submit. The Company does not endorse, verify, or guarantee the accuracy, quality, or legality of user-generated content.',
  },
  {
    id: 9,
    title: '9. Governing Law and Jurisdiction',
    description:
      'This EULA is governed by and construed in accordance with the laws of the state of Florida, United States. Any legal action arising under or in connection with this EULA shall be subject to the exclusive jurisdiction of the state and federal courts located within Miami-Dade County, Florida.',
  },
  {
    id: 10,
    title: '10. Changes to EULA',
    description:
      'The Company reserves the right to modify or update this EULA. You will be notified of any changes, and your continued use of the App after such modifications constitutes acceptance of the revised EULA.',
  },
  {
    id: 11,
    title: '11. Contact',
    description: 'If you have any questions about this EULA, please contact us at legal@tablerapp.com.',
  },
];

const Eula: FC = (): JSX.Element => {
  const navigation = useAppNavigation();

  const [endReached, setEndReached] = useState(false)

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
            fontSize: RFValue(18, 812),
            marginTop: 24,
            marginBottom: 16,
          }}>
          {item.title}
        </Text>
        <Text
          style={{
            color: whiteColor,
            fontFamily: Satoshi400,
            fontSize: RFValue(16, 812),
            marginBottom: 24,
          }}>
          {item.description}
        </Text>
      </View>
    ),
    [],
  );

  const onEndReached = useCallback(() => {
    setEndReached(true)
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: blackColor}}>
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
                  fontSize: RFValue(24, 812),
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
              <Text style={{color: whiteColor, fontSize: RFValue(20, 812), fontFamily: Satoshi500}}>Deny</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!endReached}
              onPress={() => navigation.navigate(signUpPath as never)}
              style={{
                flex: 1.5,
                paddingVertical: 13,
                backgroundColor: endReached? whiteColor: transparentWhite16Color,
                borderRadius: 10,
                marginTop: 24,
                alignItems: 'center',
              }}>
              <Text style={{color: blackColor, fontSize: RFValue(20, 812), fontFamily: Satoshi500}}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Eula;
