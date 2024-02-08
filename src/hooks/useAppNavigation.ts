import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'typescript/types';

type NavigationType = StackNavigationProp<RootStackParamList>;

export const useAppNavigation = () => useNavigation<NavigationType>();
