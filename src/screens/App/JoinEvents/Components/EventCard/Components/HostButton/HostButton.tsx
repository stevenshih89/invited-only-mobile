import * as S from './HostButton.style';
import ArrowRightIcon from 'src/assets/images/icons/arrow-right-s-line.svg';

const HostButton = ({hostName, hostImage}: {hostName: string; hostImage: string}) => (
  <S.ButtonWrapper onPress={() => {}}>
    <S.StyledRadialGradient
      colors={['rgba(26, 26, 26, 0.40)', 'rgba(0, 0, 0, 0.00)', 'rgba(255, 255, 255, 0.07)']}
      stops={[0, 0.695, 1]}
      center={[220, -386]}
      radius={400}>
      <S.Row>
        <S.InnerRow>
          <S.ProfileImage source={{uri: hostImage}} />
          <S.InfoWrapper>
            <S.HostName>{hostName}</S.HostName>
            <S.HostRole>Host</S.HostRole>
          </S.InfoWrapper>
        </S.InnerRow>
        <ArrowRightIcon />
      </S.Row>
    </S.StyledRadialGradient>
  </S.ButtonWrapper>
);

export default HostButton;
