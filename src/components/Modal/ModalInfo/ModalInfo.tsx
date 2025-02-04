import { blackColor, white0Color, whiteColor } from "constants/colors"
import { Satoshi400, Satoshi500 } from "constants/fonts"
import React, { FC } from "react"
import { View, Text } from "react-native"
import Modal from "react-native-modal"
import { RFValue } from "react-native-responsive-fontsize"

interface IModalInfo {
    isVisible: boolean
    onClose: () => void
    text: string
    title: string
    icon: React.ReactNode
}

const ModalInfo: FC<IModalInfo> = ({ isVisible, onClose, text, title, icon}) => {
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            style={{ margin: 0 }}
            animationIn="fadeIn"
            animationOut="fadeOut"
            useNativeDriver
        >
            <View style={{
                flex: 1,
                backgroundColor: blackColor,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 24
            }}>
                {icon}
                <Text style={{ color: whiteColor, fontSize: RFValue(36, 812), fontFamily: Satoshi500, marginTop: 48}}>{title}</Text>
                <Text style={{ color: whiteColor, fontSize: RFValue(16, 812), textAlign: 'center', fontFamily: Satoshi400}}>{text}</Text>
            </View>
        </Modal>
    )
}

export default ModalInfo
