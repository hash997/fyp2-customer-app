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
import { RootTabScreenProps } from "../types";
import {
  useDispatchJobRequest,
  useJobRequest,
} from "../state-store/job-request-state";
import { useAuth } from "../state-store/auth-state";
import { BookingType } from "../job-request-types";
import { API } from "aws-amplify";
import { workersByCity } from "../src/graphql/queries";
import { WorkerSpeciality } from "../src/API";
import { Worker } from "../src/API";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { appStyles } from "../styles";

const apiKey = "AIzaSyB8_N3rMc0Q0bozwx_8mA8EKv5BoOhMjoM";

interface LngLtd {
  lat: number;
  lng: number;
}

interface LocationInfo {
  address: string;
  city: string;
  state: string;
  country: string;
  lng: string;
  lat: string;
}

const PickLoc = ({ navigation }: RootTabScreenProps<"PickLocation">) => {
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const [lngLat, setLngLat] = useState<LngLtd | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [placeInfo, setPlaceInfo] = useState<LocationInfo>();
  const currentJobRequest = useJobRequest();
  const dispatchCurrentJobRequest = useDispatchJobRequest();
  const [nearbyWorkers, setNearByWorkers] = useState<Worker[] | undefined>(
    undefined
  );
  const { user } = useAuth();

  const getNearByWorkers = async (city: string) => {
    if (!city) {
      return;
    }
    try {
      const workerRes: any = await API.graphql({
        query: workersByCity,
        variables: {
          city: city,
          speciality: WorkerSpeciality.HANDYMAN,
        },
      });
      const workers = workerRes?.data?.workersByCity;

      setNearByWorkers(workers);
      dispatchCurrentJobRequest({
        type: "update",
        payload: {
          ...currentJobRequest,
          workers: workers,
        },
      });
    } catch (error) {
      setErrorMsg("Error getting nearby workers");
    }
  };

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
    } catch (error) {}
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
      // HANDLE ERRORS
    }
  };

  const getAddressCityCountry = (jsonRes: any) => {
    let city, state, country;
    const lat = jsonRes?.results[0].geometry.location.lat;
    const lng = jsonRes?.results[0].geometry.location.lng;

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
      lat: lat,
      lng: lng,
    });
    getNearByWorkers(city);
  };

  useEffect(() => {}, [nearbyWorkers, placeInfo]);

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
            components: "country:MY",
            rankby: "distance",
          }}
        />
      </View>
      <View style={styles.cnt}>
        <Text style={appStyles.title}>Choose Location</Text>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "600",
            color: "#0C4160",
            marginTop: 5,
          }}
        >
          Address
        </Text>
        <Text style={{ fontSize: 14, fontWeight: "400", color: "#0C4160" }}>
          {placeInfo?.address}
        </Text>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            // justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ width: "50%" }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "600",
                color: "#0C4160",
                marginTop: 5,
              }}
            >
              State
            </Text>
            <Text style={{ fontSize: 17, fontWeight: "400", color: "#0C4160" }}>
              {placeInfo?.state}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "600",
                color: "#0C4160",
                marginTop: 5,
              }}
            >
              City
            </Text>
            <Text style={{ fontSize: 17, fontWeight: "400", color: "#0C4160" }}>
              {placeInfo?.city}
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "600",
              color: "#0C4160",
              marginTop: 5,
            }}
          >
            Vendors near you
          </Text>
          <Text style={{ fontSize: 17, fontWeight: "400", color: "#0C4160" }}>
            {currentJobRequest?.workers?.length}
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            position: "relative",
            bottom: 10,
            marginTop: "auto",
          }}
        >
          <View style={styles.btnCtn}>
            <TouchableOpacity
              disabled={isLoading}
              onPress={getCurretnLoc}
              style={styles.btn}
            >
              <Text style={styles.btntxt}>use current location</Text>
              <FontAwesome name="location-arrow" size={18} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.btnCtn}>
            <TouchableOpacity
              disabled={
                !placeInfo?.address ||
                !currentJobRequest.workers ||
                (currentJobRequest.workers.length === 0 &&
                  currentJobRequest.job.bookingType === BookingType.pickWorker)
              }
              onPress={() => {
                if (!placeInfo) return;
                dispatchCurrentJobRequest({
                  type: "update",
                  payload: {
                    ...currentJobRequest,
                    currentStep: currentJobRequest.currentStep + 1,
                    job: {
                      ...currentJobRequest.job,
                      location: {
                        ...currentJobRequest.job.location,
                        address: placeInfo?.address,
                        city: placeInfo?.city,
                        lat: placeInfo?.lat,
                        lng: placeInfo?.lng,
                        state: placeInfo?.state,
                      },
                    },
                  },
                });
                if (currentJobRequest.job.bookingType === BookingType.urgent) {
                  navigation.navigate("JobConfirmation");
                  return;
                }
                if (
                  currentJobRequest.job.bookingType === BookingType.pickWorker
                ) {
                  navigation.navigate("PickWorker");
                }
              }}
              style={styles.btn}
            >
              <Text style={styles.btntxt}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {isLoading && (
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
      )}
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
        {nearbyWorkers &&
          nearbyWorkers.length > 0 &&
          nearbyWorkers.map((wrkr) => {
            return (
              <Marker
                key={wrkr.id}
                coordinate={{
                  latitude: +wrkr.lng,
                  longitude: +wrkr.lat,
                }}
                title={"worker"}
                description={"near by worker"}
              >
                <MaterialIcons
                  name="person-pin-circle"
                  size={50}
                  color="#0C4160"
                />
              </Marker>
            );
          })}
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
    marginTop: 15,
    zIndex: 100,
    width: "49%",
  },
  btn: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    height: 50,
    backgroundColor: "#0C4160",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btntxt: {
    fontSize: 15,
    fontWeight: "400",
    color: "white",
  },
  inptCtn: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    top: 10,
    zIndex: 100,
    // right: 20,
    width: "100%",
    // height: 100,
  },
  cnt: {
    position: "absolute",
    height: "42%",
    width: "105%",
    backgroundColor: "white",
    bottom: 10,
    borderRadius: 30,
    zIndex: 100,
    padding: 20,
    paddingBottom: 0,
  },
});

export default PickLoc;
