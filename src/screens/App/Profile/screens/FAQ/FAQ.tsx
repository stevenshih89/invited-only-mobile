import { FlatList } from 'react-native';
import { useState } from 'react';
import * as S from './FAQ.style';
import ArrowUp from 'assets/images/icons/arrow-up-thin.svg';
import ArrowDown from 'assets/images/icons/arrow-down-thin.svg';
import { faqList } from 'helpers/getFaqList';

const FAQ = () => {
  const [openedFaqs, setOpenedFaqs] = useState<number[]>([]);

  return (
    <S.Container>
      <S.ScrollContainer showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <S.FAQListContainer>
          <FlatList
            data={faqList}
            keyExtractor={({ id }) => id.toString()}
            ItemSeparatorComponent={() => <S.Separator />}
            renderItem={({ item }) => {
              const isActive = openedFaqs.includes(item.id);

              return (
                <S.FAQItem
                  activeOpacity={0.7}
                  onPress={() => {
                    if (isActive) {
                      setOpenedFaqs(openedFaqs.filter(id => id !== item.id));
                    } else {
                      setOpenedFaqs([...openedFaqs, item.id]);
                    }
                  }}>
                  <S.FAQHeader>
                    <S.FAQTitle>{item.title}</S.FAQTitle>
                    {isActive ? <ArrowUp width={16} height={16} /> : <ArrowDown width={16} height={16} />}
                  </S.FAQHeader>
                  {isActive && <S.FAQDescription>{item.description}</S.FAQDescription>}
                </S.FAQItem>
              );
            }}
          />
        </S.FAQListContainer>
        <S.SupportContainer>
          <S.SupportText>
            For any other inquiries, feel free to contact our support team. We appreciate your feedback as we strive to provide you with the
            best mobile app experience.
          </S.SupportText>
        </S.SupportContainer>
      </S.ScrollContainer>
    </S.Container>
  );
};

export default FAQ;
