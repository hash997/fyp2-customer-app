import { API } from "aws-amplify";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  jobsByCustomerId,
  jobsToWorkerByCustomerId,
} from "../src/graphql/queries";
import { appStyles } from "../styles";
import { Entypo } from "@expo/vector-icons";
import JobRequest from "../components/jobRequests/JobRequest";
import * as Progress from "react-native-progress";
import { useAuth } from "../state-store/auth-state";
import { JobRequestToWorker } from "../src/API";
import JobToWorker from "../components/jobRequests/JobToWorker";

const JobRequestsScreen = () => {
  const { user } = useAuth();
  const [jobReqs, setJobReqs] = useState<any>();
  const [jobToWorker, setJobToWorker] = useState<JobRequestToWorker[] | []>([]);
  const getCustomersJobs = async () => {
    if (!user) return;
    try {
      const jobReqResp: any = await API.graphql({
        query: jobsByCustomerId,
        variables: {
          customerId: user?.id,
        },
      });
      const jobToWorkerResp: any = await API.graphql({
        query: jobsToWorkerByCustomerId,
        variables: {
          customerId: user?.id,
        },
      });

      setJobReqs(jobReqResp?.data?.jobsByCustomerId);
      setJobToWorker(jobToWorkerResp?.data.jobsToWorkerByCustomerId);
    } catch (error) {}
  };

  useEffect(() => {
    getCustomersJobs();
  }, []);

  useEffect(() => {}, [user]);

  // if (!jobReqs || jobReqs.length < 1) {
  //   return (
  //     <View style={appStyles.container}>
  //       <Progress.Circle
  //         size={50}
  //         indeterminate={true}
  //         borderWidth={3}
  //         color={"white"}
  //       />
  //     </View>
  //   );
  // }

  return (
    <View style={appStyles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* <View>
          <Text
            style={[appStyles.title, { marginRight: "auto", fontSize: 15 }]}
          >
            Your Job Requests
          </Text>
        </View> */}
        {jobReqs &&
          jobReqs.map((jobReq: any) => (
            <JobRequest key={jobReq.id} jobReq={jobReq} />
          ))}
        {jobToWorker.length > 1 && (
          <View>
            <Text
              style={[appStyles.title, { marginRight: "auto", fontSize: 15 }]}
            >
              Your Job Requests To specific worker
            </Text>
          </View>
        )}
        {jobToWorker &&
          jobToWorker.map((jobReq: any) => (
            <JobToWorker key={jobReq.id} jobReq={jobReq} />
          ))}
      </ScrollView>
    </View>
  );
};

export default JobRequestsScreen;
