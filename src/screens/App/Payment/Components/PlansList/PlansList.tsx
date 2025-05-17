import { components } from '@invited-only/invited-only-api';
import { PlanListItem } from '../../hooks/usePayments';
import * as S from './PlansList.style';

interface PlansListProps {
  plansList: PlanListItem[];
  activePayment: PlanListItem;
  setActivePayment: (item: PlanListItem) => void;
  currentSubscriptions: components['schemas']['Subscription'];
}

const PlansList = ({ plansList, activePayment, setActivePayment }: PlansListProps) => {
  const renderItem = ({ item }: { item: PlanListItem }) => {
    let isRender = true;
    if (isRender) {

      let isActive = activePayment.id === item.id;


      return (
        <S.ItemContainer key={item.id}>
          <S.PlanButton key={item.id} disabled={isActive} isActive={isActive} activeOpacity={0.7} onPress={() => setActivePayment(item)}>
            <S.PlanItemView isActive={isActive} isFirstItem={item.id === 0} isLastItem={item.id === 2}>
              <S.PlanText>{item.title}</S.PlanText>
            </S.PlanItemView>
          </S.PlanButton>
        </S.ItemContainer>
      );
    }
  };

  return <S.Container>{plansList.map(item => renderItem({ item }))}</S.Container>;
};

export default PlansList;
