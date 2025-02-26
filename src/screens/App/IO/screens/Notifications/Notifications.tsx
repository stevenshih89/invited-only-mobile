import {FlatList, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import useStyles from './styles';
import {FC, ReactElement, useEffect} from 'react';
import LoaderIcon from 'assets/images/icons/loader.svg'
import {blackColor, transparentWhite16Color, whiteColor} from 'constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi400, Satoshi700} from 'constants/fonts';
import FastImage from 'react-native-fast-image';
import Animated, {cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';
import { useNotifications } from 'hooks/useNotifications';

interface Notifications {
  body: string;
  id: string;
  mark: string;
  title: string;
  uid: string;
  path?: string;
  data?: any;
}

const COUNT_NOTIFICATIONS_TO_ADD = 5;

const Notifications: FC = (): ReactElement => {
  const {
    loading,
    notifications,
    handleClearNotifications,
    setLimitNotifications,
    handleNavigate,
  } = useNotifications()

  const rotationLoader = useSharedValue(0);

  useEffect(() => {
    if (loading) {
      rotationLoader.value = withRepeat(
        withTiming(360, {
          duration: 2000,
          easing: Easing.linear,
        }),
        -1,
      );
    }

    return () => {
      cancelAnimation(rotationLoader);
    };
  }, [rotationLoader, loading]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotationLoader.value}deg`}],
    };
  });

  const styles = useStyles();
  
  if (loading) {
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: blackColor}}>
        <Animated.View style={[animatedStyle]}>
          <LoaderIcon />
        </Animated.View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.root}>
      <View
        style={{
          width: '100%',
          paddingVertical: 16,
          borderTopColor: transparentWhite16Color,
          borderTopWidth: 1,
          borderStyle: 'solid',
        }}>
        {notifications && notifications.length > 0 && (
          <TouchableOpacity onPress={handleClearNotifications}>
            <Text
              style={{
                fontSize: RFValue(16, 812),
                color: whiteColor,
                fontFamily: Satoshi700,
                textAlign: 'right',
              }}>
              Mark all as read
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        onEndReached={() => setLimitNotifications(prev => prev + COUNT_NOTIFICATIONS_TO_ADD)}
        renderItem={({item}) => (
          <TouchableOpacity disabled={!item?.path} onPress={() => handleNavigate(item.path, item.data)}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                paddingVertical: 16,
              }}>
              <FastImage source={{uri: item?.image}} style={{width: 60, height: 60, borderRadius: 60}} />
              <View style={{marginLeft: 16, justifyContent: 'center', flex: 1}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1}}>
                  <Text
                    style={{
                      color: whiteColor,
                      fontSize: RFValue(16, 812),
                      fontFamily: Satoshi700,
                      marginBottom: 4,
                      flexShrink: 1,
                    }}>
                    {item.title}
                  </Text>
                  <View
                    style={{
                      borderRadius: 40,
                      backgroundColor: whiteColor,
                      paddingVertical: 4,
                      paddingHorizontal: 8,
                    }}>
                    <Text
                      style={{
                        color: blackColor,
                        fontSize: RFValue(12, 812),
                        fontFamily: Satoshi700,
                      }}>
                      {item.mark.toUpperCase()}
                    </Text>
                  </View>
                </View>
                {item.body.toLowerCase() !== 'invited only' && (
                  <Text style={{color: whiteColor, fontSize: RFValue(16, 812), fontFamily: Satoshi400}}>{item.body}</Text>
                )}
              </View>
            </View>
            <View
              style={{
                borderBottomColor: transparentWhite16Color,
                borderBottomWidth: 1,
                borderStyle: 'solid',
                marginTop: 8,
              }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Notifications;
