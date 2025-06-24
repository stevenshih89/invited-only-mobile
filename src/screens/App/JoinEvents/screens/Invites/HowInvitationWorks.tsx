// import * as React from "react";
// import {
//     ScrollView,
//     Image,
//     StyleSheet,
//     Text,
//     View,
//     Pressable,
// } from "react-native";
// import LinearGradient from "react-native-linear-gradient";
// import Header from "../assets/header.svg";
// import Group from "../assets/group.svg";
// import {
//     Padding,
//     FontFamily,
//     Color,
//     FontSize,
//     Gap,
//     Border,
// } from "../../../GlobalStyles";

// const HowInvitationWork = () => {
//     return (
//         <LinearGradient
//             style={styles.howInvitationWork}
//             locations={[0, 0]}
//             colors={["#0f0f0f", "#000"]}
//             useAngle={true}
//             angle={180}
//         >
//             <ScrollView
//                 style={styles.scrollview}
//                 contentContainerStyle={styles.howInvitationWorkContent}
//             >
//                 <Image
//                     style={styles.subtractIcon}
//                     resizeMode="cover"
//                     source={require("../assets/subtract.png")}
//                 />
//                 <Header style={styles.headerIcon} width={430} height={48} />
//                 <View style={[styles.typestatusBarThemelight, styles.invitePosition]}>
//                     <Text style={[styles.text, styles.textFlexBox]}>9:41</Text>
//                     <View style={styles.typestatusBarThemelightInner}>
//                         <View style={[styles.frameParent, styles.frameParentFlexBox]}>
//                             <View style={[styles.groupWrapper, styles.groupSpaceBlock]}>
//                                 <Image
//                                     style={styles.groupIcon}
//                                     resizeMode="cover"
//                                     source={require("../assets/group.png")}
//                                 />
//                             </View>
//                             <View style={[styles.groupContainer, styles.groupSpaceBlock]}>
//                                 <Image
//                                     style={styles.groupIcon1}
//                                     resizeMode="cover"
//                                     source={require("../assets/group.png")}
//                                 />
//                             </View>
//                             <Group style={styles.groupIcon2} width={27} height={13} />
//                         </View>
//                     </View>
//                 </View>
//                 <View style={[styles.howInvitationWorkInner, styles.buttonSpaceBlock]}>
//                     <View style={styles.frameGroup}>
//                         <View style={styles.howInvitationWorkWrapper}>
//                             <Text style={[styles.howInvitationWork1, styles.inviteTypo]}>
//                                 How Invitation Work?
//                             </Text>
//                         </View>
//                         <View style={styles.frameWrapper}>
//                             <View style={styles.cardsParent}>
//                                 <View style={[styles.cards, styles.cardsPosition]}>
//                                     <Image
//                                         style={styles.cardEventIcon}
//                                         resizeMode="cover"
//                                         source={require("../assets/card-event.png")}
//                                     />
//                                     <Image
//                                         style={[styles.cardIcon, styles.cardsPosition]}
//                                         resizeMode="cover"
//                                         source={require("../assets/card.png")}
//                                     />
//                                     <Text style={[styles.invite, styles.inviteTypo]}>Invite</Text>
//                                     <Image
//                                         style={styles.handIcon}
//                                         resizeMode="cover"
//                                         source={require("../assets/hand.png")}
//                                     />
//                                 </View>
//                                 <Image
//                                     style={[styles.closeIcon, styles.invitePosition]}
//                                     resizeMode="cover"
//                                     source={require("../assets/close.png")}
//                                 />
//                             </View>
//                         </View>
//                         <View style={styles.progressBar}>
//                             <View style={styles.progressBar1}>
//                                 <Image
//                                     style={styles.progressInnerIcon}
//                                     resizeMode="cover"
//                                     source={require("../assets/frame-1597881273.png")}
//                                 />
//                                 <View style={styles.inviteProcess}>
//                                     <View style={styles.approvalWorkflow}>
//                                         <Text style={styles.swipeMatch}>{`Swipe & Match`}</Text>
//                                         <Text style={[styles.swipeOrTap, styles.asAHostTypo]}>
//                                             Swipe or tap “Invite” to request an invite. If the guest
//                                             taps “Join” too — it’s a match. → Connection made. Invite
//                                             received.
//                                         </Text>
//                                     </View>
//                                     <View style={styles.approvalWorkflow}>
//                                         <Text style={styles.swipeMatch}>Approve Guest</Text>
//                                         <Text style={[styles.asAHost, styles.asAHostTypo]}>
//                                             As a host, browse guest profiles and decide who gets in.
//                                         </Text>
//                                     </View>
//                                     <View style={styles.approvalWorkflow}>
//                                         <Text style={styles.swipeMatch}>
//                                             Guest Confirms Attendance
//                                         </Text>
//                                         <Text style={[styles.swipeOrTap, styles.asAHostTypo]}>
//                                             Once approved, each guest confirms their spot.
//                                         </Text>
//                                     </View>
//                                 </View>
//                             </View>
//                         </View>
//                         <Pressable style={[styles.button, styles.buttonSpaceBlock]}>
//                             <Text style={styles.gotIt}>Got It</Text>
//                         </Pressable>
//                     </View>
//                 </View>
//                 <View style={[styles.lowTab, styles.buttonSpaceBlock]}>
//                     <View style={[styles.lowTabChild, styles.lowTabChildPosition]} />
//                     <View
//                         style={[styles.componentshomeIndicatorWhit, styles.indicatorLayout]}
//                     >
//                         <View style={[styles.homeIndicatorWhite, styles.indicatorLayout]} />
//                     </View>
//                 </View>
//             </ScrollView>
//         </LinearGradient>
//     );
// };

// const styles = StyleSheet.create({
//     howInvitationWorkContent: {
//         flexDirection: "column",
//         paddingTop: 60,
//         alignItems: "flex-end",
//         justifyContent: "flex-start",
//         gap: 8,
//         height: 932,
//     },
//     invitePosition: {
//         zIndex: 2,
//         position: "absolute",
//     },
//     textFlexBox: {
//         alignItems: "center",
//         zIndex: 2,
//     },
//     frameParentFlexBox: {
//         alignItems: "flex-end",
//         flexDirection: "row",
//     },
//     groupSpaceBlock: {
//         paddingBottom: Padding.p_1,
//         justifyContent: "flex-end",
//     },
//     buttonSpaceBlock: {
//         paddingBottom: Padding.p_8,
//         flexDirection: "row",
//     },
//     inviteTypo: {
//         textAlign: "center",
//         fontFamily: FontFamily.abel,
//         fontWeight: "500",
//         color: Color.colorWhite,
//     },
//     cardsPosition: {
//         top: 0,
//         height: 324,
//         position: "absolute",
//     },
//     asAHostTypo: {
//         color: Color.colorGray500,
//         fontFamily: FontFamily.abelRegular,
//         fontSize: FontSize.size_12,
//         lineHeight: 17,
//         textAlign: "left",
//     },
//     lowTabChildPosition: {
//         right: 0,
//         left: 0,
//         top: 0,
//         width: 430,
//     },
//     indicatorLayout: {
//         width: 154,
//         height: 5,
//     },
//     subtractIcon: {
//         width: 0,
//         height: 0,
//         display: "none",
//         zIndex: 0,
//     },
//     headerIcon: {
//         zIndex: 4,
//     },
//     text: {
//         height: 26,
//         width: 30,
//         letterSpacing: 0.2,
//         lineHeight: 26,
//         fontWeight: "600",
//         fontFamily: FontFamily.urbanistSemiBold,
//         display: "flex",
//         textAlign: "left",
//         color: Color.colorWhite,
//         fontSize: FontSize.size_16,
//         alignItems: "center",
//     },
//     groupIcon: {
//         height: 10,
//         width: 18,
//     },
//     groupWrapper: {
//         height: 11,
//         width: 18,
//     },
//     groupIcon1: {
//         width: 15,
//         height: 11,
//     },
//     groupContainer: {
//         height: 12,
//         width: 15,
//     },
//     groupIcon2: {},
//     frameParent: {
//         gap: 5,
//         height: 13,
//         width: 71,
//     },
//     typestatusBarThemelightInner: {
//         height: 19,
//         paddingBottom: Padding.p_6,
//         zIndex: 1,
//         justifyContent: "flex-end",
//         width: 71,
//     },
//     typestatusBarThemelight: {
//         height: 44,
//         paddingHorizontal: 23,
//         paddingVertical: 9,
//         gap: 283,
//         alignItems: "flex-end",
//         flexDirection: "row",
//         left: 0,
//         right: 0,
//         top: 0,
//         width: 430,
//     },
//     howInvitationWork1: {
//         width: 323,
//         fontSize: 40,
//         lineHeight: 48,
//         height: 96,
//     },
//     howInvitationWorkWrapper: {
//         width: 327,
//         paddingLeft: 7,
//         height: 96,
//         flexDirection: "row",
//     },
//     cardEventIcon: {
//         top: 2,
//         width: 203,
//         height: 317,
//         left: 0,
//         position: "absolute",
//     },
//     cardIcon: {
//         left: 77,
//         width: 216,
//         height: 324,
//         zIndex: 1,
//     },
//     invite: {
//         top: 185,
//         left: 257,
//         fontSize: 12,
//         lineHeight: 14,
//         width: 34,
//         height: 15,
//         zIndex: 2,
//         position: "absolute",
//     },
//     handIcon: {
//         top: 155,
//         left: 190,
//         width: 46,
//         height: 51,
//         zIndex: 3,
//         position: "absolute",
//     },
//     cards: {
//         width: 294,
//         height: 324,
//         left: 0,
//     },
//     closeIcon: {
//         top: 119,
//         left: 165,
//         width: 135,
//         height: 55,
//     },
//     cardsParent: {
//         zIndex: 2,
//         width: 299,
//         height: 324,
//     },
//     frameWrapper: {
//         width: 319,
//         paddingLeft: 19,
//         height: 324,
//         flexDirection: "row",
//     },
//     progressInnerIcon: {
//         width: 33,
//         height: 192,
//     },
//     swipeMatch: {
//         lineHeight: 19,
//         alignSelf: "stretch",
//         fontFamily: FontFamily.abel,
//         fontWeight: "500",
//         textAlign: "left",
//         color: Color.colorWhite,
//         fontSize: FontSize.size_16,
//     },
//     swipeOrTap: {
//         alignSelf: "stretch",
//     },
//     approvalWorkflow: {
//         gap: Gap.gap_4,
//         alignSelf: "stretch",
//     },
//     asAHost: {
//         width: 272,
//     },
//     inviteProcess: {
//         width: 285,
//         gap: Gap.gap_16,
//     },
//     progressBar1: {
//         gap: Gap.gap_16,
//         alignSelf: "stretch",
//         borderRadius: Border.br_100,
//         flexDirection: "row",
//     },
//     progressBar: {
//         height: 203,
//         borderRadius: Border.br_100,
//         flexDirection: "row",
//     },
//     gotIt: {
//         height: 17,
//         width: 39,
//         fontSize: FontSize.size_14,
//         color: Color.colorGray200,
//         lineHeight: 17,
//         fontFamily: FontFamily.abel,
//         fontWeight: "500",
//         textAlign: "left",
//     },
//     button: {
//         backgroundColor: Color.colorWhite,
//         justifyContent: "center",
//         paddingLeft: Padding.p_4,
//         paddingTop: Padding.p_8,
//         paddingRight: 10,
//         borderRadius: Border.br_100,
//         width: 340,
//         alignItems: "center",
//         zIndex: 2,
//         height: 48,
//     },
//     frameGroup: {
//         height: 771,
//         gap: 33,
//         width: 340,
//     },
//     howInvitationWorkInner: {
//         width: 382,
//         height: 779,
//         paddingRight: 42,
//         justifyContent: "flex-end",
//     },
//     lowTabChild: {
//         bottom: 0,
//         left: 0,
//         position: "absolute",
//     },
//     homeIndicatorWhite: {
//         backgroundColor: Color.colorDimgray,
//         borderRadius: Border.br_100,
//     },
//     componentshomeIndicatorWhit: {
//         paddingRight: 0,
//         zIndex: 1,
//         flexDirection: "row",
//     },
//     lowTab: {
//         height: 29,
//         paddingLeft: 138,
//         paddingTop: Padding.p_16,
//         paddingRight: 137,
//         width: 430,
//     },
//     scrollview: {
//         flex: 1,
//         maxWidth: "100%",
//         backgroundColor: "transparent",
//         width: "100%",
//     },
//     howInvitationWork: {
//         width: "100%",
//     },
// });

// export default HowInvitationWork;
