import * as React from "react";
import { useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import HandymanSection from "../components/home/HandymanSection";
import ProfessionalsSections from "../components/home/ProfessionalsSection";
import TopServicesSection from "../components/home/TopServicesSection";
import { View } from "../components/Themed";
import {
  useDispatchJobRequest,
  useJobRequest,
} from "../state-store/job-request-state";
import { RootTabScreenProps } from "../types";

const HomeScreen = ({ navigation }: RootTabScreenProps<"Home">) => {
  const dispatchCurrentInquiry = useDispatchJobRequest();
  const currentJobRequest = useJobRequest();

  useEffect(() => {
    dispatchCurrentInquiry({
      type: "clear",
    });
    // dispatchCurrentInquiry({
    //   type: "update",
    //   payload: {
    //     ...currentJobRequest,
    //     currentStep: 1,
    //   },
    // });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <TopServicesSection navigation={navigation} />
        <HandymanSection />
        <ProfessionalsSections />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  txtInputContainer: {
    width: "100%",
    paddingVertical: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default HomeScreen;
