import React, { useState } from 'react';
import { FlatList } from 'react-native';
import * as S from './SuperInvite.style';
import usePurchaseSuperInvites from './hooks/usePurchaseSuperInvites';
import SuperInviteCard from 'assets/images/app/super-invite-card.png';
import CheckCircleWhiteIcon from 'assets/images/icons/check-circle-white.svg';
import CheckEmptyIcon from 'assets/images/icons/check-empty.svg';
import CloseIcon from 'assets/images/icons/close.svg';
import { lightGray16Color } from 'constants/colors';
import Button from 'components/Button/Button';
import { useAppNavigation } from 'hooks/useAppNavigation';

interface Option {
  invites: number;
  price: number;
  save: number;
  popular?: boolean;
}

const SuperInvite: React.FC = () => {
  const [selected, setSelected] = useState<number>(15);
  const { purchaseSuperInvites } = usePurchaseSuperInvites();

  const navigation = useAppNavigation();
  const options: Option[] = [
    { invites: 5, price: 5.18, save: 4 },
    { invites: 15, price: 3.06, save: 43 },
    { invites: 30, price: 2.67, save: 51, popular: true },
  ];

  const selectedOption = options.find(o => o.invites === selected)!;
  const total = (selectedOption.price * selectedOption.invites).toFixed(2);

  return (
    <S.Container>
      <S.Content>
        <S.Header>
          <S.Title>Super Invites</S.Title>
          <S.CloseButton onPress={() => navigation.goBack()}>
            <CloseIcon width={20} height={20} fill={lightGray16Color} />
          </S.CloseButton>
        </S.Header>
        <S.CardImage source={SuperInviteCard} resizeMode="contain" />
        <S.OptionList>
          <FlatList
            data={options}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <S.Separator />}
            renderItem={({ item }) => {
              const isSelected = item.invites === selected;
              return (
                <S.OptionItem selected={isSelected} onPress={() => setSelected(item.invites)} key={item.invites}>
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
                        <S.OptionInvites>{item.invites} Super Invites</S.OptionInvites>
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
          <Button title={`Get ${selectedOption.invites} Super Invites for $${total}`} onPress={() => purchaseSuperInvites(selectedOption.invites)} />
        </S.Footer>
      </S.Content>
    </S.Container>
  );
};

export default SuperInvite;
