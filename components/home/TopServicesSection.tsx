import React from "react";
import { Text, StyleSheet, Pressable, ScrollView, Image } from "react-native";
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
        <View>
          <Pressable
            style={styles.box}
            onPress={() => {
              navigation.push("AssemblingFurniture");
            }}
          >
            <Image
              style={{ width: "100%", height: "100%", borderRadius: 8 }}
              source={require("./../../assets/furnitureAssembly.png")}
            />
          </Pressable>
          <Text style={styles.boxTxt}>Assembling Furniture</Text>
          <Text
            style={[
              styles.boxTxt,
              { fontSize: 15, marginTop: 0, color: "green" },
            ]}
          >
            Available
          </Text>
        </View>
        <View>
          <Pressable style={styles.box} onPress={() => {}}>
            <Image
              style={{ width: "100%", height: "100%", borderRadius: 8 }}
              source={require("./../../assets/moving.png")}
            />
          </Pressable>
          <Text style={styles.boxTxt}>Moving In/Out</Text>
          <Text
            style={[
              styles.boxTxt,
              { fontSize: 15, marginTop: 0, color: "orange" },
            ]}
          >
            Coming soon...
          </Text>
        </View>
        <View>
          <Pressable style={styles.box} onPress={() => {}}>
            <Image
              style={{ width: "100%", height: "100%", borderRadius: 8 }}
              source={require("./../../assets/airconService.png")}
            />
          </Pressable>
          <Text style={styles.boxTxt}>Aircond Service</Text>
          <Text
            style={[
              styles.boxTxt,
              { fontSize: 15, marginTop: 0, color: "orange" },
            ]}
          >
            Coming soon...
          </Text>
        </View>
        <View>
          <Pressable style={styles.box} onPress={() => {}}>
            <Image
              style={{ width: "100%", height: "100%", borderRadius: 8 }}
              source={require("./../../assets/plumber.png")}
            />
          </Pressable>
          <Text style={styles.boxTxt}>Plumber service</Text>
          <Text
            style={[
              styles.boxTxt,
              { fontSize: 15, marginTop: 0, color: "orange" },
            ]}
          >
            Coming soon...
          </Text>
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
    color: "#0C4160",
    // width: "100%",
    fontWeight: "500",
    fontSize: 20,
    marginTop: 5,
  },
});
export default TopServicesSection;
