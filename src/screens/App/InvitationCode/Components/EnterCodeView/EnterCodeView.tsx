import { Cursor } from 'react-native-confirmation-code-field';
import { FC, RefObject } from 'react';
import { TextInput } from 'react-native';
import * as S from './EnterCodeView.style';

interface EnterCodeViewProps {
  ref: RefObject<TextInput>;
  props: any;
  code: string;
  setCode: (text: string) => void;
  getCellOnLayoutHandler: (index: number) => void;
  isIncorrectCode: boolean;
  cellCount: number;
  handleSubmit: () => void;
}

const EnterCodeView: FC<EnterCodeViewProps> = ({
  ref,
  props,
  code,
  setCode,
  getCellOnLayoutHandler,
  isIncorrectCode,
  cellCount,
  handleSubmit,
}) => {
  const errorColorsList = ['rgba(209, 111, 111, 0.6)', 'rgba(119, 19, 19, 0.7)', 'rgba(119, 19, 19, 1)'];
  const focusedColorsList = ['rgba(26, 26, 26, 0.3)', 'rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0)'];

  return (
    <S.Container>
      <S.Title>Access Limited</S.Title>
      <S.Subtitle>Enter your invitation code</S.Subtitle>
      <S.CodeContainer>
        <S.StyledCodeField
          testID="verification-code-input"
          ref={ref}
          {...props}
          value={code}
          onChangeText={setCode}
          cellCount={cellCount}
          keyboardType="number-pad"
          keyboardAppearance="dark"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }: { index: number; symbol: string; isFocused: boolean }) => {
            if (isIncorrectCode) {
              return (
                <S.GradientCell
                  gradientProps={{
                    start: { x: 0, y: 0 },
                    end: { x: 1, y: 1 },
                    colors: errorColorsList,
                  }}
                  key={index}>
                  <S.CellText isError onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : '_')}
                  </S.CellText>
                </S.GradientCell>
              );
            }

            if (isFocused) {
              return (
                <S.GradientCell
                  gradientProps={{
                    start: { x: 0, y: 0 },
                    end: { x: 1, y: 1 },
                    colors: focusedColorsList,
                  }}
                  key={index}>
                  <S.CellText onLayout={getCellOnLayoutHandler(index)}>{symbol || (isFocused ? <Cursor /> : '_')}</S.CellText>
                </S.GradientCell>
              );
            }
            return (
              <S.DefaultCell key={index}>
                <S.CellText onLayout={getCellOnLayoutHandler(index)}>{symbol || (isFocused ? <Cursor /> : '_')}</S.CellText>
              </S.DefaultCell>
            );
          }}
        />
        {isIncorrectCode && (
          <S.ErrorContainer>
            <S.ErrorText>Incorrect invitation code</S.ErrorText>
          </S.ErrorContainer>
        )}
      </S.CodeContainer>
      <S.StyledButton title="Get Access" onPress={handleSubmit} />
    </S.Container>
  );
};

export default EnterCodeView;
