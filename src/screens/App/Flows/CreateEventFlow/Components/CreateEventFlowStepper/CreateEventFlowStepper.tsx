import * as S from './CreateEventFlowStepper.style';
import Check from 'src/assets/images/icons/Check-black.svg';

interface Props {
    currentStep: number;
}
const CreateEventFlowStepper = ({currentStep}: Props) => {
    return (
        <S.StepsContainer>
            <S.StepsWrapper>
                <S.ProgressLine />
                <S.StepsRow>
                    <S.StepItemContainer>
                        <S.StepCircle isActive={true} isCompleted={currentStep > 1}>
                            {currentStep === 1 ? <S.StepNumber isActive={true}>1</S.StepNumber> : <Check />}
                        </S.StepCircle>
                        <S.StepText isActive={currentStep === 1}>Guests</S.StepText>
                    </S.StepItemContainer>

                    <S.StepItemContainer>
                        <S.StepCircle isActive={currentStep === 2} isCompleted={currentStep > 2}>
                            {currentStep === 2 || currentStep < 2 ? <S.StepNumber isActive={currentStep === 2}>2</S.StepNumber> : <Check />}
                        </S.StepCircle>
                        <S.StepText isActive={currentStep === 2}>Details</S.StepText>
                    </S.StepItemContainer>

                    <S.StepItemContainer>
                        <S.StepCircle isActive={currentStep === 3} isCompleted={false}>
                            <S.StepNumber isActive={currentStep === 3}>3</S.StepNumber>
                        </S.StepCircle>
                        <S.StepText isActive={currentStep === 3}>Photos</S.StepText>
                    </S.StepItemContainer>
                </S.StepsRow>
            </S.StepsWrapper>
        </S.StepsContainer>
    );
};

export default CreateEventFlowStepper;
