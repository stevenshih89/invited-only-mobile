import * as S from './HostPremiumBlock.style';
import useUser from 'hooks/user/useUser';
import RocketIcon from 'assets/images/icons/rocket-white.svg';
import IOGradient from 'assets/images/icons/io-gradient.svg';

const HostPremiumBlock = () => {
  const { user: userData } = useUser();

  return (
    <>
      {userData?.accountType === 'host' && (
        <S.PremiumContainer>
          <S.PremiumContent>
            <S.PremiumTitle>Host Premium</S.PremiumTitle>
            <S.PremiumText>Get Access & Unlock all features.</S.PremiumText>
            <S.PremiumText>Host Access is limited</S.PremiumText>
            <S.UpgradeButton>
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

export default HostPremiumBlock;
