import LinearGradient from 'react-native-linear-gradient';
import ArrowRightIcon from 'assets/images/icons/arrow-right-balck.svg';
import SafetyAndWellbeing from '../SafetyAndWellbeing/SafetyAndWellbeing';
import {FC} from 'react';
import {Linking} from 'react-native';
import {useManageSubscription} from 'hooks/useManageSubscription';
import * as S from './index.style';

const ManageSubscription: FC = () => {
  const {subscriptionName, currentSubscriptions, lastSubscriptionData, purchaseDates, formateDateFun, goToMyPaymentPath} =
    useManageSubscription();

  return (
    <S.SafeAreaView>
      <S.Container>
        <S.Divider />
        <S.Content>
          <S.Title>You subscribed on iOS</S.Title>
          {currentSubscriptions.activeSubscriptions.length && (
            <S.Description>
              {`Your ${subscriptionName} subscription began on ${formateDateFun(
                purchaseDates,
              )}. It will renew on ${formateDateFun(lastSubscriptionData)}.`}
            </S.Description>
          )}
          <S.Description>
            However, if you've already stopped recurring payments through iTunes, then your access will lapse at that time instead of
            renewing, and you won't be charged again.
          </S.Description>
          <S.Description>
            <S.Text>
              If you would like to stop recurring payments, you can do so {''}
              <S.Link onPress={() => Linking.openURL('app-settings:')}>here</S.Link>. Unfortunately, we're unable to do so on your behalf.
            </S.Text>
          </S.Description>
          <SafetyAndWellbeing wellbeingShow={false} />
        </S.Content>
        {currentSubscriptions.activeSubscriptions.length < 3 && !currentSubscriptions.activeSubscriptions.includes('io_29_3m') && (
          <S.UpgradeButton onPress={goToMyPaymentPath}>
            <LinearGradient
              colors={['#977B4A', '#E5D291', '#A28453']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{paddingVertical: 16, borderRadius: 18, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <S.UpgradeText>Upgrade</S.UpgradeText>
              <ArrowRightIcon width={16} height={16} />
            </LinearGradient>
          </S.UpgradeButton>
        )}
      </S.Container>
    </S.SafeAreaView>
  );
};

export default ManageSubscription;
