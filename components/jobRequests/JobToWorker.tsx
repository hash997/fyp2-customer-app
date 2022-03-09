import React from "react";
import { API } from "aws-amplify";

import { StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { JobRequestToWorker } from "../../src/API";

const JobToWorker = ({ jobReq }: { jobReq: JobRequestToWorker }) => {
  return (
    <>
      <View
        style={{
          width: "100%",
          borderColor: "#0C4160",
          borderWidth: 1,
          height: "15%",
          marginVertical: 10,
          borderRadius: 10,
          padding: 15,
        }}
      >
        <View style={{ display: "flex", flexDirection: "row", height: "50%" }}>
          <View style={{ width: "50%" }}>
            <Text style={{ fontWeight: "700", fontSize: 16, color: "#0C4160" }}>
              {jobReq?.title}
            </Text>
            {/* <View
              style={{
                display: "flex",
                flexDirection: "row",

                alignItems: "center",

                marginBottom: 10,
              }}
            >
              <MaterialIcons name="local-offer" size={12} color="#0C4160" />
              <Text
                style={{ fontWeight: "500", marginLeft: 5, color: "#0C4160" }}
              >
                {jobReq?.offers.length > 1
                  ? `${jobReq?.offers.length} Offers`
                  : `${jobReq?.offers.length} offer`}{" "}
              </Text>
            </View> */}
          </View>
          <View
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "flex-start",
            }}
          >
            <Entypo name="location" size={16} color="#0C4160" />
            <Text
              style={{ fontWeight: "500", marginLeft: 10, color: "#0C4160" }}
            >
              {jobReq?.location?.city}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: "#0C4160" }}>{jobReq.description}</Text>
        </View>
      </View>
    </>
  );
};

export default JobToWorker;
