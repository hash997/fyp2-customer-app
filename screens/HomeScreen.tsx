import * as React from "react";
import { StyleSheet, ScrollView, TextInput } from "react-native";
// import { ScrollView, TextInput } from "react-native-gesture-handler";
import HandymanSection from "../components/home/HandymanSection";
import ProfessionalsSections from "../components/home/ProfessionalsSection";
import TopServicesSection from "../components/home/TopServicesSection";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

const HomeScreen = ({ navigation }: RootTabScreenProps<"Home">) => {
  return (
    <View style={styles.container}>
      <View
        lightColor="white"
        darkColor="rgba(255,255,255,0.1)"
        style={styles.txtInputContainer}
      >
        <TextInput
          style={{
            width: "100%",
            height: 50,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "#eee",
            paddingLeft: 15,
          }}
          placeholder="Search"
        />
      </View>
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
