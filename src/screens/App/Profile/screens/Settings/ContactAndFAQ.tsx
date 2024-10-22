import {blackColor, lightGray5Color, lightGray6Color, transparentWhite16Color, whiteColor} from 'constants/colors';
import {screenHeight} from 'constants/common';
import IOLogo from 'assets/images/icons/io-logo.svg';
import ArrowUp from 'assets/images/icons/arrow-up-thin.svg';
import ArrowDown from 'assets/images/icons/arrow-down-thin.svg';
import {FlatList, Text, TouchableOpacity} from 'react-native';
import {ScrollView, View} from 'react-native';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {useState} from 'react';

const ContactAndFAQ = () => {
  const [openedFaqs, setOpenedFaqs] = useState<number[]>([]);

  const faqList: {id: number; title: string; description: string; linkText?: string}[] = [
    {
      id: 0,
      title: 'How do I change my mobile number?',
      description: "Go to the account setting and click on 'Change mobile number'. Follow the prompts to reset it securely.",
    },
    {
      id: 1,
      title: 'How can I update my profile information?',
      description:
        "Go to the 'Profile' section in the app, click on 'Edit,' and update your information. Don't forget to save your changes.",
    },
    {
      id: 2,
      title: 'What security measures are in place to protect my data?',
      description:
        'We prioritize your security. Our app employs robust encryption and authentication protocols to safeguard your data. Learn more in our Privacy Policy.',
    },
    {
      id: 3,
      title: 'How do I report a bug or issue?',
      description: "If you encounter any issues, please report them through the app's 'Feedback' section or contact our support team at ",
      linkText: 'support@invitedonly.io.',
    },
    {
      id: 4,
      title: 'Can I use the app on multiple devices?',
      description:
        "Yes, you can access your account on multiple devices. Ensure you're using the same login credentials to sync your data seamlessly.",
    },
    {
      id: 5,
      title: 'How do I customize my app settings?',
      description:
        "Navigate to the 'Settings' menu within the app, where you can personalize your preferences, notifications, and other features to enhance your experience.",
    },
  ];

  return (
    <View style={{flex: 1, paddingTop: screenHeight / 48, paddingHorizontal: 20, backgroundColor: blackColor}}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: 20, paddingBottom: 60}}
        style={{flex: 1, borderTopColor: transparentWhite16Color, borderTopWidth: 1, borderStyle: 'solid'}}>
        <View
          style={{
            borderRadius: 10,
            backgroundColor: lightGray5Color,
            padding: 20,
            marginTop: 20,
            flex: 1,
          }}>
          <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(18, 812)}}>Contact</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 26, flex: 1}}>
            <View
              style={{
                backgroundColor: blackColor,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                width: 42,
                height: 42,
              }}>
              <IOLogo width={20} height={20} />
            </View>
            <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(16, 812), marginLeft: 6, flex: 1}}>
              support@invitedonly.io
            </Text>
          </View>
        </View>
        <View
          style={{
            borderTopColor: transparentWhite16Color,
            borderTopWidth: 1,
            borderStyle: 'solid',
            marginTop: 34,
          }}>
          <View style={{backgroundColor: lightGray5Color, marginTop: 34, borderRadius: 10, padding: 20}}>
            <Text style={{color: whiteColor, fontSize: RFValue(18, 812), fontFamily: Satoshi500}}>FAQs:</Text>
            <FlatList
              data={faqList}
              keyExtractor={({id}) => id.toString()}
              ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: transparentWhite16Color, width: '100%'}} />}
              renderItem={({item}) => {
                const isActive = openedFaqs.includes(item.id);

                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{flex: 1, paddingVertical: 24}}
                    onPress={() => {
                      if (isActive) {
                        setOpenedFaqs(openedFaqs.filter(id => id !== item.id));
                      } else {
                        setOpenedFaqs([...openedFaqs, item.id]);
                      }
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1}}>
                      <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(16, 812), flex: 1, marginRight: 10}}>
                        {item.title}
                      </Text>
                      {isActive ? <ArrowUp width={16} height={16} /> : <ArrowDown width={16} height={16} />}
                    </View>
                    {isActive && (
                      <Text style={{color: whiteColor, marginTop: 16, fontSize: RFValue(14, 812), fontFamily: Satoshi400}}>
                        {item.description}
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              }}
            />
            <View style={{borderTopColor: transparentWhite16Color, borderTopWidth: 1, borderStyle: 'solid', paddingTop: 20}}>
              <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(16, 812)}}>
                For any other inquiries, feel free to contact our support team. We appreciate your feedback as we strive to provide you with
                the best mobile app experience.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ContactAndFAQ;
