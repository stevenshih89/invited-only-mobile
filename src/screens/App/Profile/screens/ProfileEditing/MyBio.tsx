import {TextareaItem} from '@ant-design/react-native';
import {lightGray2Color, lightGray5Color, transparentWhite30Color, whiteColor} from 'constants/colors';
import {Satoshi500} from 'constants/fonts';
import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const MyBio = () => {
  const [bio, setBio] = useState<string>('');

  return (
    <View style={styles.view}>
      <Text style={styles.text}>My bio</Text>
      <TextareaItem
        value={bio}
        onChangeText={(text: string) => setBio(text)}
        rows={9}
        placeholder="Business owner from Dubai"
        placeholderTextColor={transparentWhite30Color}
        styles={{
          container: styles.container,
          input: styles.input,
        }}
        style={styles.textArea}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightGray2Color,
    borderBottomColor: 'transparent',
    borderRadius: 10,
  },
  input: {
    color: transparentWhite30Color,
    fontFamily: Satoshi500,
    fontSize: RFValue(16, 812),
    margin: 10,
  },
  view: {
    padding: 20,
    backgroundColor: lightGray5Color,
    borderRadius: 10,
    marginTop: 24,
  },
  text: {
    color: whiteColor,
    fontFamily: Satoshi500,
    fontSize: RFValue(18, 812),
    marginBottom: 26,
  },
  textArea: {
    backgroundColor: 'transparent',
    color: whiteColor,
  },
});

export default MyBio;
