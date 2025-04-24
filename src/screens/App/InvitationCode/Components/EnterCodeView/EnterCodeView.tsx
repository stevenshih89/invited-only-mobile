import {CodeField, Cursor} from 'react-native-confirmation-code-field';
import Button from 'components/Button/Button';
import * as S from './EnterCodeView.style';
import {screenHeight} from 'constants/common';
import {FC, RefObject} from 'react';
import {TextInput} from 'react-native';

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
  return (
    <>
      <S.Title>Access Limited</S.Title>
      <S.Subtitle>Enter your invitation code</S.Subtitle>
      <S.CodeContainer>
        <CodeField
          rootStyle={{
            width: '80%',
            marginTop: 40,
          }}
          testID="verification-code-input"
          ref={ref}
          {...props}
          value={code}
          onChangeText={setCode}
          cellCount={cellCount}
          keyboardType="number-pad"
          keyboardAppearance="dark"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}: {index: number; symbol: string; isFocused: boolean}) => {
            if (isIncorrectCode) {
              return (
                <S.GradientCell
                  gradientProps={{
                    start: {x: 0, y: 0},
                    end: {x: 1, y: 1},
                    colors: ['rgba(209, 111, 111, 0.6)', 'rgba(119, 19, 19, 0.7)', 'rgba(119, 19, 19, 1)'],
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
                    start: {x: 0, y: 0},
                    end: {x: 1, y: 1},
                    colors: ['rgba(26, 26, 26, 0.3)', 'rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0)'],
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
      <Button
        buttonStyle={{
          position: 'absolute',
          bottom: screenHeight / 19,
          width: '80%',
          marginTop: screenHeight / 10,
        }}
        title="Get Access"
        onPress={handleSubmit}
      />
    </>
  );
};

export default EnterCodeView;
