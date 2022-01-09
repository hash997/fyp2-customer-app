import * as React from "react";
import { StyleSheet, ScrollView, TextInput } from "react-native";
// import { ScrollView, TextInput } from "react-native-gesture-handler";
import HandymanSection from "../components/home/HandymanSection";
import ProfessionalsSections from "../components/home/ProfessionalsSection";
import TopServicesSection from "../components/home/TopServicesSection";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { API } from "aws-amplify";
import { customerById } from "../src/graphql/queries";
import { useEffect } from "react";
import { useRoute } from "@react-navigation/native";

const HomeScreen = ({ navigation }: RootTabScreenProps<"Home">) => {
  const route = useRoute();

  const getCustomer = async () => {
    let cstmrRes: any;
    try {
      cstmrRes = API.graphql({
        query: customerById,
        variables: { customerId: "fd4b2d4f-aee1-4c4d-9be6-13f3fc0e3b3a" },
      });
      const cstmrData = await cstmrRes;
      console.log("cstmrData=>", cstmrData);
    } catch (error) {
      console.log("shit went south while getting customer =>", error);
    }
    // console.log("customer Res =>", cstmrRes);
  };
  useEffect(() => {
    getCustomer();
  }, []);

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
