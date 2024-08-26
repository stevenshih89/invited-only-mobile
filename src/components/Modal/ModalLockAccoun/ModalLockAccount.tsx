import {Text, TouchableOpacity, View} from 'react-native';
import {FC} from 'react';
import Lock from 'assets/images/icons/lock.svg';
import useStyles from './styles';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {commonStackPath, invitationCodePath, paymentPath} from 'constants/pathLocations';
import {transparent60Color, transparent80Color} from 'constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi500} from 'constants/fonts';

const ModalLockAccount: FC<{
  isPremium?: boolean;
  isVisibleButton: boolean;
  text?: string
}> = ({isVisibleButton, isPremium, text}) => {
  const styles = useStyles();

  const navigation = useAppNavigation();

  const goToCodeConfirmation = (): void => {
    // @ts-ignore
    navigation.navigate(commonStackPath, {screen: invitationCodePath});
  };

  const goToMyProfileView = () => {
    // @ts-ignore
    // loaderVisibleFun()
    navigation.navigate(paymentPath as never);
  };

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: transparent60Color,
        zIndex: 1000,
      }}>
      <View style={styles.lockedWrapper}>
        <View style={styles.lockIconWr}>
          <Lock width={24} height={24} />
        </View>
        <View style={styles.lockDescWr}>
          <Text style={styles.lockedTitle}>Locked</Text>
          <Text style={styles.lockedSubtitle}>
            {text? text: 'Your account is under review. Thank you for your patience. You will be notified if your account is accepted'}
          </Text>
          <View style={styles.lockedHaveCodeWr}>
            <Text style={styles.lockedHaveCodeTitle}>Have a code?</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={goToCodeConfirmation}>
              <Text style={styles.lockedHaveCodePressableText}>Click here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {isVisibleButton && !isPremium&& (
        <TouchableOpacity onPress={goToMyProfileView} style={{position: 'absolute', bottom: 120, zIndex: 2000, width: '100%', paddingHorizontal: 24}}>
          <LinearGradient
            colors={['#977B4A', '#E5D291', '#A28453']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{paddingVertical: 13, width: '100%', alignItems: 'center', borderRadius: 10, zIndex: 3000}}>
            <Text style={{fontSize: RFValue(20, 812), fontFamily: Satoshi500}}>Get Access</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ModalLockAccount;
