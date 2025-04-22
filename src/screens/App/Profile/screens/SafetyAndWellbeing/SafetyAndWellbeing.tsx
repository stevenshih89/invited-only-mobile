import {Text, TouchableOpacity, View} from 'react-native';
import {FC} from 'react';
import useStyles from './styles';
import AvatarHelp from 'assets/images/icons/avatar-help.svg';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import { useSafetyAndWellbeing } from 'hooks/useSafetyAndWellbeing';

interface ISafetyAndWellbeing {
  wellbeingShow?: boolean;
}

const SafetyAndWellbeing: FC<ISafetyAndWellbeing> = ({wellbeingShow = true}) => {
  const styles = useStyles();

  const {
    handleNavigate,
  } = useSafetyAndWellbeing()

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Need Help?</Text>
        <View style={styles.avatarContainer}>
          <AvatarHelp />
          <View style={{marginLeft: 6}}>
            <Text style={styles.avatarText}>support@invitedonly.app</Text>
          </View>
        </View>
      </View>
      {wellbeingShow && (
        <TouchableOpacity onPress={handleNavigate} activeOpacity={0.7} style={styles.buttonContainer}>
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
