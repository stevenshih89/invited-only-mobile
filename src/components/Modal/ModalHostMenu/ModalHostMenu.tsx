import React, {FC, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';

//import components
import useStyles from 'components/Modal/ModalHostMenu/styles.ts';
import ModalCancelOrConfirmInvitation from 'components/Modal/ModalCancelOrConfirmInvitation/ModalCancelOrConfirmInvitation.tsx';

//import icons
import PersonIcon from 'assets/images/icons/profile-2user.svg';
import UserIcon from 'assets/images/icons/person.svg';
import CalendarIcon from 'assets/images/icons/calendar.svg';
import ChatActiveIcon from 'assets/images/tab-bar/chat-active.svg';
import InfoIcon from 'assets/images/icons/info-circle-fill.svg';
import CloseIcon from 'assets/images/icons/close-circle.svg';
import {chatCorrespondencePath} from 'constants/pathLocations.ts';
import {gray1Color} from 'constants/colors.ts';
import ModalReport from "components/Modal/ModalReport/ModalReport.tsx";

interface HostMenu {
  hostMenu?: boolean;
  setHostMenu?: any;
  image?: any;
  imageBg?: any;
  name?: string;
  data?: string;
  girlInvitation?: number;
}

const ModalHostMenu: FC<HostMenu> = ({girlInvitation, data, hostMenu, setHostMenu, image, name, imageBg}) => {
  const [cancelInvitation, setCancelInvitation] = useState<boolean>(false);
  const [modalReport, setModalReport] = useState<boolean>(false);
  const navigation = useAppNavigation();
  const styles = useStyles();
  return (
    <Modal
      isVisible={hostMenu}
      useNativeDriver={false}
      propagateSwipe={true}
      backdropColor={'rgba(0, 0, 0, 0.94)'}
      testID={'bottom-half-modal-open-button'}
      onBackdropPress={() => setHostMenu(false)}
      onSwipeComplete={() => setHostMenu(false)}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
        zIndex: 999,
      }}
      swipeDirection={['down']}>
      <View style={styles.wrapper}>
        <View style={styles.whiteLine} />
        <View style={{width: '100%'}}>
          <Image resizeMode="contain" source={imageBg} style={{width: '100%'}} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 21}}>
            <Text style={{color: 'white'}}>{name}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <PersonIcon width={12} height={12} />
              <Text style={{color: 'white', marginLeft: 5}}>{girlInvitation} x Girl invitation</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CalendarIcon width={12} height={12} />
              <Text style={{color: 'white', marginLeft: 5}}>{data}</Text>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Image source={image} style={styles.userPhoto} />
              {/*{online && <View style={styles.greenCircle} />}*/}
              <View style={styles.greenCircle} />
            </View>
            <View style={{marginLeft: 15}}>
              <Text style={{color: 'white'}}>Simon</Text>
              <Text style={{color: 'white'}}>Online</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              setHostMenu(false);
              // @ts-ignore
              navigation.navigate(chatCorrespondencePath, {
                screen: chatCorrespondencePath,
                params: {image: image, title: name, online: true},
              });
            }}>
            <ChatActiveIcon />
          </TouchableOpacity>
        </View>
        <View style={{width: '100%', marginTop: 34}}>
          <TouchableOpacity style={styles.buttonEvent}>
            <CalendarIcon style={styles.iconButton} width={14} height={14} />
            <Text style={styles.textButton}>Event information</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonEvent}>
            <UserIcon style={styles.iconButton} width={14} height={14} />
            <Text style={styles.textButton}>Host profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalReport(true)} style={styles.buttonEvent}>
            <InfoIcon style={styles.iconButton} width={14} height={14} />
            <Text style={styles.textButton}>Report</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCancelInvitation(true)}
            style={[styles.buttonEvent, {borderBottomWidth: 1, borderBottomColor: gray1Color}]}>
            <CloseIcon style={styles.iconButton} width={14} height={14} />
            <Text style={styles.textButton}>Cancel invitation</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ModalReport modalReport={modalReport} setModalReport={setModalReport} />
      <ModalCancelOrConfirmInvitation
        girlInvitation={girlInvitation}
        data={data}
        imageBg={imageBg}
        name={name}
        typeModal="cancel"
        title={name}
        setCancelInvitation={setCancelInvitation}
        cancelInvitation={cancelInvitation}
        setHostMenu={setHostMenu}
      />
    </Modal>
  );
};

export default ModalHostMenu;
