import * as React from "react";
import { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import Offer from "../components/offers/offer";
import { Text, View } from "../components/Themed";
import { useOffer } from "../state-store/offers-provider";
import { appStyles } from "../styles";
import { RootTabScreenProps } from "../types";

const OffersScreen = ({ navigation }: RootTabScreenProps<"Offers">) => {
  const { offers } = useOffer();

  useEffect(() => {
    console.log("offers.length => ", offers.length);
  }, [offers]);

  if (!offers || offers.length == 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading</Text>
      </View>
    );
  }

  return (
    <View style={appStyles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <Text style={appStyles.title}>Offers</Text>
        </View>
        {offers &&
          offers.length > 0 &&
          offers.map((ofr) => <Offer offer={ofr} key={ofr.id} />)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
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

export default OffersScreen;
