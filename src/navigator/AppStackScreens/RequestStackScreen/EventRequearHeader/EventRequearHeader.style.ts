import styled from 'styled-components/native';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import { screenHeight } from 'constants/common';

export const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 24px;
  width: 100%;
  height: ${screenHeight * 0.13}px;
`;

export const LeftActionContainer = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.06);
  border-radius: 49px;
`;

export const TitleText = styled.Text`
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px; /* Corresponds to 120% of 24px */
  color: #ffffff;
  text-align: center;
  /* Removed absolute positioning for flexbox centering */
`;

export const InviteAllText = styled.Text`
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 29px; /* Corresponds to 120% of 24px */
  color: #ffffff;
  text-align: center;
`;

export const RightActionContainer = styled.TouchableOpacity`
  /* Styles for the 'Notifications' element */
  height: 48px;
  border-radius: 49px;
  align-items: center;
  justify-content: center;
`;
export const ArrowLeftIcon = styled(ArrowLeft)`
  width: 24px;
  height: 24px;
`;

// Note: The second 'Title' styles seemed misplaced for a header structure.
// If needed, you can create another styled Text component for it.
// The arrow/vector styles would typically be part of an Icon component.
