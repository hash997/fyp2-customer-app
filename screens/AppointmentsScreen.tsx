import { API } from "aws-amplify";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { jobsByCustomerId } from "../src/graphql/queries";
import { appStyles } from "../styles";
import { Entypo } from "@expo/vector-icons";
import JobRequest from "../components/jobRequests/JobRequest";
import * as Progress from "react-native-progress";

const AppointmentsScreen = () => {
  const [jobReqs, setJobReqs] = useState<any>();
  const getCustomersJobs = async () => {
    try {
      const jobReqResp: any = await API.graphql({
        query: jobsByCustomerId,
        variables: {
          customerId: "bea28ca3-1e5a-4eb0-96b0-1b9a11485687",
        },
      });
      // console.log("customers jobs => ", jobReqResp);
      setJobReqs(jobReqResp?.data?.jobsByCustomerId);
    } catch (error) {
      console.log("shit went south while getting customers job reqs =>", error);
    }
  };

  useEffect(() => {
    getCustomersJobs();
  }, []);

  useEffect(() => {}, [jobReqs]);

  if (!jobReqs || jobReqs.length < 1) {
    return (
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
    );
  }

  return (
    <View style={appStyles.container}>
      <ScrollView>
        <View>
          <Text style={appStyles.title}>Your Job Requests</Text>
        </View>
        {jobReqs &&
          jobReqs.map((jobReq: any) => (
            <JobRequest key={jobReq.id} jobReq={jobReq} />
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default AppointmentsScreen;
