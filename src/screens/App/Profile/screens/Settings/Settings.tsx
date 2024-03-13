import {blackColor, lightGray5Color, lightGray6Color, transparentWhite16Color, whiteColor} from 'constants/colors';
import {useState} from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import LogoutIcon from 'assets/images/icons/logout.svg';
import UserEdit from 'assets/images/icons/user-edit.svg';
import {Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import ModalLogout from './LogoutModal';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {accountSettingPath} from 'constants/pathLocations';

const Settings = () => {
  const [isVisibleLogoutModal, setIsVisibleLogoutModal] = useState(false);

  const navigation = useAppNavigation();

  const openLogoutModal = () => {
    setIsVisibleLogoutModal(true);
  };

  const goToAccountSetting = () => {
    navigation.navigate(accountSettingPath as never);
  };

  const settingsList = [
    {
      id: 0,
      title: 'Account setting',
      icon: UserEdit,
      onPress: goToAccountSetting,
    },
    {
      id: 1,
      title: 'Log out',
      icon: LogoutIcon,
      onPress: openLogoutModal,
    },
  ];

  return (
    <>
      <View style={{backgroundColor: lightGray6Color, flex: 1, paddingHorizontal: 20}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingTop: 20, paddingBottom: 50}}
          style={{flex: 1, borderTopColor: transparentWhite16Color, borderTopWidth: 1, borderStyle: 'solid'}}>
          <FlatList
            data={settingsList}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{height: 24}} />}
            renderItem={({item}) => {
              const Icon = item.icon;
              return (
                <TouchableOpacity
                  onPress={item.onPress}
                  activeOpacity={0.7}
                  style={{padding: 20, backgroundColor: lightGray5Color, borderRadius: 10}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{width: 32, height: 32, justifyContent: 'center', alignItems: 'center', backgroundColor: blackColor, borderRadius: 100}}>
                      <Icon width={16} height={16} />
                    </View>
                    <Text style={{color: whiteColor, marginLeft: 10, fontFamily: Satoshi500, fontSize: RFValue(18, 812)}}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>
      </View>
      <ModalLogout isVisible={isVisibleLogoutModal} onClose={() => setIsVisibleLogoutModal(false)} />
    </>
  );
};

export default Settings;
