import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { appStyles } from "../../styles";
import { Entypo } from "@expo/vector-icons";
import { JobStatus, Worker } from "../../src/API";
import { API } from "aws-amplify";
import { createJobRequestToWorker } from "../../src/graphql/mutations";
import { useJobRequest } from "../../state-store/job-request-state";
import { useAuth } from "../../state-store/auth-state";

const WorkerProfile = ({
  worker,
  navigation,
  jobDate,
}: {
  worker: Worker;
  navigation: any;
  jobDate: Date;
}) => {
  const { user } = useAuth();
  const { job } = useJobRequest();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [isSuccess, setSuccess] = useState(true);

  if (!user) {
    return <Text>Something went wrong</Text>;
  }

  const handleSendJobRequest = async () => {
    if (!user.id) {
      setIsError("user id is undefined");
      return;
    }
    setLoading(true);
    const createJobRequestToWorkerInput = {
      customerId: user.id,
      description: job.description,
      location: {
        address: job.location.address,
        city: job.location.city,
        customerId: user.id,
        lat: job.location.lat,
        lng: job.location.lng,
        state: job.location.state,
      },
      status: JobStatus.CREATED,
      title: "Furniture Assembly",
      workerId: worker.id,
      time: jobDate.toISOString(),
    };
    try {
      const createJobReqRes = await API.graphql({
        query: createJobRequestToWorker,
        variables: {
          createJobRequestToWorkerInput: createJobRequestToWorkerInput,
        },
      });
      setLoading(false);
      setSuccess(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigation.navigate("Home");
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      setIsError(
        "something went wrong while sending job request. please try again"
      );

      console.log("error", error);
    }
  };
  return (
    <View>
      <View
        style={{
          height: 200,
          width: "100%",
          borderColor: "#136494",
          borderWidth: 1.4,
          borderRadius: 10,
          padding: 10,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "50%",
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}
        >
          <View
            style={{
              width: "60%",
              padding: 5,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 60,
                width: 60,
                borderRadius: 100,
                borderWidth: 3,
                borderColor: "#0C4160",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 25,
                  color: "#0C4160",
                }}
              >
                {worker.fName.slice(0, 1)}
              </Text>
            </View>
            <View style={{ padding: 5, marginLeft: 5 }}>
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 15,
                  color: "#0C4160",
                }}
              >
                {worker.fName} {worker.lName}
              </Text>
              <View
                style={{
                  display: "flex",

                  flexDirection: "row",
                }}
              >
                <Entypo name="star" size={18} color="#ffd27d" />
                <Entypo name="star" size={18} color="#ffd27d" />
                <Entypo name="star" size={18} color="#ffd27d" />
                <Entypo name="star" size={18} color="#ffd27d" />
                <Entypo name="star" size={18} color="#ffd27d" />
              </View>
              <Text
                style={{ color: "#0C4160", textDecorationLine: "underline" }}
              >
                See Reviews
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "50%",
              padding: 5,

              justifyContent: "center",
              display: "flex",
              marginRight: 5,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                color: "#0C4160",
                fontStyle: "italic",
              }}
            >
              RM{worker.hourlyRate}/Hour
            </Text>
            <View
              style={{
                width: "60%",
                backgroundColor: loading ? "grey" : "#0C4160",
                borderRadius: 5,
                padding: 7,
                margin: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity disabled={loading}>
                <Text
                  style={{ fontSize: 10, color: "white" }}
                  onPress={handleSendJobRequest}
                >
                  Send Request
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 20, color: "#0C4160", fontWeight: "500" }}>
            Introduction
          </Text>
          <Text style={{ color: "#0C4160" }}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WorkerProfile;
