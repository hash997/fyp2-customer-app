import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";
import * as Progress from "react-native-progress";
import { MaterialIcons } from "@expo/vector-icons";

const apiKey = "AIzaSyDJHF_JXu4QD7YeJCRgyRp-Yqez7JLR29A";

interface LngLtd {
  lat: number;
  lng: number;
}

interface LocationInfo {
  address: string;
  city: string;
  state: string;
  country: string;
}

const PickLoc = () => {
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const [lngLat, setLngLat] = useState<LngLtd | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [placeInfo, setPlaceInfo] = useState<LocationInfo>();

  // THIS FUNCTION IS USED TO ASK THE USER FOR PREMISSION TO GET LOCATION AND THEN GET'S THE LOCATION
  // THIS WILL GIVE THE LAT AND LNG AND SOME OTHER INFO.
  const getCurretnLoc = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    setIsLoading(true);
    let location = await Location.getCurrentPositionAsync({});
    // THIS SETLNGLAT IS USED IN THE MAPVIEW COMPONENT TO POINT AT THE CUSTOMER CURRENT LOCAITON
    setLngLat({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });

    // THIS FUNCTION WILL GIVE THE PLACE ID BASED ON THE LNG AND LAT TO BE USED TO GET MORE INFORMATION ABOUT THE USER'S PLACE
    // TO BE USED IN THE BACKEND.
    getPlaceInformation(location.coords.latitude, location.coords.longitude);
    setIsLoading(false);
  };

  // THIS FUNCITON TAKES PLACE_ID AND SETS THE LAT AND LNG
  const getLatLngByPlaceId = async (placeId: string) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`
      );
      const data = await res.json();
      setLngLat({
        lat: data["result"]["geometry"]["location"]["lat"],
        lng: data["result"]["geometry"]["location"]["lng"],
      });
      getPlaceInformation(
        data["result"]["geometry"]["location"]["lat"],
        data["result"]["geometry"]["location"]["lng"]
      );
    } catch (error) {
      console.log(error);
    }
  };

  // THE DIFFERENCE BETWEEN THIS AND GETLATLNGBYPLACEID IS THAT THIS RETURNS AN ARRAY OF RESULTS WITH MORE INFORMATION
  const getPlaceInformation = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );
      const data = await res.json();
      getAddressCityCountry(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAddressCityCountry = (jsonRes: any) => {
    let city, state, country;

    const address = jsonRes?.results[0]?.formatted_address;
    for (let i = 0; i < jsonRes?.results[0]?.address_components.length; i++) {
      for (
        let j = 0;
        j < jsonRes?.results[0]?.address_components[i]?.types.length;
        j++
      ) {
        switch (jsonRes?.results[0]?.address_components[i]?.types[j]) {
          case "locality":
            city = jsonRes?.results[0]?.address_components[i]?.long_name;
            break;
          case "administrative_area_level_1":
            state = jsonRes?.results[0]?.address_components[i]?.long_name;
            break;
          case "country":
            country = jsonRes?.results[0]?.address_components[i]?.long_name;
            break;
        }
      }
    }
    setPlaceInfo({
      address: address,
      city: city,
      state: state,
      country: country,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inptCtn}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            details?.place_id && getLatLngByPlaceId(details?.place_id);
          }}
          query={{
            key: apiKey,
            language: "en",
          }}
        />
      </View>
      <View style={styles.cnt}>
        <Text style={{ fontSize: 17, fontWeight: "600", color: "grey" }}>
          Location
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold", opacity: 0.7 }}>
          {placeInfo?.address && placeInfo?.address}
        </Text>

        <View style={styles.btnCtn}>
          <TouchableOpacity
            disabled={isLoading}
            onPress={getCurretnLoc}
            style={{
              // position: "relative",
              height: 70,
              backgroundColor: isLoading ? "grey" : "#8eb0bc",
              borderRadius: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text style={styles.btntxt}>Use my current location </Text>
            <MaterialIcons
              name="my-location"
              size={24}
              color="white"
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.btnCtn}>
          <TouchableOpacity
            disabled={!placeInfo?.address}
            onPress={getCurretnLoc}
            style={[
              styles.btn,
              { backgroundColor: !placeInfo?.address ? "grey" : "#0C4160" },
            ]}
          >
            <Text style={styles.btntxt}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <>
          <View
            style={{
              position: "absolute",
              zIndex: 70,
              backgroundColor: "black",
              height: "110%",
              width: "120%",
              opacity: 0.3,
            }}
          />
          <View
            style={{
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 100,
              height: "110%",
              width: "120%",
            }}
          >
            <Progress.Circle
              size={50}
              indeterminate={true}
              borderWidth={3}
              color={"white"}
            />
          </View>
        </>
      ) : undefined}
      <MapView
        style={styles.map}
        provider="google"
        region={{
          latitude: lngLat?.lat ? lngLat.lat : 4.280178568527284,
          longitude: lngLat?.lng ? lngLat.lng : 102.07626738891598,
          latitudeDelta: lngLat?.lat ? 0.05 : 5,
          longitudeDelta: lngLat?.lng ? 0.03 : 15,
        }}
      >
        {lngLat?.lng ? (
          <Marker
            key={1}
            coordinate={{
              latitude: lngLat?.lat,
              longitude: lngLat?.lng,
            }}
          />
        ) : undefined}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    padding: 20,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  btnCtn: {
    // position: "absolute",
    // position: "relative",
    // bottom: 50,
    marginTop: 15,
    zIndex: 100,
    width: "100%",
  },
  btn: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    height: 70,
    backgroundColor: "#0C4160",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btntxt: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  inptCtn: {
    position: "absolute",
    top: 70,
    zIndex: 100,
    width: "100%",
    // height: 100,
  },
  cnt: {
    position: "absolute",
    // justifyContent: "center",
    alignItems: "center",
    height: "40%",
    width: "110%",
    backgroundColor: "white",
    bottom: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    zIndex: 100,
    padding: 15,
  },
});

export default PickLoc;
