import { blackColor, whiteColor } from "constants/colors"
import { Satoshi400, Satoshi500 } from "constants/fonts"
import React, { FC } from "react"
import { View, Text } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import UnderMaintenanceIcon from "../../../assets/images/icons/under-maintenance.svg"

const UnderMaintenance: FC = ({}) => {
    return (
            <View style={{
                flex: 1,
                backgroundColor: blackColor,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 24
            }}>
                <UnderMaintenanceIcon />
                <Text style={{ color: whiteColor, fontSize: RFValue(36, 812), fontFamily: Satoshi500, marginTop: 48}}>Under Maintenance</Text>
                <Text style={{ color: whiteColor, fontSize: RFValue(16, 812), textAlign: 'center', fontFamily: Satoshi400}}>We’re working on it. Please check back soon! Thank you for your patience!</Text>
            </View>
    )
}

export default UnderMaintenance
