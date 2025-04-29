import React, { FC, JSX, useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';

import LottieView from 'lottie-react-native';
import PrivacyAndTerms from './Components/PrivacyAndTerms/PrrivacyAndTerms';
import WhatGet from './Components/WhatGet/WhatGet';
import Buttons from './Components/Buttons/Buttons';
import PlansList from './Components/PlansList/PlansList';
import usePayments from './hooks/usePayments';
import * as S from './Payment.style';
import { useAppNavigation } from 'hooks/useAppNavigation';
import Loader from 'components/Modal/ModalLoader/Loader';
import { backgroundGradientColors } from 'constants/colors';
import CloseIcon from 'assets/images/icons/close.svg';
import ModalStartInviting from 'components/Modal/ModalStartInviting/ModalStartInviting';

const Payment: FC = (): JSX.Element => {
  const navigation = useAppNavigation();
  const lottieRef = useRef<LottieView>(null);



  const {
    loaderVisible,
    successfulPay,
    activePayment,
    setActivePayment,
    currentSubscriptions,
    plansList,
    isButtonDisabled,
    buttonTitle,
    getOfferings,
    restorePurchases,
  } = usePayments();

  useEffect(() => {
    lottieRef.current?.reset()
    lottieRef.current?.play();
  }, [activePayment.id]);

  const handleNext = () => {
    try {

      navigation.navigate('/profile/profile-stack');
    } catch (error) {
      console.log('error handle next', error);
    }
  };

  const animations: Record<number, any> = {
    0: require('../../../animations/Card_1.json'),
    1: require('../../../animations/Card_0.json'),
    2: require('../../../animations/Card_2.json'),
  };

  return (
    <S.GradientContainer colors={backgroundGradientColors} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}>
      <S.SafeContainer>
        <Loader isVisible={loaderVisible} successfulPay={successfulPay} />
        <ScrollView>
          <S.ContentContainer>
            <S.HeaderContainer>
              <S.HeaderPlaceholder />
              <S.HeaderTitle>Subscription</S.HeaderTitle>
              <S.CloseButton activeOpacity={0.7} onPress={handleNext}>
                <CloseIcon width={25} height={25} />
              </S.CloseButton>
            </S.HeaderContainer>
            <S.AnimationContainer>
              <LottieView source={animations[activePayment.id]} cacheStrategy='strong' enableMergePathsAndroidForKitKatAndAbove duration={1000} autoPlay loop hardwareAccelerationAndroid ref={lottieRef} />
            </S.AnimationContainer>
            <PlansList
              plansList={plansList}
              activePayment={activePayment}
              setActivePayment={setActivePayment}
              currentSubscriptions={currentSubscriptions}
            />
            <WhatGet duration={activePayment.duration} durationName={activePayment.durationName} fullPrice={activePayment.fullPrice} />
          </S.ContentContainer>
          <S.ButtonContainer>
            <Buttons
              isButtonDisabled={isButtonDisabled}
              buttonTitle={buttonTitle}
              restorePurchases={restorePurchases}
              getOfferings={getOfferings}
            />
            <PrivacyAndTerms />
          </S.ButtonContainer>
        </ScrollView>
      </S.SafeContainer>
      <ModalStartInviting />
    </S.GradientContainer>
  );
};

export default Payment;
