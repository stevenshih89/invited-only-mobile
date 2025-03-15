import {StyleSheet, Text, View, KeyboardAvoidingView, Platform} from 'react-native';
import Modal from 'react-native-modal';
import {blackColor, lightGray2Color, whiteColor} from 'constants/colors';
import {type FC} from 'react';
import Button from 'components/Button/Button';
import {Satoshi400} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';
import {screenHeight} from 'constants/common';
import {useModalDeleteMyAccount} from 'hooks/useModalDeleteMyAccount';

const ModalDeleteMyAccount: FC<{isVisible: boolean; onClose: () => void; verificationId: string}> = ({
  isVisible,
  onClose,
  verificationId,
}) => {
  const {ref, code, props, setCode, CELL_COUNT, getCellOnLayoutHandler, handleConfirm} = useModalDeleteMyAccount(verificationId);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      coverScreen
      useNativeDriver={false}
      propagateSwipe={true}
      backdropColor={'rgba(0, 0, 0, 0.99)'}
      backdropOpacity={0.8}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
        zIndex: 999,
      }}
      swipeDirection={['down']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
        <View
          style={{
            backgroundColor: blackColor,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingBottom: 40,
            paddingTop: 16,
            paddingHorizontal: 30,
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text style={{color: whiteColor, fontSize: RFValue(24, 812), fontFamily: Satoshi400, marginBottom: 20, textAlign: 'center'}}>
            Please confirm that this is your account
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              marginBottom: 20,
            }}>
            <CodeField
              testID="code-field"
              ref={ref}
              {...props}
              value={code}
              onChangeText={setCode}
              cellCount={CELL_COUNT}
              keyboardType="number-pad"
              keyboardAppearance="dark"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <View
                  key={index}
                  style={{
                    borderRadius: 10,
                    backgroundColor: lightGray2Color,
                    flex: 1,
                    height: screenHeight / 18,
                    marginHorizontal: 8,
                  }}>
                  <Text style={[styles.cell, isFocused && styles.focusCell]} onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : '_')}
                  </Text>
                </View>
              )}
            />
          </View>
          <Button title="Confirm" onPress={handleConfirm} />
          <Button title="Cancel" variant="transparent" onPress={onClose} />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ModalDeleteMyAccount;

const styles = StyleSheet.create({
  cell: {
    lineHeight: 38,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginVertical: 'auto',
    fontSize: RFValue(16, 812),
    textAlign: 'center',
    color: whiteColor,
    fontFamily: Satoshi400,
  },
  focusCell: {
    borderRadius: 20,
    borderColor: '#000',
  },
});
