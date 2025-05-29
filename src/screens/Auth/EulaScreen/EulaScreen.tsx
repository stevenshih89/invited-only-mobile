import React, { useCallback } from 'react';
import { ActivityIndicator } from 'react-native';

import * as S from './EulaScreen.style';
import { useEulaData } from './hooks/useEulaData';
import { whiteColor } from 'constants/colors';
import BackButton from 'src/sharedComponents/BackButton/BackButton';

const Eula = () => {
  const { dataEula, loading, endReached, onEndReached, navigation } = useEulaData();

  const renderItem = useCallback(
    (item: { id: number; title: string; description: string }) => (
      <S.ItemContainer isLast={item.id === dataEula.length - 1}>
        {item.title && <S.ItemTitle>{item.title}</S.ItemTitle>}
        <S.ItemDescription>{item.description}</S.ItemDescription>
      </S.ItemContainer>
    ),
    [],
  );

  if (loading) {
    return (
      <S.RootGradient testID="eula-loading">
        <S.LoaderContainer>
          <ActivityIndicator color={whiteColor} />
        </S.LoaderContainer>
      </S.RootGradient>
    );
  }

  return (
    <S.RootGradient>
      <S.SafeArea>
        <S.Container>
          <S.HeaderRow withBorder={false}>
            <BackButton onPress={() => navigation.goBack()} />
            <S.EulaTitleContainer>
              <S.EulaTitle testID="eula-title">End-User License Agreement (EULA)</S.EulaTitle>
            </S.EulaTitleContainer>
          </S.HeaderRow>
          <S.EulaList
            data={dataEula}
            keyExtractor={(item: { id: number }) => item.id.toString()}
            renderItem={({ item }: { item: { id: number; title: string; description: string } }) => renderItem(item)}
            onEndReached={onEndReached}
          />
          <S.ButtonRow>
            <S.DenyButton onPress={() => navigation.goBack()}>
              <S.DenyText>Deny</S.DenyText>
            </S.DenyButton>
            <S.AcceptButton enabled={endReached} onPress={() => endReached && navigation.navigate('/choose-enter-type')}>
              <S.AcceptText>Accept</S.AcceptText>
            </S.AcceptButton>
          </S.ButtonRow>
        </S.Container>
      </S.SafeArea>
    </S.RootGradient>
  );
};

export default Eula;
