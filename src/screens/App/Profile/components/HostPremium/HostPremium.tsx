import { components } from '@invited-only/invited-only-api';
import * as S from './HostPremium.style';
import RocketIcon from 'assets/images/icons/rocket-white.svg';
import IOGradient from 'assets/images/icons/io-gradient.svg';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { paymentPath } from 'constants/pathLocations';
import { useAuthStore } from 'src/store/authStore';

interface HostPremiumCardProps {
  subscriptionData?: components['schemas']['Subscription'];
}

const HostPremiumCard = ({ subscriptionData }: HostPremiumCardProps) => {
  const isActiveSubscription = subscriptionData?.status === 'active';



  const navigation = useAppNavigation();

  const getPremiumTitle = () => {
    if (!isActiveSubscription) {
      return 'Host Premium';
    }
    if (subscriptionData?.uid === 'io_29_3m') {
      return '3 Months Premium';
    }
    if (subscriptionData?.uid === 'io_99_1m') {
      return '1 Month Premium';
    }
    if (subscriptionData?.uid === 'io_59_1w') {
      return '1 Week Premium';
    }
    return 'Host Premium';
  };

  const getSubscriptionReadableType = (subscriptionId: string) => {
    if (subscriptionId === 'io_29_3m') {
      return '3 Months';
    }
    if (subscriptionId === 'io_99_1m') {
      return '1 Month';
    }
    if (subscriptionId === 'io_59_1w') {
      return '1 Week';
    }
    return 'Host Premium';
  };

  const getPremiumDescription = () => {
    if (!isActiveSubscription) {
      return 'Get Access & Unlock all features.\nHost Access is limited';
    }
    if (subscriptionData?.uid === 'io_29_3m') {
      return 'Your 3 months of Premium access is now active!';
    }
    if (subscriptionData?.uid === 'io_99_1m') {
      return 'Your full month of Premium access is now active!';
    }
    if (subscriptionData?.uid === 'io_59_1w') {
      return 'Your full week of Premium access is now active!';
    }
    return 'Get Access & Unlock all features.\nHost Access is limited';
  };

  const goToMyPaymentPath = () => {
    navigation.navigate(paymentPath as never);
  };

  return (
    <S.Container>
      <S.PremiumContainer>
        <S.PremiumContent>
          <S.PremiumTitle>{getPremiumTitle()}</S.PremiumTitle>
          <S.PremiumText>{getPremiumDescription()}</S.PremiumText>
          {subscriptionData?.renewalSubscriptionId && (
            <S.PremiumText>
              Your subscription renwal preference is set to {getSubscriptionReadableType(subscriptionData?.renewalSubscriptionId)}
            </S.PremiumText>
          )}
          <S.UpgradeButton onPress={goToMyPaymentPath}>
            <S.UpgradeIconContainer>
              <RocketIcon width={16} height={16} />
            </S.UpgradeIconContainer>
            <S.UpgradeText>{isActiveSubscription ? 'Manage Subscription' : 'Updgrade to Premium'}</S.UpgradeText>
          </S.UpgradeButton>
        </S.PremiumContent>
        <S.IOGradientContainer>
          <IOGradient />
        </S.IOGradientContainer>
      </S.PremiumContainer>
    </S.Container>
  );
};

export default HostPremiumCard;
