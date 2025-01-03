import { Image, Text, TouchableOpacity, View } from "react-native";
import DemoIntroBg from "assets/images/app/demo-intro-bg.png";
import CloseMediumIcon from "assets/images/icons/close-medium.svg";
import useStyles from "screens/App/DemoFlow/screens/DemoIntro/styles.ts";
import Button from "components/Button/Button.tsx";
import React, { FC, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppNavigation } from "hooks/useAppNavigation.ts";
import { demoEventCreatingPath, demoFlowStackPath, demoIOPath } from "constants/pathLocations.ts";
import { useDemoFlowStore } from "../../../../../store/demoFlowStore";
import { screenWidth } from "constants/common.ts";

const DemoIntro: FC = () => {
  const styles = useStyles();
  const { bottom } = useSafeAreaInsets();
  const navigation = useAppNavigation();
  const {setHintStep, setIsVisibleSwipeGuide} = useDemoFlowStore();

  useEffect(() => {
    setHintStep(1);
  }, []);

  const navigateToCreatingEvent = () => {
    setHintStep(1);
    navigation.navigate(demoEventCreatingPath)
  };

  const navigateToSwipingTutorial = () => {
    setHintStep(8)
    setIsVisibleSwipeGuide(true)
    navigation.navigate(demoFlowStackPath, {screen: demoIOPath} as never);
  }

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image resizeMode="contain" source={DemoIntroBg} />
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={navigation.goBack}>
            <CloseMediumIcon />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          ...styles.contentContainer,
          paddingBottom: bottom
        }}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{"Let’s Show You\nHow It Works"}</Text>
          <Text style={styles.description}>
            Let us walk you through the demo event flow and show how easy it is to share, invite, and have others join
            you at your tables
            and events!
          </Text>
        </View>
        <View style={styles.btnsContainer}>
          <Button onPress={navigateToCreatingEvent} title={"Share Table or Event (Demo)"}
                  buttonStyle={{ width: screenWidth - 48, height: 64, marginHorizontal: 24}}/>
          <TouchableOpacity onPress={navigateToSwipingTutorial}>
            <Text style={styles.skipText}>Skip and Start Swiping Guests</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DemoIntro;
