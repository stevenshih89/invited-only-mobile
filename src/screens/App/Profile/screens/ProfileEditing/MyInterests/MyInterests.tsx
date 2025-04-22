import { Dispatch, FC, SetStateAction } from 'react';
import { TouchableOpacity, View } from 'react-native';
import * as S from './MyInterests.style';
import ArrowRight from 'assets/images/icons/arrow-right-s-line.svg';

interface MyInterestsProps {
  listOfInterests: { id: number; title: string; isSelected: boolean; image: any }[];
  loading: boolean;
  setIsVisibleInterestsModal: Dispatch<SetStateAction<boolean>>;
}

const MyInterests: FC<MyInterestsProps> = ({ listOfInterests, loading, setIsVisibleInterestsModal }) => {
  const visibleInterests = listOfInterests.filter(interest => interest.isSelected).slice(0, 2);
  const remainingCount =
    listOfInterests.filter(interest => interest.isSelected).length > 2
      ? listOfInterests.filter(interest => interest.isSelected).length - 2
      : 0;

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
            {visibleInterests.map(interest => (
              <S.InterestItem key={interest.id}>
                <S.InterestImage source={interest.image} />
                <S.InterestText>{interest.title}</S.InterestText>
              </S.InterestItem>
            ))}
            {remainingCount > 0 && (
              <S.CounterContainer>
                <S.CounterText>+{remainingCount}</S.CounterText>
              </S.CounterContainer>
            )}
          </S.InterestsContainer>
        </View>
        <ArrowRight />
      </TouchableOpacity>
    </S.StyledRadialGradient>
  );
};

export default MyInterests;
