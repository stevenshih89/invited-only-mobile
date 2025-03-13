import ArrowDown from 'assets/images/icons/arrow-down.svg';
import {Dispatch, FC, SetStateAction} from 'react';
import {FlatList} from 'react-native';
import * as S from './MyInterests.style';

interface MyInterestsProps {
  listOfInterests: {id: number; title: string; isSelected: boolean}[];
  setListOfInterests: Dispatch<SetStateAction<{id: number; title: string; isSelected: boolean}[]>>;
  loading: boolean;
}

const MyInterests: FC<MyInterestsProps> = ({listOfInterests, setListOfInterests, loading}) => {
  const handleSelectInterest = (id: number) => {
    const updatedInterests = listOfInterests.map(interest =>
      interest.id === id ? {...interest, isSelected: !interest.isSelected} : interest,
    );
    setListOfInterests(updatedInterests);
  };

  if (loading) {
    return <S.LoadingIndicator testID="my-interests-loading-indicator" />;
  }

  return (
    <S.Container>
      <S.Title>My interests</S.Title>
      <S.ListContainer>
        <FlatList
          data={listOfInterests.filter(({isSelected}) => isSelected)}
          numColumns={3}
          keyExtractor={({id}) => id.toString()}
          scrollEnabled={false}
          contentContainerStyle={{width: '100%'}}
          ItemSeparatorComponent={() => <S.ItemSeparator />}
          renderItem={({item: {id, title, isSelected}}: {item: {id: number; title: string; isSelected: boolean}}) => (
            <>
              {isSelected && (
                <S.ItemWrapper>
                  <S.InterestButton activeOpacity={0.7} onPress={() => handleSelectInterest(id)}>
                    <S.InterestText>{title}</S.InterestText>
                  </S.InterestButton>
                </S.ItemWrapper>
              )}
            </>
          )}
        />
      </S.ListContainer>
      <S.ListContainer>
        <S.AddMoreButton>
          <S.AddMoreText>Add more interests</S.AddMoreText>
          <ArrowDown />
        </S.AddMoreButton>
        <FlatList
          data={listOfInterests.filter(({isSelected}) => !isSelected)}
          numColumns={3}
          keyExtractor={({id}) => id.toString()}
          scrollEnabled={false}
          contentContainerStyle={{width: '100%'}}
          ItemSeparatorComponent={() => <S.ItemSeparator />}
          renderItem={({item: {id, title, isSelected}}: {item: {id: number; title: string; isSelected: boolean}}) => (
            <>
              {!isSelected && (
                <S.ItemWrapper>
                  <S.InterestButton activeOpacity={0.7} onPress={() => handleSelectInterest(id)} isSelected={false}>
                    <S.InterestText>{title}</S.InterestText>
                  </S.InterestButton>
                </S.ItemWrapper>
              )}
            </>
          )}
        />
      </S.ListContainer>
    </S.Container>
  );
};

export default MyInterests;
