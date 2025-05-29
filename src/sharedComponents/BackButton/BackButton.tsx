import * as S from './BackButton.style';
import ArrowLeftArrow from 'assets/images/icons/arrow-left.svg';

interface BackButtonProps {
    onPress: () => void;
}

const BackButton = ({ onPress }: BackButtonProps) => {
    return (
        <S.BackButton onPress={onPress}>
            <ArrowLeftArrow width={15} height={15} />
        </S.BackButton>
    );
};

export default BackButton;