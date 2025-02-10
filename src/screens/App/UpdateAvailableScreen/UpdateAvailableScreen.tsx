import { blackColor, whiteColor } from "constants/colors"
import { Satoshi400, Satoshi500 } from "constants/fonts"
import React, { FC } from "react"
import { View, Text } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import UpdateAvailableIcon from "../../../assets/images/icons/update-available.svg"
import { useRoute } from "@react-navigation/native"

interface UpdateAvailableI {
    version: string
}

const UpdateAvailable: FC = () => {
    const route = useRoute();
    const { version } = route.params as UpdateAvailableI;
    return (
            <View style={{
                flex: 1,
                backgroundColor: blackColor,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 24
            }}>
                <UpdateAvailableIcon />
                <Text style={{ color: whiteColor, fontSize: RFValue(36, 812), fontFamily: Satoshi500, marginTop: 48}}>Update Available</Text>
                <Text style={{ color: whiteColor, fontSize: RFValue(16, 812), textAlign: 'center', fontFamily: Satoshi400}}>{`Update to Version ${version} for enhanced performance and new features!`}</Text>
            </View>
    )
}

export default UpdateAvailable
