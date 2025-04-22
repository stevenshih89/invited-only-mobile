import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import UnderMaintenanceIcon from '../../../assets/images/icons/under-maintenance.svg';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {blackColor, whiteColor} from 'constants/colors';

interface UnderMaintenanceProps {
  data: {
    isMaintenance: boolean;
    approximatelyTime: string | null;
  };
}

const UnderMaintenance: FC<UnderMaintenanceProps> = ({data}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: blackColor,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
      }}>
      <UnderMaintenanceIcon />
      <Text style={{color: whiteColor, fontSize: RFValue(36, 812), fontFamily: Satoshi500, marginTop: 48}} testID="maintenance-title">
        Under Maintenance
      </Text>
      <Text style={{color: whiteColor, fontSize: RFValue(16, 812), textAlign: 'center', fontFamily: Satoshi400}} testID="maintenance-text">
        We’re working on it. Please check back soon! Thank you for your patience!{' '}
        {data?.approximatelyTime ? `(approximately ${data?.approximatelyTime})` : ''}
      </Text>
    </View>
  );
};

export default UnderMaintenance;
