import * as S from './HostPremium.style';
import {useUser} from 'src/store/userStore';
import RocketIcon from 'assets/images/icons/rocket-white.svg';
import IOGradient from 'assets/images/icons/io-gradient.svg';
import {useSubscriptions} from 'src/store/subscriptionsStore';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {paymentPath} from 'constants/pathLocations';

const HostPremiumCard = () => {
  const {user: userData} = useUser();

  const currentSubscriptions = useSubscriptions((i: any) => i?.currentSubscriptions);
  const navigation = useAppNavigation();
  const getPremiumTitle = () => {
    if (currentSubscriptions?.activeSubscriptions?.includes('io_29_3m')) {
      return '3 Months Premium';
    }
    if (currentSubscriptions?.activeSubscriptions?.includes('io_99_1m')) {
      return '1 Month Premium';
    }
    if (currentSubscriptions?.activeSubscriptions?.includes('io_59_1w')) {
      return '1 Week Premium';
    }
    return 'Host Premium';
  };

  const getPremiumDescription = () => {
    if (currentSubscriptions?.activeSubscriptions?.includes('io_29_3m')) {
      return 'Your 3 months of Premium access is now active!';
    }
    if (currentSubscriptions?.activeSubscriptions?.includes('io_99_1m')) {
      return 'Your full month of Premium access is now active!';
    }
    if (currentSubscriptions?.activeSubscriptions?.includes('io_59_1w')) {
      return 'Your full week of Premium access is now active!';
    }
    return 'Get Access & Unlock all features.\nHost Access is limited';
  };

  const goToMyPaymentPath = () => {
    navigation.navigate(paymentPath as never);
  };

  return (
    <>
      {userData?.accountType === 'host' && (
        <S.PremiumContainer>
          <S.PremiumContent>
            <S.PremiumTitle>{getPremiumTitle()}</S.PremiumTitle>
            <S.PremiumText>{getPremiumDescription()}</S.PremiumText>
            <S.UpgradeButton onPress={goToMyPaymentPath}>
              <S.UpgradeIconContainer>
                <RocketIcon width={16} height={16} />
              </S.UpgradeIconContainer>
              <S.UpgradeText>Updgrade to Premium</S.UpgradeText>
            </S.UpgradeButton>
          </S.PremiumContent>
          <S.IOGradientContainer>
            <IOGradient />
          </S.IOGradientContainer>
        </S.PremiumContainer>
      )}
    </>
  );
};

export default HostPremiumCard;
