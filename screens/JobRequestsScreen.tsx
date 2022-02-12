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
import { useAuth } from "../state-store/auth-state";

const JobRequestsScreen = () => {
  const { user } = useAuth();
  const [jobReqs, setJobReqs] = useState<any>();
  const getCustomersJobs = async () => {
    if (!user) return;
    try {
      const jobReqResp: any = await API.graphql({
        query: jobsByCustomerId,
        variables: {
          customerId: user?.id,
        },
      });
      setJobReqs(jobReqResp?.data?.jobsByCustomerId);
    } catch (error) {
      console.log("shit went south while getting customers job reqs =>", error);
    }
  };

  useEffect(() => {
    getCustomersJobs();
  }, []);

  useEffect(() => {}, [user]);

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
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* <View> */}
        <View>
          <Text style={appStyles.title}>Your Job Requests</Text>
        </View>
        {jobReqs &&
          jobReqs.map((jobReq: any) => (
            <JobRequest key={jobReq.id} jobReq={jobReq} />
          ))}
        {/* </View> */}
      </ScrollView>
    </View>
  );
};

export default JobRequestsScreen;
