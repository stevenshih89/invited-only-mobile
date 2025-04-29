import {PlanListItem} from '../../hooks/usePayments';
import * as S from './PlansList.style';

interface PlansListProps {
  plansList: PlanListItem[];
  activePayment: PlanListItem;
  setActivePayment: (item: PlanListItem) => void;
  currentSubscriptions: any;
}

const PlansList = ({plansList, activePayment, setActivePayment, currentSubscriptions}: PlansListProps) => {
  const renderItem = ({item}: {item: PlanListItem}) => {
    let isRender = true;
    if (isRender) {
      let isActive = activePayment.id === item.id;

      if (currentSubscriptions?.activeSubscriptions?.length > 1) {
        isActive = true;
      }

      return (
        <S.ItemContainer>
          <S.PlanButton key={item.id} disabled={isActive} isActive={isActive} activeOpacity={0.7} onPress={() => setActivePayment(item)}>
            <S.PlanItemView isActive={isActive} isFirstItem={item.id === 0} isLastItem={item.id === 2}>
              <S.PlanText>{item.title}</S.PlanText>
            </S.PlanItemView>
          </S.PlanButton>
        </S.ItemContainer>
      );
    }
  };

  return <S.Container>{plansList.map(item => renderItem({item}))}</S.Container>;
};

export default PlansList;
