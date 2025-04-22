import {StyleProp, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import {FC} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import useStyles from './styles';
import CloseIcon from 'assets/images/icons/close.svg';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {bottomTabsStackPath} from 'constants/pathLocations';
import {transparent60Color, whiteColor} from 'constants/colors';
import {Satoshi500, Satoshi700} from 'constants/fonts';
import {useUser} from 'src/store/userStore';
import {UserMutations} from 'src/apiv2/mutations/userMutations';
import {showToast} from 'helpers/showToast';

const ModalLimitedAccess: FC<{
  wrapperStyle?: StyleProp<ViewStyle>;
  showNotNow?: boolean;
  showCloseIcon?: boolean;
}> = ({wrapperStyle, showNotNow = true, showCloseIcon = true}) => {
  const styles = useStyles();
  const {user, setUser} = useUser();
  const navigation = useAppNavigation();

  const {
    mutate: updateUserPassedDemoMutation,
    isSuccess,
    isError,
    isPending,
  } = UserMutations.useUpdateUserPassedDemo(() => {
    setUser({...user, isPassedDemo: true});

    navigation.navigate('/payment');
  });
  console.log('mutate success?', isSuccess);
  console.log('mutate error?', isError);
  console.log('mutate pending?', isPending);

  const goToPayment = async () => {
    console.log('goToPayment called, user uid:', user?.uid);
    try {
      if (!user?.uid) {
        console.error('No user UID available');
        showToast('inviteMatch', 'User information is missing', 'Error');
        return;
      }

      try {
        showToast('inviteMatch', 'Processing your request...', 'Pending');
        updateUserPassedDemoMutation();
      } catch (mutationError) {
        showToast('inviteMatch', 'We encountered an issue, but you can continue', 'Error', mutationError);
      }
    } catch (error) {
      console.error('Exception in goToPayment:', error);
      showToast('inviteMatch', 'An unexpected error occurred', 'Error');
    }
  };

  const setUserPassedDemo = async () => {
    console.log('setUserPassedDemo called, user uid:', user?.uid);
    if (user?.uid) {
      try {
        // Use mutateAsync to wait for the mutation to complete
        const result = await updateUserPassedDemoMutation.mutateAsync();
        console.log('Mutation result:', result);

        // Update local user state
        setUser({...user, isPassedDemo: true});

        // Force a small delay to ensure state updates before navigation
        setTimeout(() => {
          console.log('Resetting navigation to bottom tabs');
          navigation.reset({
            index: 0,
            routes: [{name: bottomTabsStackPath}],
          });
        }, 100);
      } catch (error) {
        console.error('Mutation error:', error);
        showToast('inviteMatch', 'Failed to update user status', 'Error');
      }
    } else {
      console.error('User UID is missing');
      showToast('inviteMatch', 'User information is missing', 'Error');
    }
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
      <View style={[styles.lockedWrapper, wrapperStyle]}>
        <View style={[styles.lockDescWr, {paddingVertical: !showNotNow ? 32 : 16}]}>
          {showCloseIcon && (
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20}}>
              <TouchableOpacity onPress={setUserPassedDemo}>
                <CloseIcon width={28} height={28} />
              </TouchableOpacity>
            </View>
          )}
          <Text style={styles.lockedTitle}>Limited Access</Text>
          <Text style={styles.lockedSubtitle}>
            You’ve reached the end of your demo swipes! Upgrade to Premium to keep swiping, connecting, and sharing tables and events
            without limits.
          </Text>
          <View style={{marginTop: 20, width: '100%', height: 40, alignItems: 'center', position: 'relative'}}>
            <View style={{width: '80%', height: 10, backgroundColor: 'rgba(33, 33, 33, 1)', borderRadius: 10, position: 'relative'}}>
              <View style={{width: '25%', height: '100%', backgroundColor: whiteColor, borderRadius: 3}} />
            </View>
            <View
              style={{
                position: 'absolute',
                top: '-50%',
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  backgroundColor: 'rgba(0, 0, 0, 1)',
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.32)',
                  borderRadius: 4,
                  transform: [{translateY: -5}],
                }}>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi700,
                    fontSize: 14,
                  }}>
                  15 PREMIUM SPOTS LEFT
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={goToPayment} style={{width: '100%', marginTop: 20}}>
            <LinearGradient
              colors={['#977B4A', '#E5D291', '#A28453']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{paddingVertical: 13, alignItems: 'center', borderRadius: 10}}>
              <Text style={{fontSize: RFValue(20, 812), fontFamily: Satoshi500}}>Upgrade to Premium</Text>
            </LinearGradient>
          </TouchableOpacity>
          {showNotNow && (
            <View style={{marginVertical: 16, width: '100%', alignItems: 'center'}}>
              <TouchableOpacity onPress={setUserPassedDemo}>
                <Text style={{fontSize: RFValue(16, 932), fontFamily: Satoshi500, textDecorationLine: 'underline', color: whiteColor}}>
                  Not Now
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default ModalLimitedAccess;
