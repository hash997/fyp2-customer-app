import { Auth } from "aws-amplify";
import * as React from "react";
import { Button, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

const SettingsScreen = ({ navigation }: RootTabScreenProps<"Settings">) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings screen</Text>
      <Button title="Sign out" onPress={() => Auth.signOut()} />
      {/* <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      /> */}
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

export default SettingsScreen;
