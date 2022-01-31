import { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import SignIn from "../components/auth/SignIn";
import { JobStatus } from "../src/API";
import { createJobRequest } from "../src/graphql/mutations";
import { useAuth } from "../state-store/auth-state";
import { useJobRequest } from "../state-store/job-request-state";
import { appStyles } from "../styles";
import * as Progress from "react-native-progress";

const JobConfirmationScreen = (props: any) => {
  const { job } = useJobRequest();
  const { user } = useAuth();
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // console.log("user= > ", user);

  const handleCreateJobReq = async () => {
    try {
      setLoading(true);
      const jobReqResp = await API.graphql(
        graphqlOperation(createJobRequest, {
          createJobRequestInput: {
            customerId: user?.attributes["custom:userId"]
              ? user?.attributes["custom:userId"]
              : "",
            location: {
              address: "",
              city: "",
              customerId: user?.attributes["custom:userId"]
                ? user?.attributes["custom:userId"]
                : "",
              lat: "",
              lng: "",
              state: "selangor",
            },
            status: JobStatus.CREATED,
            title: "Furniture Assembly",
            city: job.location.city,
            description: "description bla bla bla",
          },
        })
      );
      setSuccess(true);

      setLoading(false);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccess(false);

      // props.navigation.navigate("home");
      props.navigation.navigate("Home");
      console.log("job req res => ", jobReqResp);
    } catch (error) {
      setErr(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setErr(false);
      setLoading(false);

      console.log("shit went south while creating job req =>", error);
    }
  };

  console.log("errorrr= > ", err);

  useEffect(() => {}, [err, loading, success]);
  return (
    <>
      {!user ? (
        <SignIn navigation={props.navigation} />
      ) : (
        <>
          {loading && (
            <>
              <View
                style={{
                  position: "absolute",
                  zIndex: 70,
                  backgroundColor: "black",
                  height: "110%",
                  width: "120%",
                  opacity: 0.3,
                }}
              />
              <View
                style={{
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 100,
                  height: "110%",
                  width: "120%",
                }}
              >
                <Progress.Circle
                  size={50}
                  indeterminate={true}
                  borderWidth={3}
                  color={"white"}
                />
              </View>
            </>
          )}
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
            <TouchableOpacity
              style={[
                appStyles.btnCntr,
                {
                  backgroundColor: err ? "red" : success ? "green" : "#0C4160",
                },
              ]}
              onPress={() => {
                handleCreateJobReq();
              }}
            >
              <Text style={appStyles.btnTxt}>
                {err
                  ? "something went wrong"
                  : success
                  ? "your job Request sent "
                  : "Confirm"}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
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
  errBtn: {
    backgroundColor: "red",
  },
});

export default JobConfirmationScreen;
