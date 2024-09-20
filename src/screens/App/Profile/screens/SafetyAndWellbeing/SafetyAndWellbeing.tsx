import {Text, TouchableOpacity, View} from 'react-native';
import AvatarHelp from 'assets/images/icons/avatar-help.svg';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import useStyles from './styles';
import {FC} from 'react';

interface ISafetyAndWellbeing {
  wellbeingShow?: boolean;
}

const SafetyAndWellbeing: FC<ISafetyAndWellbeing> = ({wellbeingShow = true}) => {
  const styles = useStyles();

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Need Help?</Text>
        <View style={styles.avatarContainer}>
          <AvatarHelp />
          <View style={{marginLeft: 6}}>
            <Text style={styles.avatarText}>Support@invitedonly.com</Text>
            {/* <Text style={styles.onlineText}>Online</Text> */}
          </View>
        </View>
      </View>
      {wellbeingShow && (
        <TouchableOpacity activeOpacity={0.7} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>IO values and guidlines</Text>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonDescription}>See what IO stands for and what we ask of community</Text>
            <ArrowRight />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SafetyAndWellbeing;
