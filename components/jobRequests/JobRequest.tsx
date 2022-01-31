import React from "react";
import { API } from "aws-amplify";
import { useState } from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { jobsByCustomerId } from "../../src/graphql/queries";
import { appStyles } from "../../styles";
import { Entypo } from "@expo/vector-icons";

const JobRequest = ({ jobReq }: { jobReq: any }) => {
  return (
    <>
      <View
        style={{
          width: "100%",
          borderColor: "#eee",
          borderWidth: 2,
          height: "15%",
          marginVertical: 10,
          borderRadius: 10,
          padding: 15,
        }}
      >
        <View style={{ display: "flex", flexDirection: "row", height: "50%" }}>
          <View style={{ width: "50%" }}>
            <Text style={{ fontWeight: "500" }}>{jobReq?.title}</Text>
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
            <Entypo name="location" size={16} color="black" />
            <Text style={{ fontWeight: "500", marginLeft: 10 }}>
              {jobReq?.location?.city}
            </Text>
          </View>
        </View>
        <View>
          <Text>{jobReq.description}</Text>
        </View>
      </View>
    </>
  );
};

export default JobRequest;
