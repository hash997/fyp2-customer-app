import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";

const HandymanSection = () => {
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={styles.title}>Handyman</Text>
      <ScrollView
        horizontal={true}
        style={{ paddingVertical: 20, paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.box}>
          <Text style={styles.boxTxt}>Assemble {"\n"} Table or Chair</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxTxt}>Mount {"\n"} TV or Mirror</Text>
        </View>
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
    backgroundColor: "#D4B37F",
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
export default HandymanSection;
