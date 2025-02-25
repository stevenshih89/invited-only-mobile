import {blackColor, lightGray5Color, transparentWhite16Color, whiteColor} from 'constants/colors';
import {screenHeight} from 'constants/common';
import IOLogo from 'assets/images/icons/io-logo.svg';
import ArrowUp from 'assets/images/icons/arrow-up-thin.svg';
import ArrowDown from 'assets/images/icons/arrow-down-thin.svg';
import {FlatList, Text, TouchableOpacity} from 'react-native';
import {ScrollView, View} from 'react-native';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {useState} from 'react';
import { faqList } from 'helpers/getFaqList';

const ContactAndFAQ = () => {
  const [openedFaqs, setOpenedFaqs] = useState<number[]>([]);

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
              support@invitedonly.app
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
