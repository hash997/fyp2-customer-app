import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from "../state-store/auth-state";
import { useJobRequest } from "../state-store/job-request-state";
import { appStyles } from "../styles";

const JobConfirmationScreen = (props: any) => {
  const { job } = useJobRequest();
  const { user } = useAuth();

  console.log("this is the user =>", user.attributes["custom:userId"]);
  console.log("freaking job request", job);
  return (
    <View style={[appStyles.container, { justifyContent: "flex-start" }]}>
      <View style={appStyles.TitlTxtCntr}>
        <Text style={appStyles.title}>Confirm Job Request</Text>
      </View>
      <View style={appStyles.TitlTxtCntr}>
        <Text style={styles.title}>Job Title</Text>
        <Text style={styles.txt}>Assembling Furniture</Text>
      </View>
      <View style={appStyles.TitlTxtCntr}>
        <Text style={styles.title}>Number Of Items</Text>
        <Text style={styles.txt}>{job.numberOfItem}</Text>
      </View>
      <View style={appStyles.TitlTxtCntr}>
        <Text style={styles.title}>Items</Text>
        {job.items.map((item) => (
          <Text key={Math.random()} style={styles.txt}>
            {item}
          </Text>
        ))}
      </View>
      <View style={appStyles.TitlTxtCntr}>
        <Text style={styles.title}>Job Location</Text>
        <Text style={styles.txt}>{job?.location?.address}</Text>
      </View>
      <TouchableOpacity style={appStyles.btnCntr} onPress={() => {}}>
        <Text style={appStyles.btnTxt}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    fontSize: 20,
  },
  txt: {
    fontWeight: "400",
    fontSize: 16,
  },
});

export default JobConfirmationScreen;
