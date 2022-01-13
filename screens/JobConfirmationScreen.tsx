import React from "react";
import { Text, View } from "react-native";
import { appStyles } from "../styles";

const JobConfirmationScreen = (props: any) => {
  return (
    <View style={appStyles.container}>
      <View style={appStyles.TitlTxtCntr}>
        <Text style={appStyles.title}>Confirm Job Request</Text>
      </View>
      <View style={appStyles.TitlTxtCntr}>
        <Text style={{ fontWeight: "700" }}>Job Title</Text>
      </View>
    </View>
  );
};

export default JobConfirmationScreen;
