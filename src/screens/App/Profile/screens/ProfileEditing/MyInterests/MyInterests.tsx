import { FC, useState, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useFormikContext } from 'formik';
import * as S from './MyInterests.style';
import ModalSelectInterests from './ModalSelectInterests/ModalSelectInterests';
import ArrowRight from 'assets/images/icons/arrow-right-s-line.svg';
import { components } from 'src/api/v1';
import InterestImageSmallList from 'screens/App/Components/Intrests/InterestImageSmallList';

type Interest = components['schemas']['Interest'];

interface MyInterestsFormikValues {
  interestIds?: number[];
  [key: string]: any;
}

interface MyInterestsProps {
  availableInterests: Interest[];
  loading: boolean;
}

const MyInterests: FC<MyInterestsProps> = ({ availableInterests, loading }) => {
  const [isVisibleInterestsModal, setIsVisibleInterestsModal] = useState(false);
  const { values, setFieldValue } = useFormikContext<MyInterestsFormikValues>();

  const selectedInterests = useMemo(() => {
    const selectedInterests = values.interests || [];
    const availableInterestsMap = new Map(availableInterests?.map(interest => [interest.id, interest]));
    return selectedInterests?.length > 0
      ? selectedInterests
        .map((interest: Interest) => availableInterestsMap.get(interest.id))
        .filter((interest: Interest | undefined): interest is Interest => interest !== undefined)
      : [];
  }, [values.interests, availableInterests]);

  const visibleInterests = selectedInterests.slice(0, 2);
  const hiddenInterestsCount = selectedInterests.length - visibleInterests.length;

  if (loading) {
    return <S.LoadingIndicator testID="my-interests-loading-indicator" />;
  }

  return (
    <S.StyledRadialGradient
      colors={['rgba(26, 26, 26, 0.40)', 'rgba(0, 0, 0, 0.00)', 'rgba(255, 255, 255, 0.07)']}
      stops={[0, 0.695, 1]}
      center={[220, -386]}
      radius={400}>
      <S.Title>Interests</S.Title>
      <TouchableOpacity
        testID="open-interests-modal"
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        onPress={() => setIsVisibleInterestsModal(true)}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <S.InterestsContainer>
            <InterestImageSmallList interests={visibleInterests} />
            {hiddenInterestsCount > 0 && (
              <S.CounterContainer>
                <S.CounterText>+{hiddenInterestsCount}</S.CounterText>
              </S.CounterContainer>
            )}
          </S.InterestsContainer>
        </View>
        <ArrowRight />
      </TouchableOpacity>

      <ModalSelectInterests
        modalInterests={isVisibleInterestsModal}
        setModalInterests={setIsVisibleInterestsModal}
        availableInterests={availableInterests}
        formikFieldName="interests"
        formikValues={values}
        setFieldValue={setFieldValue}
      />
    </S.StyledRadialGradient>
  );
};

export default MyInterests;
