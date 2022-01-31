import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated } from "react-native";
import { appStyles } from "../styles";

const LandingScreen = (props: any) => {
  return (
    <View style={appStyles.container}>
      <Text style={[appStyles.title, { fontSize: 20 }]}>
        Welcome to home services app
      </Text>

      <View
        style={{
          margin: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          onPress={() => {
            props.navigation.navigate("SignIn");
          }}
          style={{ fontSize: 24, fontWeight: "800", margin: 20 }}
        >
          Login
        </Text>
        <Text
          onPress={() => {
            props.navigation.navigate("Root");
          }}
          style={{ fontSize: 24, fontWeight: "800", margin: 20 }}
        >
          Not now
        </Text>
      </View>
    </View>
  );
};

export default LandingScreen;
