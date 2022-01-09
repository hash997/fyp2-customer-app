import React from "react";
import { Text, StyleSheet, Pressable, ScrollView } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
import { RootTabScreenProps } from "../../types";
import { View } from "../Themed";

const TopServicesSection = ({ navigation }: any) => {
  return (
    <View
      style={{ marginVertical: 10 }}
      lightColor="white"
      darkColor="rgba(255,255,255,0.1)"
    >
      <Text style={styles.title}>Top Services</Text>
      <ScrollView
        horizontal={true}
        style={{ paddingVertical: 20, paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
      >
        <Pressable
          style={styles.box}
          onPress={() => {
            navigation.push("AssemblingFurniture");
          }}
        >
          <Text style={styles.boxTxt}>Assembling {"\n"} Furniture</Text>
        </Pressable>
        <Pressable
          style={styles.box}
          onPress={() => {
            navigation.push("AssemblingFurniture");
          }}
        >
          <Text style={styles.boxTxt}>Moving {"\n"} In/Out</Text>
        </Pressable>
        <View style={styles.box}>
          <Text style={styles.boxTxt}>Assembling {"\n"} Furniture</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxTxt}>Assembling {"\n"} Furniture</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: "#0C4160",
    fontWeight: "bold",
    paddingHorizontal: 15,
  },
  box: {
    width: 200,
    height: 140,
    marginRight: 20,
    backgroundColor: "#738FA7",
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  boxTxt: {
    color: "white",
    fontWeight: "800",
    fontSize: 20,
    textAlign: "center",
  },
});
export default TopServicesSection;
