import React, {useState} from 'react';
import {FlatList} from 'react-native';
import usePurchaseSuperInvites from '../SuperInvite/hooks/usePurchaseSuperInvites';
import * as S from './SuperJoin.style';
import SuperJoinCard from 'assets/images/app/super-join-card.png';
import CheckCircleWhiteIcon from 'assets/images/icons/check-circle-white.svg';
import CheckEmptyIcon from 'assets/images/icons/check-empty.svg';
import CloseIcon from 'assets/images/icons/close.svg';
import {lightGray16Color} from 'constants/colors';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';

interface Option {
  joins: number;
  price: number;
  save: number;
  popular?: boolean;
}

const SuperJoin: React.FC = () => {
  const [selected, setSelected] = useState<number>(15);

  const options: Option[] = [
    {joins: 5, price: 5.18, save: 4},
    {joins: 15, price: 3.06, save: 43},
    {joins: 30, price: 2.67, save: 51, popular: true},
  ];

  const selectedOption = options.find(o => o.joins === selected)!;
  const total = (selectedOption.price * selectedOption.joins).toFixed(2);
  const {goBack} = useAppNavigation();
  const {purchaseSuperInvites} = usePurchaseSuperInvites();

  return (
    <S.Container>
      <S.Content>
        <S.Header>
          <S.Title>Super Joins</S.Title>
          <S.CloseButton
            onPress={() => {
              goBack();
            }}>
            <CloseIcon width={20} height={20} fill={lightGray16Color} />
          </S.CloseButton>
        </S.Header>
        <S.CardImage source={SuperJoinCard} resizeMode="contain" />
        <S.OptionList>
          <FlatList
            data={options}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <S.Separator />}
            renderItem={({item}) => {
              const isSelected = item.joins === selected;
              return (
                <S.OptionItem selected={isSelected} onPress={() => setSelected(item.joins)} key={item.joins}>
                  {item.popular && (
                    <S.PopularBadge>
                      <S.PopularText>Popular</S.PopularText>
                    </S.PopularBadge>
                  )}
                  <S.OptionRow>
                    <S.OptionSelect>
                      <S.IconWrapper>
                        {isSelected ? <CheckCircleWhiteIcon width={20} height={20} /> : <CheckEmptyIcon width={20} height={20} />}
                      </S.IconWrapper>
                      <S.OptionInfo>
                        <S.OptionInvites>{item.joins} Super Joins</S.OptionInvites>
                        <S.OptionPrice>${item.price.toFixed(2)} each</S.OptionPrice>
                      </S.OptionInfo>
                    </S.OptionSelect>
                    <S.SaveBadge selected={isSelected}>
                      <S.SaveText>Save {item.save}%</S.SaveText>
                    </S.SaveBadge>
                  </S.OptionRow>
                </S.OptionItem>
              );
            }}
          />
        </S.OptionList>
        <S.Footer>
          <Button
            testID="super-join-button"
            onPress={() => purchaseSuperInvites(selectedOption.joins)}
            title={`Get ${selectedOption.joins} Super Joins for $${total}`}
          />
        </S.Footer>
      </S.Content>
    </S.Container>
  );
};

export default SuperJoin;
